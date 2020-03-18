import React, { useState, useEffect } from 'react';
import Datatable from 'react-bs-datatable';

import UserService from 'users/services/UserService';

const header = [
    { 
        title: 'Name', 
        prop: 'Name', 
        filterable: true, 
        sortable: true,
    },
    { 
        title: 'Email address', 
        prop: 'Email', 
        filterable: true, 
        sortable: true 
    },
];

const getUsers = async (setUsers) => {
    try {
        const data = await UserService.getUsers();
        setUsers(data);

    } catch (error) {
        console.error(error);
    }
};

const UserPage = () => {
    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        getUsers(setUsers);
    }, []);    

    return (
        <Datatable
            tableHeaders={ header }
            tableBody={ users }
            tableClass="striped hover responsive">
        </Datatable>
    );
};

export default UserPage;