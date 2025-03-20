import { use, useState } from "react";

export default function loginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <h1>In The Loop</h1>
            <h2>Login</h2>
            <form>
                <label>Enter your email:
                    <input type='text' value={email}></input>
                </label>

                <label>Enter your password:
                    <input type='text' value={password}></input>
                </label>
            </form>
        </div>
    )
}
