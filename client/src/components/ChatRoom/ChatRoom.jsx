import './_chat-room.scss';
import { CurrentUserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { CurrentRoomContext } from "../Dashboard/Dashboard";
import { FindMessages } from "../../requests/messages";

const ChatRoom = () => {
    // user variable from firebase
    const { user } = useContext(CurrentUserContext);
    const { currentRoom, setCurrentRoom } = useContext(CurrentRoomContext);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getMessages();
        console.log(`getMessages: ${JSON.stringify(messages)}`);
    }, [currentRoom]);

    async function getMessages() {
        if (currentRoom) {
            const messages = await FindMessages(currentRoom.messageThread);
            setMessages(messages || []);
        }
    }

    return (
        <div className="chat-room">
            {currentRoom ? <h1>{currentRoom.name}</h1> : <h1>Choose a chat room to start messaging</h1>}
        </div>
    )
};

export default ChatRoom;