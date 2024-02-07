import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from './axios';
import { useUserContext } from '@/context/UserProvider';
import { useAxiosProtected } from '@/api/auth';

// --- Constants ---

const USERS_URL = '/users';

// --- Register ---

export const useRegister = () => {
    const { setUser, setAccessToken } = useUserContext();

    const register = async (firstName, lastName, email, password) => {
        try {
            // accessToken will be returned in response payload
            // refreshToken will be received as a http cookie (we want this to persist in non-JS storage)
            const res = await axios.post(
                USERS_URL,
                JSON.stringify({ firstName, lastName, email, password }),
                {
                    // Required for cookie response
                    withCredentials: true,
                }
            );

            if (res.status === 201) {
                setUser({
                    id: res.data.id,
                    email,
                    password,
                    firstName: firstName,
                    lastName: lastName,
                    joined: res.data.joined,
                });
                setAccessToken(res.data.accessToken);
            }

            return { data: res.data, status: res.status };
        } catch (err) {
            return { data: null, status: err?.response?.status };
        }
    };

    return register;
};

// --- Update ---

export const useUpdateProfile = () => {
    const axiosProtected = useAxiosProtected();
    const navigate = useNavigate();
    const { user, setUser, setAccessToken } = useUserContext();

    const {
        isLoading,
        isError,
        mutate: updateProfile,
    } = useMutation({
        mutationFn: ({ firstName, lastName, email }) => {
            if (!user) {
                return;
            }

            // Update database
            return axiosProtected.patch(
                USERS_URL,
                JSON.stringify({ firstName, lastName, email })
            );
        },
        onSuccess: ({ config: { data } }) => {
            setUser({ ...user, ...JSON.parse(data) });
            toast('Successfully updated profile.');
        },
        onError: (err) => {
            console.error(err);

            if (
                err?.response?.status === 401 ||
                err?.response?.status === 403
            ) {
                navigate('/');
                setUser(null);
                setAccessToken(null);
                toast.error('Session has expired, please login again.');
            } else {
                toast.error('Failed to update profile.');
            }
        },
    });

    return [updateProfile, { isLoading, isError }];
};

export const useUpdatePassword = () => {
    const axiosProtected = useAxiosProtected();
    const navigate = useNavigate();
    const { user, setUser, setAccessToken } = useUserContext();

    const {
        isLoading,
        isError,
        mutate: updatePassword,
    } = useMutation({
        mutationFn: ({ password }) => {
            if (!user) {
                return;
            }

            // Update database
            return axiosProtected.patch(
                USERS_URL,
                JSON.stringify({ password })
            );
        },
        onSuccess: () => {
            toast('Successfully updated password.');
        },
        onError: (err) => {
            console.error(err);

            if (
                err?.response?.status === 401 ||
                err?.response?.status === 403
            ) {
                navigate('/');
                setUser(null);
                setAccessToken(null);
                toast.error('Session has expired, please login again.');
            } else {
                toast.error('Failed to update password.');
            }
        },
    });

    return [updatePassword, { isLoading, isError }];
};

// --- Delete ---

export const useDeleteAccount = () => {
    const axiosProtected = useAxiosProtected();
    const navigate = useNavigate();
    const { user, setUser, setAccessToken } = useUserContext();

    const {
        isLoading,
        isError,
        mutate: deleteAccount,
    } = useMutation({
        mutationFn: () => {
            if (!user) {
                return;
            }

            // Update database
            return axiosProtected.delete(USERS_URL, null, {
                // Required for cookie response
                withCredentials: true,
            });
        },
        onSuccess: () => {
            // Navigate back to home page
            navigate('/');
            setUser(null);
            setAccessToken(null);
            toast('Successfully deleted account.');
        },
        onError: (err) => {
            console.error(err);

            if (
                err?.response?.status === 401 ||
                err?.response?.status === 403
            ) {
                navigate('/');
                setUser(null);
                setAccessToken(null);
                toast.error('Session has expired, please login again.');
            } else {
                toast.error('Failed to delete account.');
            }
        },
    });

    return [deleteAccount, { isLoading, isError }];
};
