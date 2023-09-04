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
    try {
        const result = await signInWithPopup(auth, provider);
        const additionalUserInfo = getAdditionalUserInfo(result);

        if (additionalUserInfo.isNewUser) {
            const userData = {
                email: result.user.email,
                displayName: result.user.displayName,
                uid: result.user.uid
            }
            await CreateUser(userData);
        }
    } catch (error) {
        console.log("Firebase Google Auth Error: ", error);
    }
}
