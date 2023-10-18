import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from './axios';
import { useAxiosProtected } from './auth';
import { useUserContext } from 'context/UserProvider';

// --- Constants ---

const RESERVATIONS_URL = '/reservations';
const USER_RESERVATIONS_URL = '/reservations/users';
const TIMES_RESERVATIONS_URL = '/reservations/times';

// --- Utils ---

export const getFormattedDateFromDay = (day) => {
    let date = new Date();
    let offset = day - date.getDay();
    if (offset > 0) {
        date.setDate(date.getDate() + offset);
    } else if (offset < 0) {
        offset = offset + 7;
        date.setDate(date.getDate() + offset);
    }

    return date.toLocaleString('default', {
        weekday: 'long',
        month: 'short',
        day: '2-digit',
    });
};

// --- GET ---

// Retrieve reservations for a user
export const useFetchReservationsByUserId = (
    userId,
    seats = false,
    time = false
) => {
    const { isLoading, isError, data } = useQuery({
        queryKey: ['reservations', userId],
        queryFn: async () => {
            let query = seats ? '?seats' : '';
            if (time) {
                query += query ? '&time' : '?time';
            }
            query = `${USER_RESERVATIONS_URL}/${userId}${query}`;
            const { data } = await axios.get(query);
            // This value will be assigned to the data property of the object returned from useQuery()
            return data;
        },
    });

    return { isLoading, isError, data };
};

export const useFetchReservationsByMovieTimeId = (
    timeId,
    seats = false,
    user = false
) => {
    const { isLoading, isError, data } = useQuery({
        queryKey: ['reservations', timeId],
        queryFn: async () => {
            let query = seats ? '?seats' : '';
            if (user) {
                query += query ? '&user' : '?user';
            }
            query = `${TIMES_RESERVATIONS_URL}/${timeId}${query}`;
            const { data } = await axios.get(query);
            // This value will be assigned to the data property of the object returned from useQuery()
            return data;
        },
    });

    return { isLoading, isError, data };
};

// --- POST ---

export const useCreateReservation = () => {
    const queryClient = useQueryClient();
    const axiosProtected = useAxiosProtected();
    const navigate = useNavigate();
    const { setAccessToken, setUser } = useUserContext();

    const {
        isLoading,
        isError,
        mutate: createReservation,
    } = useMutation({
        mutationFn: ({ userId, timeId, seats }) => {
            // User ID is sent in accessToken
            let query = `${RESERVATIONS_URL}`;
            return axiosProtected.post(
                query,
                JSON.stringify({ userId, movieTimeId: timeId, seats })
            );
        },
        onSuccess: () => {
            toast('Booking Confirmed!');
            navigate('/profile');
            // Invalidate and refetch
            return queryClient.invalidateQueries({
                queryKey: ['reservations'],
            });
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
                toast.error('Failed to make booking');
            }
        },
    });

    return [createReservation, { isLoading, isError }];
};
