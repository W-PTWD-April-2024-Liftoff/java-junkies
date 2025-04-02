import { use, useState } from "react";
import Button from "./Button";
import InputField from "./InputField";

export default function Auth0Form() {
    const [oneTimePasscode, setOneTimePasscode] = useState('');

    return (
        <div>
            <h1>In The Loop</h1>
            <h2>Log In</h2>
            <h3>Check your email for a 6-digit login code.</h3>
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