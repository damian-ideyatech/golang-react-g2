import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000';

export default {
    register: async (name, email, password, confirmPassword) => {
        let url = `${baseUrl}/api/v1/register`;
        const response = await axios.post(url, {
            name,
            email,
            password,
            confirmPassword,
        });

        return response.data;
    },

    login: async (email, password) => {
        let url = `${baseUrl}/api/v1/login`;
        const response = await axios.post(url, {
            email,
            password,
        });

        return response.data;
    },
};