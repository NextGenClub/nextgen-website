import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { login, logout } from '../services/auth';

const useAuth = () => {
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const currentUser = await getCurrentUser(); // Assume this function checks the current user
            setUser(currentUser);
            setLoading(false);
        };

        checkUser();
    }, [setUser]);

    const handleLogin = async (credentials) => {
        const loggedInUser = await login(credentials);
        setUser(loggedInUser);
    };

    const handleLogout = async () => {
        await logout();
        setUser(null);
    };

    return { user, loading, handleLogin, handleLogout };
};

export default useAuth;