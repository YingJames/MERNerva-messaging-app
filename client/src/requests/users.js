export async function CreateUser(userData) {
    try {
        const {email, displayName, uid } = userData;
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

