import React, { useState } from 'react';
import { 
    Container, 
    Row,
    Jumbotron, 
    Button,
    Modal,
} from 'react-bootstrap';

import { useDispatch } from 'react-redux';

import { LoginForm, RegistrationForm, RegistrationSuccess } from 'login/components';
import LoginAction from 'login/actions/LoginAction';
import LoginService from 'login/services/LoginService';
import 'login/components/LoginPage/LoginPage.css';

const LoginPage = () => {
    const [ showLoginForm, setShowLoginForm ] = useState(true);
    const [ isSuccessful, setSuccessful ] = useState(false);

    const dispatch = useDispatch();

    const onRegister = async (name, emailAddress, password, confirmPassword) => {
        try {
            const response = await LoginService.register(
                name, emailAddress, password, confirmPassword);

            setSuccessful(true);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const onLogin = async (username, password) => {
        try {
            const response = await LoginService.login(username, password);

            localStorage.setItem('USERNAME', username);
            localStorage.setItem('USER_TOKEN', response.token);

            dispatch(LoginAction.loginSuccess(username, response.token));

        } catch (error) {
            console.error(error);
            // TODO: Show error message?

            dispatch(LoginAction.loginFailure(error));
        }
    };

    const onToggleForm = () => {
        setShowLoginForm(!showLoginForm);
        setSuccessful(false);
    };

    return (
        <>
        <Container fluid="true">
            <Row className="max-height">
                <Jumbotron className="col-md-4 col-md-offset-4 mx-auto my-auto unmargined">
                    { showLoginForm ? 
                        <LoginForm onLogin={ onLogin } /> :
                        isSuccessful ? 
                            <RegistrationSuccess /> :
                            <RegistrationForm onRegister={ onRegister } /> 
                    }

                    <div className="footer">
                        <span>{ showLoginForm ? 'No account?' : 'Already registered?' }</span>
                        <Button type="button" size="sm" variant="outline-light"
                            className="float-right" onClick={ onToggleForm }>
                            { showLoginForm ? 'Register' : 'Login' }
                        </Button>
                    </div>
                </Jumbotron>
            </Row>
        </Container>
        <Modal.Dialog show={ true } 
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered>
            <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
        
            <Modal.Body>
            <p>Modal body text goes here.</p>
            </Modal.Body>
        
            <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Save changes</Button>
            </Modal.Footer>
        </Modal.Dialog>
        </>
    );
};

export default LoginPage;