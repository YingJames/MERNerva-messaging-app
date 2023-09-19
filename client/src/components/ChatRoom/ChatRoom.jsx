import './_chat-room.scss';
import { CurrentUserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { CurrentRoomContext } from "../Dashboard/Dashboard";
import { CreateMessage, FindMessages } from "../../requests/messages";
import { Button, FluidForm, TextInput, Theme } from "@carbon/react";

const ChatRoom = () => {
    // user variable from firebase
    const { user } = useContext(CurrentUserContext);
    const { currentRoom, setCurrentRoom } = useContext(CurrentRoomContext);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        getMessages();
    }, [currentRoom]);
    // TODO: messages do not refresh if clicking same room because useEffect does not run
    // TODO: render the message on the screen
    // TODO how to update the message thread when a new message is sent
    async function getMessages() {
        if (currentRoom) {
            const messages = await FindMessages(currentRoom.messageThread);
            setMessages(messages || []);
        }
    }

    function handleMessageInputChange(e) {
        e.preventDefault();
        const { value } = e.target;
        setMessageInput(value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(`handleSubmit: ${messageInput}`);
        await CreateMessage(currentRoom.messageThread, user.email, messageInput);
        setMessageInput('');
    }

    return (
        <div className="chat-room">
            {currentRoom ? <h1>{currentRoom.name}</h1> : <h1>Choose a chat room to start messaging</h1>}
            <div className="chat-room--messages"></div>
            { currentRoom &&
                <div className="chat-room--input" theme={"g90"}>
                    <form onSubmit={handleSubmit}>
                        <TextInput
                            id={"chat-room--text-input"}
                            size={"lg"}
                            labelText={"make a message"}
                            placeholder={"message"}
                            value={messageInput}
                            onChange={handleMessageInputChange}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </div>
            }
        </div>
    )
};

export default ChatRoom;