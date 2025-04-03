import { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import { useAuth0 } from "@auth0/auth0-react";

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const { loginWithRedirect } = useAuth0();
    // const passwordLogin = (email) => {
        
    // }

    return (
        <div>
            <h1>In The Loop</h1>
            <h2>Log In</h2>
            <form>
                <div>
                    <InputField
                        type='email'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter your email">
                    </InputField>
                </div>

                <div><Button 
                text="Log In With Password" 
                // onClick={() => passwordLogin(email)
                // }
                />
                </div>

                <div><Button
                    text="Log In with One-Time Passcode"
                    onClick={() =>
                        loginWithRedirect({
                            authorizationParams: {
                                screen_hint: "login"
                            },
                            login_hint: email,
                        })
                    }
                />
                </div>

            </form>
        </div>
    )
}
