import './_chat-room.scss';
import { CurrentUserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { CurrentRoomContext } from "../Dashboard/Dashboard";
import { CreateMessage, FindMessages } from "../../requests/messages";
import { TextInput } from "@carbon/react";
import Avvvatars from "avvvatars-react";

const ChatRoom = () => {
    // user variable from firebase
    const { user } = useContext(CurrentUserContext);
    const { currentRoom } = useContext(CurrentRoomContext);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    const [rerender, setRerender] = useState(false);


    useEffect(() => {
        getMessages();
        const eventSource = new EventSource("http://localhost:5050/stream")
        if (typeof(EventSource) !== 'undefined') {
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
    }, [currentRoom, rerender]);

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
        if (messageInput !== '') {
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
                <div>
                    <form className="chat-room--input" onSubmit={handleSubmit}>
                        <TextInput
                            labelText={''}
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