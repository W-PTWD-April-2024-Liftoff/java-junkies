import React from "react";
import { useForm, ValidationError } from '@formspree/react';
import { Form, Button } from "react-bootstrap";

function ContactForm({userEmail}) {
    const [state, handleSubmit] = useForm("xeoaqyov");
    if (state.succeeded) {
        return <p>Thanks for reaching out!</p>;
    }
    return (
        <Form onSubmit={handleSubmit}>
            <input type='hidden' name='recipient' value={userEmail} />

            <Form.Group className='mb-3' controlId='email'>
                <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                />
                <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                />
            </Form.Group>

            <Form.Group className='mb-3' controlId='message'>
                <Form.Control
                    as='textarea'
                    name="message"
                    placeholder='Type your message here'
                />
                <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                />
            </Form.Group>

            <Button type="submit" disabled={state.submitting}>
                Send Message
            </Button>
        </Form>
    );
}
export default ContactForm;