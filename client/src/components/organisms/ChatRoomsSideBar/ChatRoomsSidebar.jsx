import { useState, useEffect, useRef, useContext } from 'react';
import {
    Search,
    InlineNotification,
    NotificationActionButton,
    Button,
    Modal,
    TextInput,
    Stack,
} from "@carbon/react";
import { Events } from "@carbon/icons-react";
import Avvvatars from 'avvvatars-react';
import { DoesUserExist, FindUser } from '../../../requests/users';
import './_chatrooms-sidebar.scss';
import { CreateRoom, FindRooms } from "../../../requests/rooms";
import { CurrentUserContext } from "../../../App";


//TODO: grab chatroom data for the logged in user and display it in the sidebar
//TODO: grab the logged in user's id and add it to the room's participants list

//TODO: add the logged in user to the participants list of the room
const ChatRoomsSidebar = () => {
    const createRoomRef = useRef();
    const { user } = useContext(CurrentUserContext);

    const [currentUserId, setCurrentUserId] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [roomName, setRoomName] = useState('');
    const [userEmails, setUserEmails] = useState('');
    const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);

    useEffect(() => {
        //TODO: request needs a body with the user's id
        //TODO: must create a room for the user if they don't have one dumbdumb

        // when a new user signs up on google, they are added to mongodb, but there is latency
        // check if user exists in mongodb yet
            fetchRooms();
    }, []);

    const fetchRooms = async () => {
        // grab the current user mongodb _id
        const userExists = await DoesUserExist(user.email);
        console.log(userExists);
        if (userExists) {
            const { _id } = await FindUser(user.email);
            console.log(`currentUser _id: ${_id}`)
            setCurrentUserId(_id);

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
        setShowCreateRoomModal(false);
        const userEmailsArray = userEmails
            .replace(" ", "")
            .split(',');
        userEmailsArray.push(user.email);

        // TODO: send the request to create a room
        // finds _id of each participant using their email
        const participants = await Promise.all(userEmailsArray.map(async (email) => {
            const { _id } = await FindUser(email);
            return _id;
        }));

        const roomData = {
            name: roomName,
            participants: participants
        }
        const response = await CreateRoom(roomData);
        await fetchRooms();
        // reset the values for the next Modal
        setRoomName('');
        setUserEmails('');
        createRoomRef.current.reset();
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
                onRequestClose={() => setShowCreateRoomModal(false)}
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
                    {rooms.map((room) => {
                        return <li key={room._id}>{room.name}</li>
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