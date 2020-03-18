import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const RegistrationForm = ({ onRegister }) => {
    const [ name, setName ] = useState();
    const [ emailAddress, setEmailAddress ] = useState();
    const [ password, setPassword ] = useState();
    const [ confirmPassword, setConfirmPassword ] = useState();

    const onSubmit = (event) => {
        event.preventDefault();
        onRegister(name, emailAddress, password, confirmPassword);
    };

    const onTypeValue = (event, setValue) => {
        if (event && event.target) {
            const htmlElement = event.target;
            if (htmlElement) {
                setValue(htmlElement.value);
            }
        }
    };
    
    const onTypeName = (event) => {
        return onTypeValue(event, setName);
    };

    const onTypeEmailAddress = (event) => {
        return onTypeValue(event, setEmailAddress);
    };

    const onTypePassword = (event) => {
        return onTypeValue(event, setPassword);
    };

    const onTypeConfirmPassword = (event) => {
        return onTypeValue(event, setConfirmPassword);
    };

    return (
        <Form onSubmit={ onSubmit } className="jumbotron">
            <h1>Registration</h1>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Juan dela Cruz"
                    onChange={ onTypeName } />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="email@address.com"
                    onChange={ onTypeEmailAddress } />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"
                    onChange={ onTypePassword } />
            </Form.Group>
            <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm password"
                    onChange={ onTypeConfirmPassword } />
            </Form.Group>
            <Form.Group  className="text-right">
                <Button type="submit" variant="dark" onSubmit={ onSubmit }>Register</Button>
            </Form.Group>
        </Form>
    );
};

export default RegistrationForm;