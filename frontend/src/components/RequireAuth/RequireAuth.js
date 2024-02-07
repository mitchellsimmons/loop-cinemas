import { useUserContext } from '@/context/UserProvider';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
    const location = useLocation();
    const { user } = useUserContext();

    return user ? (
        <Outlet />
    ) : (
        <Navigate to='/' state={{ from: location }} replace />
    );
};

export default RequireAuth;
