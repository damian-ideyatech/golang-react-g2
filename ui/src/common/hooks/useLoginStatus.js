
import { useSelector } from 'react-redux';

const useLoginStatus = () => {
    const userToken = useSelector((state) => state.login.userToken);

    const isLoggedIn = () => {
        return userToken || localStorage.getItem('USER_TOKEN');
    };

    return !!isLoggedIn();
};

export default useLoginStatus;