import { BASE_URL } from "../env";

async function FindMessages(messageThreadId) {
    try {
        const response = await fetch(`${BASE_URL}/api/database/messages/findMessageThread`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "messageThreadId": messageThreadId
            })
        });

        const data = await response.json();
        return data.messageThread[0].messages;
    } catch (error) {
        console.log("Error finding messages:", error);
    }
}

async function CreateMessage(messageThreadId, senderEmail, content) {
    try {
        const response = await fetch(`${BASE_URL}/api/database/messages/createMessage`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "messageThreadId": messageThreadId,
                "senderEmail": senderEmail,
                "content": content
            })
        });

        console.log("Message created:", response.json())
    } catch (error) {
        console.log("Error creating message:", error);
    }
}

export { FindMessages, CreateMessage };