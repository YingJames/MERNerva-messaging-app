import './_chat-room.scss';
import { CurrentUserContext } from "../../App";
import { useContext } from "react";
import { CurrentRoomContext } from "../Dashboard/Dashboard";

const ChatRoom = () => {
    // user variable from firebase
    const { user } = useContext(CurrentUserContext);
    const { currentRoom, setCurrentRoom } = useContext(CurrentRoomContext);
    /* TODO: grab user data from mongodb using firebase user variable
    *   create a request to create a chat room */
    return (
        <div className="chat-room">
            <h1>{currentRoom.name}</h1>

        </div>
    )
};

export default ChatRoom;