import { useUserContext } from '@/context/UserProvider';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

const RequireLoggedOut = () => {
    const location = useLocation();
    const { user } = useUserContext();

    return user ? (
        <Navigate to='/' state={{ from: location }} replace />
    ) : (
        <Outlet />
    );
};

export default RequireLoggedOut;
