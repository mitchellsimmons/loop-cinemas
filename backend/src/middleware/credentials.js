import { allowedOrigins } from '../config/cors.js';

// Allow origin to receive cookies
export default (req, res, next) => {
    if (allowedOrigins.includes(req.headers.origin)) {
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
};
