import { use, useState } from "react";

export default function registrationForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifiedPassword, setVerifiedPassword] = useState('');

    const handleChange = (event) => {
        setNotes(event.target.value);
     }

    return (
        <div>
            <h1>In the Loop</h1>
            <h2>Create an Account</h2>
            <form>
                <label>Enter your email:
                    <input type='text' value={email} onChange={handleChange}></input>
                </label>

                <label>Enter a password:
                    <input type='text' value={password} onChange={handleChange}></input>
                </label>

                <label>Verify password:
                    <input type='text' value={verifiedPassword} onChange={handleChange}></input>
                </label>
            </form>
        </div>
    )
}
