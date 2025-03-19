import { use, useState } from "react";

export default function createUserForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifiedPassword, setVerifiedPassword] = useState('');

    return (
        <div>
            <h1>In the Loop</h1>
            <h2>Create an Account</h2>
            <form>
                <label>Enter your email:
                    <input type='text' value={email}></input>
                </label>

                <label>Enter a password:
                    <input type='text' value={password}></input>
                </label>

                <label>Verify password:
                    <input type='text' value={verifiedPassword}></input>
                </label>
            </form>
        </div>
    )
}
