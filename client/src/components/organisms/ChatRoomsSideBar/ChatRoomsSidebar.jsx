import { useState, useEffect, useRef } from 'react';
import { Search, InlineNotification, NotificationActionButton, Button, Modal } from "@carbon/react";
import { Events } from "@carbon/icons-react";
import Avvvatars from 'avvvatars-react';
import { FindUser } from '../../../requests/users';
import './_chatrooms-sidebar.scss';


//TODO: grab chatroom data for the logged in user and display it in the sidebar
const ChatRoomsSidebar = () => {
    const [searchValue, setSearchValue] = useState('');
    // const [showResults, setShowResults] = useState(false);
    // const [displayName, setDisplayName] = useState('');
    // const [invalidSearch, setInvalidSearch] = useState(false);
    // const [email, setEmail] = useState('');
    const [rooms, setRooms] = useState([]);
    const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);

    useEffect(() => {
        //TODO: request needs a body with the user's id
        //TODO: must create a room for the user if they don't have one dumbdumb
        async function getRooms() {
            const request = await fetch('http://localhost:5000/api/database/findRooms');
            const requestJson = await request.json();
            if (!request.ok) {
                throw (requestJson.error);
            }
            const { roomIds } = requestJson;
            setRooms(roomIds);
        }
    }, []);

    function handleInputChange(e) {
        const { value } = e.target;
        setSearchValue(value);
    }

    function handleCreateRoomOnClick() {
        setShowCreateRoomModal(true);
        console.log('clicked')
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
                primaryButtonText="Create your room"
                secondaryButtonText="Cancel Process"
            >
                <div className="create-room--body">
                    <h2>Create Room</h2>
                    Only users that have an account can be invited to a room. If you would like to invite a user that does not have an account, please ask them to create one.
                </div>
            </Modal>

            <div className="sidebar--create-room__wrapper">
                <Button className="sidebar--create-room__button"
                        renderIcon={Events}
                        iconDescription="Invite User"
                        onClick={() => handleCreateRoomOnClick()}
                >Create a room
                </Button>
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