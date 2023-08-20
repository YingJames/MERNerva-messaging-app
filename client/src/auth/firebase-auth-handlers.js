import {
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from "firebase/auth";
import FirebaseInit from "./firebase-init";

export const auth = FirebaseInit();
export const logout = () => {
    signOut(auth);
}
export const loginWithEmailPassword = (formData) => {
    const textFieldEmail = formData.email;
    const textFieldPassword = formData.password;

    try {
        return signInWithEmailAndPassword(auth, textFieldEmail, textFieldPassword);
    } catch (error) {
        console.error(error);
    }
};

export const signupWithEmailPassword = async (formData) => {
    const textFieldEmail = formData.email;
    const textFieldPassword = formData.password
    const userCredential = await createUserWithEmailAndPassword(auth, textFieldEmail, textFieldPassword)
    const user = userCredential.user;
    updateProfile(user, {
        displayName: formData.displayName
    });

    const response = await fetch("http://localhost:5050/api/database/users/createUser", {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": formData.email,
            "displayName": formData.displayName,
            "uid": user.uid
        }),
    });
}

export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            /*
                        const token = credential.accessToken;
                        // The signed-in user info.
                        const user = result.user;
                        // IdP data available using getAdditionalUserInfo(result)
                        // ...
            */
        }).catch((error) => {
        // Handle Errors here.
        /*
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
        */
    });
}
