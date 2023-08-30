import {
    createUserWithEmailAndPassword,
    updateProfile,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    getAdditionalUserInfo
} from "firebase/auth";
import FirebaseInit from "./firebase-init";
import {CreateUser} from "../requests";

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

    const userData = {
        email: formData.email,
        displayName: formData.displayName,
        uid: user.uid
    }
    await CreateUser(userData);

};

export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            const additionalUserInfo = getAdditionalUserInfo(result);

            // add user to mongodb if new
            if (additionalUserInfo.isNewUser) {
                const userData = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    uid: result.user.uid
                }
                CreateUser(userData);
            }
            // This gives you a Google Access Token. You can use it to access the Google API.
            /*
                        const token = credential.accessToken;
                        // The signed-in user info.
                        // IdP data available using getAdditionalUserInfo(result)
                        // ...
            */
        }).catch((error) => {
            console.log("Firebase Google Auth Error: ", error);
    });
}
