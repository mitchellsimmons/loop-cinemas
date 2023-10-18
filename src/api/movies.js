import { useQuery } from '@tanstack/react-query';

import axios from './axios';

// --- Constants ---

const MOVIES_URL = '/movies';
const SHOWING_URL = '/movies/showing';
const UPCOMING_URL = '/movies/upcoming';
const MOVIE_TIMES_URL = '/movies/times';

// --- Utils ---

// Returns the average rating, given a list of Reviews
export const getAverageRatingFromReviews = (reviews) => {
    let rating = 0;
    for (let review of reviews) {
        rating += review.rating;
    }

    return reviews.length ? rating / reviews.length : 0;
};

export const getQualifiedResource = (resource) => {
    return process.env.REACT_APP_AWS_BUCKET_URL + '/' + resource;
};

// --- GET ---

// Custom hook for fetching all movies
export const useFetchMovies = (
    times = false,
    cast = false,
    criticReviews = false,
    userReviews = false
) => {
    const { isLoading, isError, data } = useQuery({
        queryKey: ['movies', times, cast, criticReviews, userReviews],
        queryFn: async () => {
            // Invoke axios instance
            let query = times ? '?times' : '';
            if (cast) {
                query += query ? '&cast' : '?cast';
            }
            if (criticReviews) {
                query += query ? '&criticReviews' : '?criticReviews';
            }
            if (userReviews) {
                query += query ? '&userReviews' : '?userReviews';
            }
            query = MOVIES_URL + query;

            const { data } = await axios.get(query);
            // This value will be assigned to the data property of the object returned from useQuery()
            return data;
        },
    });

    return { isLoading, isError, data };
};

// Custom hook for fetching now showing movies
export const useFetchShowing = (
    times = false,
    cast = false,
    criticReviews = false,
    userReviews = false
) => {
    const { isLoading, isError, data } = useQuery({
        queryKey: [
            'movies',
            'showing',
            times,
            cast,
            criticReviews,
            userReviews,
        ],
        queryFn: async () => {
            // Invoke axios instance
            let query = times ? '?times' : '';
            if (cast) {
                query += query ? '&cast' : '?cast';
            }
            if (criticReviews) {
                query += query ? '&criticReviews' : '?criticReviews';
            }
            if (userReviews) {
                query += query ? '&userReviews' : '?userReviews';
            }
            query = SHOWING_URL + query;

            const { data } = await axios.get(query);
            // This value will be assigned to the data property of the object returned from useQuery()
            return data;
        },
    });

    return { isLoading, isError, data };
};

// Custom hook for fetching upcoming movies
export const useFetchUpcoming = (
    times = false,
    cast = false,
    criticReviews = false,
    userReviews = false
) => {
    const { isLoading, isError, data } = useQuery({
        queryKey: [
            'movies',
            'upcoming',
            times,
            cast,
            criticReviews,
            userReviews,
        ],
        queryFn: async () => {
            // Invoke axios instance
            let query = times ? '?times' : '';
            if (cast) {
                query += query ? '&cast' : '?cast';
            }
            if (criticReviews) {
                query += query ? '&criticReviews' : '?criticReviews';
            }
            if (userReviews) {
                query += query ? '&userReviews' : '?userReviews';
            }
            query = UPCOMING_URL + query;

            const { data } = await axios.get(query);
            // This value will be assigned to the data property of the object returned from useQuery()
            return data;
        },
    });

    return { isLoading, isError, data };
};

// Custom hook for fetching a movie by its title
export const useFetchMovieByTitle = (
    title,
    times = false,
    cast = false,
    criticReviews = false,
    userReviews = false
) => {
    const { isLoading, isError, data } = useQuery({
        queryKey: ['movies', title, times, cast, criticReviews, userReviews],
        queryFn: async () => {
            // Invoke axios instance
            let query =
                MOVIES_URL +
                `?title=${encodeURIComponent(title)}` +
                (times ? '&times' : '') +
                (cast ? '&cast' : '') +
                (criticReviews ? '&criticReviews' : '') +
                (userReviews ? '&userReviews' : '');

            const { data } = await axios.get(query);
            // This value will be assigned to the data property of the object returned from useQuery()
            return data;
        },
    });

    return { isLoading, isError, data };
};

// Custom hook for fetching movies by querying matching titles
export const useFetchMoviesByTitleQuery = (
    query,
    times = false,
    cast = false,
    criticReviews = false,
    userReviews = false,
    limit = 0,
    offset = 0
) => {
    const { isLoading, isError, data } = useQuery({
        queryKey: [
            'movies',
            query,
            times,
            cast,
            criticReviews,
            userReviews,
            limit,
            offset,
        ],
        queryFn: async () => {
            if (!query) {
                return [];
            }

            // Invoke axios instance
            let queryURL =
                MOVIES_URL +
                '?query=' +
                encodeURIComponent(query) +
                (times ? '&times' : '') +
                (cast ? '&cast' : '') +
                (criticReviews ? '&criticReviews' : '') +
                (userReviews ? '&userReviews' : '') +
                (limit ? '&limit=' + limit : '') +
                (offset ? '&offset=' + offset : '');

            const { data } = await axios.get(queryURL);
            // This value will be assigned to the data property of the object returned from useQuery()
            return data;
        },
    });

    return { isLoading, isError, data };
};

// Custom hook for fetching a movie by its title
export const useFetchMovieById = (
    id,
    times = false,
    cast = false,
    criticReviews = false,
    userReviews = false
) => {
    const { isLoading, isError, data } = useQuery({
        queryKey: ['movies', id, times, cast, criticReviews, userReviews],
        queryFn: async () => {
            // Invoke axios instance
            let query = times ? '?times' : '';
            if (cast) {
                query += query ? '&cast' : '?cast';
            }
            if (criticReviews) {
                query += query ? '&criticReviews' : '?criticReviews';
            }
            if (userReviews) {
                query += query ? '&userReviews' : '?userReviews';
            }
            query = MOVIES_URL + '/' + id.toString() + query;

            const { data } = await axios.get(query);
            // This value will be assigned to the data property of the object returned from useQuery()
            return data;
        },
    });

    return { isLoading, isError, data };
};

// Custom hook for fetching a movie time by its id
export const useFetchMovieTimeById = (timeId, reservedSeats = false) => {
    const { isLoading, isError, data } = useQuery({
        queryKey: ['movieTimes', timeId],
        queryFn: async () => {
            const query =
                `${MOVIE_TIMES_URL}/${timeId}` +
                (reservedSeats ? '?reservedSeats' : '');
            const { data } = await axios.get(query);
            // This value will be assigned to the data property of the object returned from useQuery()
            return data;
        },
    });

    return { isLoading, isError, data };
};
