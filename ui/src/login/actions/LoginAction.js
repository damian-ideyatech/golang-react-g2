import LoginActionCode from 'login/constants/ActionCodes';

export default {
    loginSuccess: (username, userToken) => {
        return {
            type: LoginActionCode.LOGIN_SUCCESS,
            payload: {
                username: username,
                userToken: userToken,
            },
        };
    },

    loginFailure: (error) => {
        return {
            type: LoginActionCode.LOGIN_FAILURE,
            payload: {
                error: error,
            },
        };
    },

    logoutSuccess: () => {
        return {
            type: LoginActionCode.LOGOUT_SUCCESS,
            payload: {},
        };
    },
};