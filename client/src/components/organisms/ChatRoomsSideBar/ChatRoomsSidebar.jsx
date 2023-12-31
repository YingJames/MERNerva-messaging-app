import { useState, useEffect, useRef, useContext } from 'react';
import {
    Button,
    Modal,
    TextInput,
    Stack,
} from "@carbon/react";
import { Events, Group } from "@carbon/icons-react";
import { DoesUserExist, FindUser } from '../../../requests/users';
import './_chatrooms-sidebar.scss';
import { CreateRoom, FindRooms } from "../../../requests/rooms";
import { CurrentUserContext } from "../../../App";
import { CurrentRoomContext } from "../../Dashboard/Dashboard";
import { BASE_URL } from "../../../env";


const ChatRoomsSidebar = () => {
    const createRoomRef = useRef();
    const { user } = useContext(CurrentUserContext);
    const { currentRoom, setCurrentRoom } = useContext(CurrentRoomContext);

    const [mongoUser, setMongoUser] = useState(null);
    // lists all the rooms the user is a part of
    const [rooms, setRooms] = useState([]);

    // for the create room modal
    const [roomName, setRoomName] = useState('');
    const [userEmails, setUserEmails] = useState('');
    const [userEmailInvalid, setUserEmailInvalid] = useState(false);
    const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
    const [rerender, setRerender] = useState(false);

    useEffect(() => {

        // when a new user signs up on google, they are added to mongodb, but there is latency
        // check if user exists in mongodb yet
        fetchRooms();
        const eventSource = new EventSource(`${BASE_URL}/watchRooms`)
        if (typeof (EventSource) !== 'undefined') {
            console.log('connected to eventSource');
        } else {
            console.log('not able to connect to eventSource');
        }

        eventSource.onmessage = (event) => {
            console.log('anything please event source')
            const eventData = JSON.parse(event.data);
            console.log(eventData.message)
            if (eventData.message === "rerender") {
                setRerender(!rerender);
            }
        }
        return () => eventSource.close();
    }, [rerender]);

    const fetchRooms = async () => {
        // grab the current user mongodb _id
        const userExists = await DoesUserExist(user.email);
        console.log(userExists);
        if (userExists) {
            const mongoUser = await FindUser(user.email);
            setMongoUser(mongoUser);

            const { _id } = mongoUser;
            const rooms = await FindRooms(_id);
            setRooms(rooms);
            console.log(`fetchRooms: ${JSON.stringify(rooms)}`);
        }
    }

    function handleCreateRoomNameChange(e) {
        const { value } = e.target;
        setRoomName(value)
    }

    function handleChangeUserEmailsChange(e) {
        const { value } = e.target;
        setUserEmails(value);
    }

    async function handleCreateRoomOnSubmit() {
        try {
            setShowCreateRoomModal(false);
            const userEmailsArray = userEmails
                .replace(" ", "")
                .split(',');
            userEmailsArray.push(user.email);

            // finds _id of each participant using their email
            const participants = await Promise.all(userEmailsArray.map(async (email) => {
                const { _id } = await FindUser(email);
                return _id;
            }));

            const roomData = {
                name: roomName,
                participants: participants
            }
            await CreateRoom(roomData);
            await fetchRooms();
            // reset the values for the next Modal
            setRoomName('');
            setUserEmails('');
            createRoomRef.current.reset();

            setUserEmailInvalid(false);
            setShowCreateRoomModal(false)
        } catch (error) {
            setUserEmailInvalid(true);
            setShowCreateRoomModal(true);
        }
    }

    function handleSeeRoomOnClick(index) {
        console.log(rooms[index])
        setCurrentRoom(rooms[index]);
    }

    /*
        async function handleUserSearch(e) {
            e.preventDefault();
            try {
                const request = FindUser(searchValue);
                const requestJson = await request.json();
                if (!request.ok) {
                    throw (requestJson.error);
                }

                const { details } = requestJson;
                const user = details[0].Users[0];
                setInvalidSearch(false);

                setDisplayName(user.displayName);
                setEmail(user.email);
                setShowResults(true);
            } catch (error) {
                if (error === 'User not found') {
                    setInvalidSearch(true);
                }
            }
        }
    */


    return (
        <aside className="sidebar">
            <Modal
                open={showCreateRoomModal}
                onRequestClose={() => {
                    setShowCreateRoomModal(false)
                }}
                onRequestSubmit={handleCreateRoomOnSubmit}
                modalHeading="Create a room"
                primaryButtonText="Create your room"
                secondaryButtonText="Cancel Process"
                primaryButtonDisabled={roomName === '' || userEmails === ''}
            >
                <div className="create-room--body">

                    Only users that have an account can be invited to a room. If you would like to invite a user that
                    does not have an account, please ask them to create an account first.

                    <form
                        className="create-room--form"
                        ref={createRoomRef}
                    >
                        <Stack gap={7}>

                            <TextInput id="create-room--text-input__room-name"
                                       labelText="Room Name"
                                       placeholder="your room name"
                                       onChange={handleCreateRoomNameChange}
                                       required

                            />

                            <TextInput id="create-room--text-input__add-participant"
                                       invalid={userEmailInvalid}
                                       invalidText="Invalid format or no account exists with one of the associated e-mail addresses"
                                       labelText="Add people to your room by their e-mail address. Separate multiple e-mails with a comma."
                                       placeholder="john@email.com, bob@email.com"
                                       onChange={handleChangeUserEmailsChange}
                                       required
                            />

                        </Stack>
                    </form>
                </div>
            </Modal>

            <div className="sidebar--create-room__wrapper">
                <Button className="sidebar--create-room__button"
                        renderIcon={Events}
                        iconDescription="Invite User"
                        onClick={() =>
                            setShowCreateRoomModal(true)
                        }
                >Create a room
                </Button>
            </div>
            <div>
                <h3>Rooms</h3>
                <ul>
                    {rooms.map((room, index) => {
                            return <li key={room._id} index={index}>
                                <Button className={"sidebar--chat-room__button"}
                                        kind={"secondary"}
                                        renderIcon={Group}
                                        onClick={() => handleSeeRoomOnClick(index)}
                                >
                                    {room.name}
                                </Button>
                            </li>
                        }
                    )}
                </ul>

            </div>
            {/*    <form
                className="user-search-form"
                onSubmit={handleUserSearch}
            >
                <Search
                    id="searchUsers"
                    labelText="Search for users"
                    placeholder="Search for users"
                    size="lg"
                    light
                    value={searchValue}
                    onChange={handleInputChange}
                />
            </form>
            {invalidSearch && <div className="inline-notification">
                <InlineNotification
                    kind="error"
                    actions={<NotificationActionButton>Action</NotificationActionButton>}
                    statusIconDescription="error icon"
                    hideCloseButton
                    subtitle={'User not found.'}
                    title="Error:"
                    onCloseButtonClick={null}
                    role={"log"}
                />
            </div>}

            {showResults && <div className="user-search-results">
                <div className='user-search--profile'>
                    <div className="user-search--profile-picture">
                        <Avvvatars value={email} size="50" shadow border borderColor='#262626' />
                    </div>
                    <div className="user-search--profile__info">
                        <div className="user-search--profile__details">
                            <h3>{displayName}</h3>
                            <p>{email}</p>
                        </div>
                        <Button hasIconOnly renderIcon={UserFollow} iconDescription="Invite User" />
                    </div>
                </div>
            </div>
            }*/}
        </aside>
    );
}

export default ChatRoomsSidebar;