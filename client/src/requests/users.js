export async function CreateUser(userData) {
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

    return response;
};

