import React from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';

import { 
    useDispatch, 
    useSelector 
} from 'react-redux';

import UserPage from 'users/components/UserPage';
import ServicePage from 'svc/components/ServicePage';

import LoginAction from 'login/actions/LoginAction';
import 'dashboard/components/DashboardPage/DashboardPage.css';

const DashboardPage = () => {
    const dispatch = useDispatch();
    const username = useSelector((state) => {
        return state.login.username || localStorage.getItem('USERNAME');
    });

    const onLogout = (event) => {
        localStorage.removeItem('USERNAME');
        localStorage.removeItem('USER_TOKEN');

        dispatch(LoginAction.logoutSuccess());
    };

    return (
        <div className="wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/service">Services</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/users">Users</Link>
                    </li>
                    <li className="active">
                        <Link to="#" onClick={ onLogout }>Logout</Link>
                    </li>
                </ul>
            </nav>
            <div id="content" className="container-fluid">
                <nav className="navbar navbar-expand-lg">
                    <div className="col text-right">
                        <span>{ username }</span>
                    </div>     
                </nav>
                <section>
                    <Switch>
                        <Route path="/dashboard/users"
                            component={ UserPage } />
                        <Route path="/dashboard/service"
                            component={ ServicePage } />
                        <Redirect to="/dashboard/users" />
                    </Switch>
                </section>
            </div>
        </div>
    );
};

export default DashboardPage;