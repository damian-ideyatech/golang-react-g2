import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const LoginForm = ({ onLogin }) => {
    const [ username, setUsername ] = useState();
    const [ password, setPassword ] = useState();

    const onSubmit = (event) => {
        event.preventDefault();
        onLogin(username, password);
    };

    const onTypeValue = (event, setValue) => {
        if (event && event.target) {
            const htmlElement = event.target;
            if (htmlElement) {
                setValue(htmlElement.value);
            }
        }
    };

    const onTypeUsername = (event) => {
        return onTypeValue(event, setUsername);
    };

    const onTypePassword = (event) => {
        return onTypeValue(event, setPassword);
    };

    return (
        <Form onSubmit={ onSubmit } className="jumbotron">
            <h1>Login</h1>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username"
                    onChange={ onTypeUsername } />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"
                    onChange={ onTypePassword } />
            </Form.Group>
            <Form.Group  className="text-right">
                <Button type="submit" variant="dark">Login</Button>
            </Form.Group>
        </Form>
    );
};

export default LoginForm;