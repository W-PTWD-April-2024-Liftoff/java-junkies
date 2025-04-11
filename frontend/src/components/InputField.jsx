import { use, useState } from "react";

function InputField(props) {

    return (
        <input
            type={props.type || "text"}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}>
        </input>

    );
}

export default InputField;