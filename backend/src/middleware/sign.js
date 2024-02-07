import jwt from 'jsonwebtoken';

// --- Constants ---

const ACCESS_TOKEN_MAX_AGE = '10m';
const REFRESH_TOKEN_MAX_AGE = '1w';

// --- Middleware ---

// Generate an access token to enable user authentication on protected routes
// The access token has a short expiry but can be refreshed using a refresh token
export const signAccessToken = (req, res, next) => {
    jwt.sign(
        { userId: req.user.id, admin: req.user.admin },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_TOKEN_MAX_AGE },
        (err, accessToken) => {
            if (err) {
                console.error(err);
                res.status(500).send('Server failed to sign access token');
            } else {
                req.accessToken = accessToken;
                next();
            }
        }
    );
};

// Generate a refresh token that can be used to refresh an expired access token
// The refresh token has a longer expiry but cannot be refreshed (requires user to login again)
// When the user logs out, the refresh token will be invalidated (ie. removed from database)
export const signRefreshToken = (req, res, next) => {
    jwt.sign(
        { userId: req.user.id, admin: req.user.admin },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: REFRESH_TOKEN_MAX_AGE },
        (err, refreshToken) => {
            if (err) {
                console.error(err);
                res.status(500).send('Server failed to sign refresh token');
            } else {
                req.refreshToken = refreshToken;
                next();
            }
        }
    );
};
