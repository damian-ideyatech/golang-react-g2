import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import Application from 'common/components/Application/Application';
import { LoginReducer } from 'login/reducers/LoginReducer';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

// Initialize request interceptor.
axios.interceptors.request.use((config) => {
    // Set stuff for HTTP request here.
    // Right now, it sets the headers for an Opentides4 app.
    return config;

}, (error) => {
    return Promise.reject(error);
});

// Initialize response interceptor.
axios.interceptors.response.use((value) => {
    // Parse HTTP response here.
    // Right now, code assumes AxiosResponse has a data field
    // and returns it as a resolved Promise.
    return value;
}, (error) => {
    return Promise.reject(error);
});

// Initialize redux stuff.
const store = createStore(
    combineReducers({
        login: LoginReducer,
    })
);

// Render React elements to #root.
ReactDOM.render((
    <Provider store={ store }>
        <BrowserRouter>
            <Application />
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));