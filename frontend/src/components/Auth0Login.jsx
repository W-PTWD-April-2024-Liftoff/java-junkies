import { use, useState } from "react";

export default function Auth0Form() {
    const [oneTimePasscode, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <h1>In The Loop</h1>
            <h2>Login</h2>
            <h3>Check your email for a 6-digit login code.</h3>
            <form>
                <label>Enter the code below:
                    <input type='text' value={oneTimePasscode}></input>
                </label>
            </form>
        </div>
    )
}
