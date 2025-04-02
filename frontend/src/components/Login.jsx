import { use, useState } from "react";
import Button from "./Button";
import InputField from "./InputField";

export default function loginForm() {
    const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const {
    //     //     isAuthenticated,
    //     //     loginWithRedirect,
    //     //   } = useAuth0();

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

                <div><Button text="Log In with password" /></div>
                <div><Button text="Log In with One-Time Passcode" /></div>
                {/* <div>
                    <Button text="Log In" onClick={loginWithRedirect} />
                </div> */}

                {/* <label>Enter your password:
                    <input type='password' value={password}></input>
                </label> */}
            </form>
        </div>
    )
}
