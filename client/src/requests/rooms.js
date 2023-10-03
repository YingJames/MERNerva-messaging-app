import { BASE_URL } from "../env";

async function FindRooms(userId) {
    try {
        const response = await fetch(`${BASE_URL}/api/database/rooms/findRooms`, {
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
        const response = await fetch(`${BASE_URL}/api/database/rooms/createRoom`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
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