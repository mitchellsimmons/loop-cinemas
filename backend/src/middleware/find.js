import db from '../database/index.js';

// --- Middleware ---

// Find a user by their id
// NOTE: This is only to be used by protected routes (ie. after verifyAccessToken middleware)
export const findUserById = async (req, res, next) => {
    const user = await db.User.findByPk(req.userId);

    if (user === null) {
        res.status(401).send('Invalid user id');
    } else {
        req.user = user;
        next();
    }
};

// Find a user by their email
export const findUserByEmail = async (req, res, next) => {
    const user = await db.User.findOneByEmail(req.body.email);

    if (user === null) {
        res.status(401).send('Invalid email');
    } else {
        req.user = user;
        next();
    }
};

// Find a user by their refresh token
export const findUserByRefreshToken = async (req, res, next) => {
    const cookies = req.cookies;
    const refreshToken = cookies?.refreshToken;

    if (refreshToken === undefined) {
        res.status(401).send('Missing refresh token');
    } else {
        const user = await db.User.findOneByRefreshToken(refreshToken);

        if (user === null) {
            // If the refreshToken is not assigned to a user, then we should delete the cookie
            res.clearCookie('refreshToken', {
                httpOnly: true,
                // sameSite: 'None',
                // secure: true,
            });
            res.status(403).send('Invalid refresh token');
        } else {
            req.user = user;
            next();
        }
    }
};
