import { useState } from "react";
import Button from "./Button";
import InputField from "./InputField";
import { useAuth0 } from "@auth0/auth0-react";

export default function Auth0Login() {
 const { isAuthenticated, loginWithRedirect} = useAuth0();
 const [email, setEmail] = useState('');

 const handleAuth0Login = async (event) => {
    event.preventDefault();
    await loginWithRedirect({
        email: email,
        connection: "email"
    });
 };

    return (
        <div>
            <h1>In The Loop</h1>
            <h2>Log In</h2>
            <h3></h3>
            <form>
            <div>

                <InputField
                    type='text'
                    value={oneTimePasscode}
                    onChange={(event) => setOneTimePasscode(event.target.value)}
                    placeholder="Enter One-time Passcode">
                </InputField>
                </div>

                <div>
                <Button text="Log In" />
                </div>
            </form>
        </div>
    )
}