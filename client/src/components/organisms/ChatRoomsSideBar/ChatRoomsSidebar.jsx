import { useState } from 'react';
import { Search, InlineNotification, NotificationActionButton, Button } from "@carbon/react";
import { UserFollow } from "@carbon/icons-react";
import Avvvatars from 'avvvatars-react';
import './_chatrooms-sidebar.scss';

const ChatRoomsSidebar = () => {
    const [searchValue, setSearchValue] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [invalidSearch, setInvalidSearch] = useState(false);
    const [email, setEmail] = useState('');

    function handleInputChange(e) {
        const { value } = e.target;
        setSearchValue(value);
    }

    async function handleUserSearch(e) {
        e.preventDefault();
        try {
            const request = await fetch("http://localhost:5050/api/database/users/findUser", {
                method: "POST",
                cors: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "email": searchValue
                }),
            });
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
    return (
        <aside className="sidebar">
            <form
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
            }
        </aside>
    );
}

export default ChatRoomsSidebar;