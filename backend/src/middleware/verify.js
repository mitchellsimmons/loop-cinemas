import jwt from 'jsonwebtoken';

// --- Middleware ---

// Used by login route to verify the user
export const verifyUser = async (req, res, next) => {
    const isVerified = await req.user.verifyPassword(req.body.password);

    if (isVerified) {
        next();
    } else {
        res.status(401).send('Invalid password');
    }
};

// Used to protect routes that requires verification of logged in user
export const verifyAccessToken = (req, res, next) => {
    // Retrieve access token from authorization header
    const authorizationHeader =
        req.headers.authorization || req.headers.Authorization;

    if (!authorizationHeader?.startsWith('Bearer ')) {
        return res
            .status(401)
            .send('User unauthorized, no access token provided');
    }

    const token = authorizationHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            // Client is unauthorized (invalid access token)
            console.error(err);
            res.status(403).send(
                'User unauthorized, received invalid access token'
            );
        } else {
            req.userId = decoded.userId;
            req.admin = decoded.admin;
            next();
        }
    });
};

// Used to protect routes that require admin privilidges
export const verifyAdmin = (req, res, next) => {
    if (!req.admin) {
        return res
            .status(403)
            .send('User unauthorized, does not have admin priviledges');
    }

    next();
};
