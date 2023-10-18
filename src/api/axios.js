import axios from 'axios';

// --- Axios Instance ---

export default axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // Request and response are both json
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// This is used exclusively by the useAxiosProtectedHook
export const axiosProtected = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // Request and response are both json
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    withCredentials: true,
});
