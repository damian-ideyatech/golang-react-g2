import React from 'react';
import 'login/components/RegistrationSuccess/RegistrationSuccess.css';

const RegistrationSuccess = () => {
    return (
        <div class="check-jumbotron">
            <img src="images/check.png" alt="Registration succcessful" className="img-fluid check" />
            <h1>Registration successful!</h1>
        </div>
    );
};

export default RegistrationSuccess;