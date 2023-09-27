import './_chat-room.scss';
import { CurrentUserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { CurrentRoomContext } from "../Dashboard/Dashboard";
import { CreateMessage, FindMessages } from "../../requests/messages";
import { Button, FluidForm, TextInput, Theme } from "@carbon/react";
import { Send } from "@carbon/icons-react";
import Avvvatars from "avvvatars-react";

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
        if (messageInput != '') {
            await CreateMessage(currentRoom.messageThread, user.email, messageInput);
        }
        setMessageInput('');
    }

    return (
        <div className="chat-room">
            {currentRoom ? <h1>{currentRoom.name}</h1> : <h1>Choose a chat room to start messaging</h1>}
            <div className="chat-room--messages">
                {currentRoom && messages.map((message, index) => {
                    return (
                        <div
                            key={index}
                            className={`chat-room--message-wrapper 
                            ${user.email === message.senderEmail && " chat-room--message__current-user"}`}
                        >
                            {user.email !== message.senderEmail &&
                                <Avvvatars value={message.senderEmail} size="40" />
                            }
                            <p className={"chat-room--message-bubble"}>{message.content}</p>
                        </div>
                    )

                })}
            </div>
            {currentRoom &&
                <div theme={"g90"}>
                    <form className="chat-room--input" onSubmit={handleSubmit}>
                        <TextInput
                            id={"chat-room--text-input"}
                            placeholder={"message"}
                            value={messageInput}
                            onChange={handleMessageInputChange}
                        />
                    </form>
                </div>
            }
        </div>
    )
};

export default ChatRoom;