import {
    createUser as create,
    updateUser,
    deleteUser,
} from '../controllers/user.controller.js';
import { findUserById } from '../middleware/find.js';
import { createUser } from '../middleware/create.js';
import { signAccessToken, signRefreshToken } from '../middleware/sign.js';
import { verifyAccessToken } from '../middleware/verify.js';

export default (express, app) => {
    const router = express.Router();

    // Create a new user.
    router.post('/', [createUser, signAccessToken, signRefreshToken], create);

    // Update an existing user's profile or password.
    router.patch('/', [verifyAccessToken, findUserById], updateUser);

    // Delete a user
    router.delete('/', [verifyAccessToken, findUserById], deleteUser);

    // Add routes to server.
    app.use('/users', router);
};
