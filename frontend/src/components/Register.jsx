import { use, useState } from "react";
import Button from "./Button";
import InputField from "./InputField";

export default function registrationForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifiedPassword, setVerifiedPassword] = useState('');

    const handleChange = (event) => {
        setEmail(event.target.value);
    }

    return (
        <div>
            <h1>In the Loop</h1>
            <h2>Create an Account</h2>
            <form>
                <div>
                    <InputField
                        type='email'
                        value={email}
                        onChange={handleChange}
                        placeholder="Enter your email">
                    </InputField>
                </div>

                <div>
                    <InputField type='password'
                        value={password}
                        onChange={handleChange}
                        placeholder="Enter a password">
                    </InputField>
                </div>

                <div>
                    <InputField type='password'
                        value={verifiedPassword}
                        onChange={handleChange}
                        placeholder="Re-enter password">
                    </InputField>
                </div>

                <div>
                    <Button text="Register" />
                </div>
            </form>
        </div>
    )
}
