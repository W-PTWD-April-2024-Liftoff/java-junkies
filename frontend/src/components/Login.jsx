import { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import { useAuth0 } from "@auth0/auth0-react";
import Layout from "./Layout";

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginWithRedirect } = useAuth0();
    const [passwordLogin, setPasswordLogin] = useState(false);

    const handlePasswordLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Logged in: ', data);
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
        <Layout>
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
                        onClick={() => {
                            console.log('clicked');
                            loginWithRedirect({
                                authorizationParams: {
                                    screen_hint: "login"
                                },
                                login_hint: email,
                            });
                        }}
                        
                    />
                </div>
            )}
            
            </form >
        </div>
        </Layout>

    )
}
