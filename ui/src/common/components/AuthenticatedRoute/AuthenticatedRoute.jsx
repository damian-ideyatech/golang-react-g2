import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthenticatedRoute
        = ({ redirect, resolve, resolveTo: Component, ...props }) => {
    return (
        <Route { ...props } render={(props) => {
            return resolve() ? 
                <Component { ...props } /> :
                <Redirect to={ redirect } />
        }} />
    );
};

export default AuthenticatedRoute;