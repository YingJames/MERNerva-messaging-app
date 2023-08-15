import { AuthErrorCodes } from 'firebase/auth';

export function handleLoginError(error, setInputInvalidState) {
    // console.log(error.code);
    switch (error.code) {
        // general - improper email address
        case (AuthErrorCodes.INVALID_EMAIL):
            setInputInvalidState(() => ({
                accountExist: false, email: true, password: false,
            }));
            break;

        // strictly for login
        case ('auth/user-not-found'):
            setInputInvalidState(() => ({
                accountExist: true, email: false, password: false,
            }));
            break;
        case (AuthErrorCodes.INVALID_PASSWORD):
            setInputInvalidState(() => ({
                accountExist: false, email: false, password: true,
            }));
            break;
    }

}

export function handleSignUpError(error, setInputInvalidState, setInvalidMessage) {
    switch (error.code) {

        case (AuthErrorCodes.INVALID_EMAIL):
            setInputInvalidState(() => ({
                accountExist: false, email: true, password: false,
            }));
            break;
        case (AuthErrorCodes.EMAIL_EXISTS):
            setInputInvalidState(() => ({
                displayName: false, email: true, password: false,
            }));
            setInvalidMessage((prevData) => ({
                ...prevData, 'email': "This e-mail is already in-use with an existing account. " +
                "Please use a different e-mail address."
            }));
            break;

        case (AuthErrorCodes.WEAK_PASSWORD):
            setInputInvalidState(() => ({
                displayName: false, email: false, password: true,
            }));
            break;
    }
}

