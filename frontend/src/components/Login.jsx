import { useState, useEffect } from "react";
import Button from "./Button";
import InputField from "./InputField";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const [passwordLogin, setPasswordLogin] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/posts');
        }
    }, [isAuthenticated, navigate]);

    const handlePasswordLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:5176/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Logged in: ', data);
                navigate('/posts');
            } else {
                const error = await response.text();
                console.error('Login failed: ', error);
                alert('Login failed. Try again.');
            }
        } catch (err) {
            console.error('Server error: ', err);
        }
    };


    return (
        <div>
            <h1>In The Loop</h1>
            <h2>Log In</h2>
            <form onSubmit={handlePasswordLogin}>
                <div>
                    <InputField
                        type='email'
                        name='email'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter your email"
                    />
                </div>

                {passwordLogin && (
                    <InputField
                        type='password'
                        name='password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter your password"
                    />
                )}

                {!passwordLogin ? (
                    <Button
                        text="Log In With Password"
                        onClick={() => setPasswordLogin(true)}
                    />
                ) : null}

                {passwordLogin && (
                    <div>
                        <Button
                            text='Log In'
                            onClick={handlePasswordLogin}
                        />
                    </div>
                )}

                {!passwordLogin && (
                    <div>
                        <Button
                            text="Log In with One-Time Passcode"
                            onClick={async () => {
                               if (!email){
                                alert('Enter your email.');
                                return;
                               }
                               try {
                                const response = await fetch(`http://localhost:5176/api/user/exists?email=${encodeURIComponent(email)}`, {
                                    method: 'GET',
                                });

                                const exists = await response.json();

                                if (!exists) {
                                    alert(`User with email ${email} is not registered.`);
                                    return;
                                }

                                loginWithRedirect({
                                    authorizationParams: {
                                        screen_hint: 'login',
                                        connection: 'email',
                                        login_hint: email,
                                    }
                                });
                            } catch (error) {
                                console.error('Error getting user:', error);
                                alert('Something went wrong. Try again');
                            }
                            }}
                        />
                    </div>
                )}

            </form >
        </div>
    )
}