import {
    handleLogin,
    handleLogout,
    handleRefreshToken,
} from '../controllers/auth.controller.js';
import { findUserById, findUserByEmail, findUserByRefreshToken } from '../middleware/find.js';
import { verifyAccessToken, verifyUser } from '../middleware/verify.js';
import { signAccessToken, signRefreshToken } from '../middleware/sign.js';

export default (express, app) => {
    const router = express.Router();

    // Verify user credentials, then generate authentication tokens
    router.patch(
        '/login',
        [findUserByEmail, verifyUser, signAccessToken, signRefreshToken],
        handleLogin
    );

    // Clear refresh token from database (sets User.refreshToken field to null)
    router.patch('/logout', [verifyAccessToken, findUserById], handleLogout);

    // Get a new access token
    router.get(
        '/refresh',
        [findUserByRefreshToken, signAccessToken],
        handleRefreshToken
    );

    // Add routes to server.
    app.use('/', router);
};
