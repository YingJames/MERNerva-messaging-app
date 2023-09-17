async function FindUser(email) {
    try {
        const response = await fetch("http://localhost:5050/api/database/users/findUser", {
            method: "POST",
            cors: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": email
            }),
        });
        const data = await response.json();
        return data.details[0].Users[0];
    } catch (error) {
        console.log("Error finding user:", error);
     }
}

async function CreateUser(userData) {
    try {
        const { email, displayName, uid } = userData;
        const response = await fetch("http://localhost:5050/api/database/users/createUser", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
                "displayName": displayName,
                "uid": uid
            })
        });

        console.log(response);
    } catch (error) {
        console.log("Error creating user:", error);
        throw error;
    }
};

async function DoesUserExist(email) {
    try {
        const response = await fetch("http://localhost:5050/api/database/users/userExist", {
            method: "POST",
            cors: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": email
            }),
        });
        const data = await response.json();
        return data.flag;
    } catch (error) {
        console.log("Error finding user:", error);
     }
}

export { FindUser, CreateUser, DoesUserExist }