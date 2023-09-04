import './_chat-room.scss';
import { CurrentUserContext } from "../../App";
import { useContext } from "react";

const ChatRoom = () => {
    // user variable from firebase
    const { user } = useContext(CurrentUserContext);
    /* TODO: grab user data from mongodb using firebase user variable
    *   create a request to create a chat room */
    return (
        <div className="chat-room">
            <h1>Chat Room</h1>
            <h2>{user.displayName}</h2>
        </div>
    )
};

export default ChatRoom;