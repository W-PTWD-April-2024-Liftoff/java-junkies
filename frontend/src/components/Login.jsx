import { use, useState } from "react";
import Button from "./Button";
import InputField from "./InputField";

export default function loginForm() {
    const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    return (
        <div>
            <h1>In The Loop</h1>
            <h2>Login</h2>
            <form>
            <InputField 
         type='email' 
         value={email} 
         onChange={(event) => setEmail(event.target.value)}
         placeholder="Enter your email">
         </InputField>

                <div><Button text="Log In with password" /></div>
                <div><Button text="Log In with One-Time Passcode" /></div>

                {/* <label>Enter your password:
                    <input type='password' value={password}></input>
                </label> */}
            </form>
        </div>
    )
}
