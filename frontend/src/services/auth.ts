import { useEffect, useState } from 'react';
import { getUser, loginUser, logoutUser, registerUser } from '../api/auth';
import { User } from '../types/user.types';

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUser = async () => {
            const fetchedUser = await getUser();
            setUser(fetchedUser);
            setLoading(false);
        };

        fetchUser();
    }, []);

    const login = async (credentials: { email: string; password: string }) => {
        const loggedInUser = await loginUser(credentials);
        setUser(loggedInUser);
    };

    const register = async (userData: { email: string; password: string }) => {
        const newUser = await registerUser(userData);
        setUser(newUser);
    };

    const logout = async () => {
        await logoutUser();
        setUser(null);
    };

    return { user, loading, login, register, logout };
};

export default useAuth;