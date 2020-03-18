import React from 'react';

import useLoginStatus from 'common/hooks/useLoginStatus';

import { 
    Switch, 
    Redirect,
} from 'react-router-dom';

import LoginPage from 'login/components/LoginPage/LoginPage';
import DashboardPage from 'dashboard/components/DashboardPage/DashboardPage';
import AuthenticatedRoute from 'common/components/AuthenticatedRoute/AuthenticatedRoute';

const Application = () => {
    const isLoggedIn = useLoginStatus();

    return (
        <Switch>
            <AuthenticatedRoute exact path='/login' 
                resolve={ () => !isLoggedIn } 
                resolveTo={ LoginPage }
                redirect='/dashboard/users' />

            <AuthenticatedRoute path='/dashboard/users' 
                resolve={ () => isLoggedIn } 
                resolveTo={ DashboardPage }
                redirect="/login" />

            <Redirect to='/login' />
        </Switch>
    );
};

export default Application;