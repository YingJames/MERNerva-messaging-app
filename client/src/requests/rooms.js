async function FindRooms(userId) {
    // TODO: make find user function in users.js
    try {
        const response = await fetch("http://localhost:5050/api/database/rooms/findRooms", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({  
                "userId": userId
            })
        });

        const data = await response.json();
        return data.rooms;
    } catch (error) {
        console.log("Error finding rooms:", error);
        throw error;
    }
}

async function CreateRoom(roomData) {
    try {
        const response = await fetch("http://localhost:5050/api/database/rooms/createRoom", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body:  JSON.stringify({  
                "name": roomData.name,
                "participants": roomData.participants
            })

        });

        return await response.json();
    } catch (error) {
        console.log("Error creating room:", error);
        throw error;
    }
}

export { CreateRoom, FindRooms };