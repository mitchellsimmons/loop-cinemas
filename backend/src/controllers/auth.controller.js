import db from '../database/index.js';

// --- GET ---

// Select user from database via refresh token, then generate new access token
// GET route: /api/refresh
export const handleRefreshToken = (req, res) => {
    res.json({
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        joined: req.user.createdAt,
        accessToken: req.accessToken,
    });
};

// --- PATCH ---

// Select one user from the database if email and password are a match.
// Then generate access token and refresh token.
// GET route: /api/login
export const handleLogin = async (req, res) => {
    // Assign refresh token to user database entry
    req.user.refreshToken = req.refreshToken;
    await req.user.save();

    // The refresh token will be sent in a HttpOnly Cookie
    // The client cannot access the refreshToken via JS (more secure than localStorage)
    // The cookie will expire after one week (same as refreshToken expiry)
    res.cookie('refreshToken', req.refreshToken, {
        httpOnly: true,
        // sameSite: 'None',
        // secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // The access token is sent the client and will be stored in memory
    // The client needs to be able to use the accessToken to access protected routes
    // The access token has a short expiry but can be refreshed by the refresh token
    // by sending a refresh request `withCredentials` (cookie sent to server)
    // An adversary must acquire both the accessToken and refreshToken to have continued access
    res.json({
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        joined: req.user.createdAt,
        accessToken: req.accessToken,
    });
};

export const handleLogout = async (req, res) => {
    // Clear refresh token from user database entry
    req.user.refreshToken = null;
    await req.user.save();

    // Clear the client's cookie
    res.clearCookie('refreshToken', {
        httpOnly: true,
        // sameSite: 'None',
        // secure: true,
    });

    res.sendStatus(204); // No content
};
