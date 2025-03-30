import { useAuth as useAuthContext } from '../contexts/AuthContext';

/**
 * Hook to access the auth context
 * @returns The auth context containing user, loading state, and auth methods
 */
const useAuth = () => {
    return useAuthContext();
};

export default useAuth;