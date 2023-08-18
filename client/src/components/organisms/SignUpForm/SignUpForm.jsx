import {
    Form,
    Stack,
    TextInput,
    Button,
    InlineNotification,
    NotificationActionButton
} from '@carbon/react';
import { ArrowRight, Login } from '@carbon/icons-react';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { loginWithGoogle, signupWithEmailPassword } from "../../../auth";
import { handleSignUpError } from "../../../auth/auth-error-handling";
import got from 'got';
import './_signup-form.scss';


const SignUpForm = () => {
    const [showSuccessNotif, setShowSuccessNotif] = useState(false);
    const [formData, setFormData] = useState({
        email: '', password: '', displayName: '',
    });
    const [inputInvalidState, setInputInvalidState] = useState({
        displayName: false, email: false, password: false,
    });
    const [invalidMessage, setInvalidMessage] = useState({
        displayName: '',
        email: 'Invalid e-mail address. Please try again.',
        password: 'Password must be at least 6 characters long. Please try again.',
    });

    const SuccessNotification = () => {
        const [timeLeft, setTimeLeft] = useState(5);

        useEffect(() => {
            if (timeLeft > 0) {
                const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
                return () => clearTimeout(timer);
            }
        }, [timeLeft]);

        return (
            <div className='inline-notification'>
                <InlineNotification
                    role="alert"
                    kind="success"
                    actions={<NotificationActionButton hideCloseButton>Action</NotificationActionButton>}
                    iconDescription="describes the close button"
                    subtitle={`Redirecting you to the dashboard in ${timeLeft} seconds`}
                    title="Signed up successfully!"

                />
            </div>
        )
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData, [name]: value,
        }));
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        try {
            const userCredentials = await signupWithEmailPassword(formData)
            const uuid = await userCredentials.user.uid;
            const {data} = await got.post(`${process.env.ROOT_URL}api/database/users/createUser`, {
                json: {
                    email: formData.email,
                    displayName: formData.displayName,
                    uuid: uuid,
                },
            }).json();

            setShowSuccessNotif(true);
            setInputInvalidState(false);
            setTimeout(() => {
                window.location.pathname = '/dashboard';
            }, 5000)
        } catch (error) {
            handleSignUpError(error, setInputInvalidState, setInvalidMessage);
        }

    }

    return (
        <Form className="form" onSubmit={handleFormSubmit}>
            <Stack gap={4} className="signup-form--title-container">
                <p className="form__label">Already have an account?&nbsp;
                    <Link to={'/login'}>Log in</Link>
                </p>
                {showSuccessNotif && (
                    <SuccessNotification />
                )}
                <h1 className='form__title cds--type-heading-04'>Sign up for an account</h1>
            </Stack>

            <Stack gap={7}>
                <TextInput
                    helperText={"Your name can be a username or your real name. It is the display name that " +
                        "everyone else will see when they communicate with you."}
                    name="displayName"
                    id="form--name"
                    invalidText="Invalid error message."
                    labelText="Name"
                    size="md"
                    onChange={handleInputChange}
                    required
                />
                <TextInput
                    name="email"
                    id="form--email"
                    invalidText={invalidMessage.email}
                    labelText="E-mail"
                    size="md"
                    invalid={inputInvalidState.email}
                    onChange={handleInputChange}
                />
                <TextInput.PasswordInput
                    name="password"
                    id="form--password"
                    invalidText={invalidMessage.password}
                    labelText="Password"
                    size="md"
                    invalid={inputInvalidState.password}
                    onChange={handleInputChange}
                />
                <Button
                    kind="primary"
                    tabIndex={0}
                    type="submit"
                    renderIcon={ArrowRight}
                >Sign up</Button>
                <Stack gap={4} className="form--alt-login-container">
                    <p className="form--alt-login__label">Or use </p>
                    <Button
                        kind="tertiary"
                        tabIndex={0}
                        renderIcon={Login}
                        onClick={loginWithGoogle}
                    >Sign up with Google</Button>
                </Stack>
            </Stack>
        </Form>

    );
};

export default SignUpForm;