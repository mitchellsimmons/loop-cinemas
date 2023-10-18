import { useState, useEffect } from 'react';

import { useRefreshToken } from '../../api/auth';
import { useUserContext } from 'context/UserProvider';
import { Outlet } from 'react-router-dom';

const PersistLogin = () => {
    const { accessToken } = useUserContext();
    const refresh = useRefreshToken();

    // Child routes will initially display nothing whilst we try to reauthenticate the user
    // This is because the RequireAuth and RequireLoggedOut components will immediately redirect
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const reauthenticate = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        !accessToken ? reauthenticate() : setIsLoading(false);
    }, [accessToken, refresh]);

    return isLoading ? null : <Outlet />;
};

export default PersistLogin;
