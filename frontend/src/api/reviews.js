import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from './axios';
import { useAxiosProtected } from './auth';
import { useUserContext } from '@/context/UserProvider';

// --- Constants ---

const MOVIES_PARAM = 'movies';
const USER_REVIEWS_PARAM = 'userreviews';
export const REVIEW_HOUR_LIMIT = 12;

// --- Utils ---

// Returns the number of hours remaining until a given user can post a review
export const getUserReviewWaitTime = async (userId) => {
    let hoursSinceLastReview = Number.MAX_VALUE;
    let hoursRemaining = 0;
    let query = `/${USER_REVIEWS_PARAM}/${userId}`;

    try {
        const { data: reviews } = await axios.get(query);
        const now = new Date().getTime();

        for (const review of reviews) {
            const reviewDate = new Date(review.createdAt);
            var hours = Math.abs(now - reviewDate.getTime()) / 36e5;
            if (hours < hoursSinceLastReview) {
                hoursSinceLastReview = hours;
            }
        }

        hoursRemaining = Math.max(0, REVIEW_HOUR_LIMIT - hoursSinceLastReview);
        const hoursFloor = Math.floor(hoursRemaining);
        const minutesFloor = Math.floor((hoursRemaining - hoursFloor) * 60);
        return [hoursFloor, minutesFloor];
    } catch (err) {
        console.error(err);
        return [0, 0];
    }
};

// --- GET ---

// Custom hook for fetching user reviews of a movie by id
export const useFetchUserReviewsByMovieId = (movieId) => {
    const { isLoading, isError, data } = useQuery({
        queryKey: ['userReviews', movieId],
        queryFn: async () => {
            // Invoke axios instance
            let query = `/${MOVIES_PARAM}/${movieId}/${USER_REVIEWS_PARAM}`;
            const { data } = await axios.get(query);
            // This value will be assigned to the data property of the object returned from useQuery()
            return data;
        },
    });

    return { isLoading, isError, data };
};

// Custom hook for fetching a user's reviews for all movie
export const useFetchUserReviewsByUserId = (userId) => {
    const { isLoading, isError, data } = useQuery({
        queryKey: ['userReviews', userId],
        queryFn: async () => {
            // Invoke axios instance
            let query = `/${USER_REVIEWS_PARAM}/${userId}`;
            const { data } = await axios.get(query);
            // This value will be assigned to the data property of the object returned from useQuery()
            return data;
        },
    });

    return { isLoading, isError, data };
};

// --- PATCH ---

export const useEditReview = () => {
    const queryClient = useQueryClient();
    const axiosProtected = useAxiosProtected();
    const navigate = useNavigate();
    const { setAccessToken, setUser } = useUserContext();

    const {
        isLoading,
        isError,
        status,
        mutate: editReview,
    } = useMutation({
        mutationFn: ({ movieId, text, rating }) => {
            // User ID is sent in accessToken
            let query = `/${USER_REVIEWS_PARAM}/${movieId}`;
            return axiosProtected.patch(
                query,
                JSON.stringify({ text, rating })
            );
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({
                queryKey: ['userReviews'],
            });
            toast('Successfully updated review');
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
                toast.error('Failed to update review');
            }
        },
    });

    return [editReview, { isLoading, isError, status }];
};

// --- POST ---

export const useCreateReview = () => {
    const queryClient = useQueryClient();
    const axiosProtected = useAxiosProtected();
    const navigate = useNavigate();
    const { setAccessToken, setUser } = useUserContext();

    const {
        isLoading,
        isError,
        status,
        mutate: createReview,
    } = useMutation({
        mutationFn: ({ movieId, text, rating }) => {
            // User ID is sent in accessToken
            let query = `/${USER_REVIEWS_PARAM}/${movieId}`;
            return axiosProtected.post(query, JSON.stringify({ text, rating }));
        },
        onSuccess: () => {
            toast('Successfully posted review');
            // Invalidate and refetch
            return queryClient.invalidateQueries({
                queryKey: ['userReviews'],
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
                toast.error('Failed to post review');
            }
        },
    });

    return [createReview, { isLoading, isError, status }];
};

// --- DELETE ---

export const useDeleteReview = () => {
    const queryClient = useQueryClient();
    const axiosProtected = useAxiosProtected();
    const navigate = useNavigate();
    const { setAccessToken, setUser } = useUserContext();

    const {
        isLoading,
        isError,
        status,
        mutate: deleteReview,
    } = useMutation({
        mutationFn: ({ movieId }) => {
            // User ID is sent in accessToken
            let query = `/${USER_REVIEWS_PARAM}/${movieId}`;
            return axiosProtected.delete(query);
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({
                queryKey: ['userReviews'],
            });
            toast('Successfully deleted review');
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
                toast.error('Failed to delete review');
            }
        },
    });

    return [deleteReview, { isLoading, isError, status }];
};
