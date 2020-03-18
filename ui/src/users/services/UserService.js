import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000';

export default {
    getUsers: async () => {
        let url = `${baseUrl}/api/v1/users`;
        const response = await axios.get(url);

        return response.data;
    },
};