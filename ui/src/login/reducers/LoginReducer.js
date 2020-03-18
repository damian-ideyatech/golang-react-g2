import LoginActionCode from 'login/constants/ActionCodes';

const initialState = {
    username: '',
    userToken: '',
};

export const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LoginActionCode.LOGIN_SUCCESS: {
            return { 
                ...state, 
                username: action.payload.username,
                userToken: action.payload.userToken
            };
        }
        
        case LoginActionCode.LOGOUT_SUCCESS: {
            return {
                ...state,
                username: '',
                userToken: '',
            };
        }

        default: {
            return {
                ...state,
            };
        }
    }
};