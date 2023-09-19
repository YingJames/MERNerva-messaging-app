async function FindMessages(messageThreadId) {
    try {
        const response = await fetch("http://localhost:5050/api/database/messages/findMessageThread", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "messageThread": messageThreadId
            })
        });

        const data = await response.json();
        return data.messages;
    } catch (error) {
        console.log("Error finding messages:", error);
    }
}

export { FindMessages };