import { useEffect } from 'react';
import axios, { axiosProtected } from './axios';
import { useUserContext } from 'context/UserProvider';

// --- Constants ---

const LOGIN_URL = '/login';
const LOGOUT_URL = '/logout';
const REFRESH_URL = '/refresh';

// --- Protected Routes ---

// Request a new access token from the refresh token endpoint
export const useRefreshToken = () => {
    const { setAccessToken, setUser } = useUserContext();

    const refreshAuth = async () => {
        const res = await axios.get(REFRESH_URL, {
            withCredentials: true, // Send HttpOnly cookie (refresh token) in request
        });

        if (res.status === 200) {
            setUser({
                id: res.data.id,
                email: res.data.email,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                joined: res.data.joined,
            });

            setAccessToken(res.data.accessToken);
            return res.data.accessToken;
        }
    };

    return refreshAuth;
};

// Return an axios instance that can be used to make requests to protected routes
// If the request fails, then an attempt will be made to refresh the current access token
export const useAxiosProtected = () => {
    const { accessToken } = useUserContext();
    const refreshAuth = useRefreshToken();

    useEffect(() => {
        // Assign Authorization header to request
        const requestInterceptor = axiosProtected.interceptors.request.use(
            (config) => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }

                return config;
            },
            (err) => Promise.reject(err)
        );

        // Intercept failed requests
        const responseInterceptor = axiosProtected.interceptors.response.use(
            (res) => res,
            async (err) => {
                const prevRequest = err.config;

                // If access token has expired we will receive a 403 error status
                if (err?.response?.status === 403 && !prevRequest?.sent) {
                    // Only intercept the first error
                    prevRequest.sent = true;

                    // Refresh the access token
                    // If cookie has expired we will receive a 401 error as it will no longer be sent to the server
                    const accessTokenRefreshed = await refreshAuth();

                    // Update the request Authorization header
                    prevRequest.headers[
                        'Authorization'
                    ] = `Bearer ${accessTokenRefreshed}`;

                    // Retry request with new access token
                    return axiosProtected(prevRequest);
                }

                // Return error for any other case
                return Promise.reject(err);
            }
        );

        // Cleanup interceptor on unmount
        return () => {
            axiosProtected.interceptors.request.eject(requestInterceptor);
            axiosProtected.interceptors.response.eject(responseInterceptor);
        };
    }, [accessToken, refreshAuth]);

    return axiosProtected;
};

// --- Login ---

// Validate user email
export const validateEmail = (email) => {
    // Verify email format is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate user password
export const validatePassword = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Returns false if any of the conditions are not met (password too weak)
    return (
        password.length >= minLength &&
        hasUppercase &&
        hasLowercase &&
        hasDigits &&
        hasSpecialChar
    );
};

export const useLogin = () => {
    const { setUser, setAccessToken } = useUserContext();

    const login = async (email, password) => {
        try {
            // accessToken will be returned in response payload
            // refreshToken will be received as a http cookie (we want this to persist in non-JS storage)
            const res = await axios.patch(
                LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    // Required for cookie response
                    withCredentials: true,
                }
            );

            if (res.status === 200) {
                setUser({
                    id: res.data.id,
                    email,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    joined: res.data.joined,
                });
                setAccessToken(res.data.accessToken);
            }

            return { data: res.data, status: res.status };
        } catch (err) {
            return { data: null, status: err?.response?.status };
        }
    };

    return login;
};

// --- Logout ---

export const useLogout = () => {
    const { setUser, setAccessToken } = useUserContext();
    // This route is protected to prevent DoS attacks
    const axiosProtected = useAxiosProtected();

    const logout = async () => {
        try {
            const res = await axiosProtected.patch(LOGOUT_URL, null, {
                // This request does not send any data
                transformRequest: (data, headers) => {
                    delete headers['Content-Type'];
                    return data;
                },
            });

            return res.status;
        } catch (err) {
            return err?.response?.status;
        } finally {
            // Reset auth data even if server endpoint fails
            // NOTE: This must come after the request in case the user is on a protected route
            // Upon resetting state, the user will be immediately redirected from any RequireAuth route to the home page
            // This will in turn trigger the PersistLogin component to attempt to reauthenticate the user
            // Therefore we need to ensure the refreshToken cookie has been cleared before this occurs
            setUser(null);
            setAccessToken(null);
        }
    };

    return logout;
};
