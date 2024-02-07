import bcrypt from 'bcrypt';
import db from '../database/index.js';

// --- PATCH ---

// Update a user's information
// PATCH route: /api/users/:id
export const updateUser = async (req, res) => {
    if (req.body?.firstName !== undefined) {
        req.user.firstName = req.body.firstName;
    }

    if (req.body?.lastName !== undefined) {
        req.user.lastName = req.body.lastName;
    }

    if (req.body?.email !== undefined) {
        req.user.email = req.body.email;
    }

    if (req.body?.password !== undefined) {
        req.user.passwordHash = await bcrypt.hash(req.body.password, 10);
    }

    await req.user.save();
    res.status(204).send('User profile updated');
};

// --- POST ---

// Create a user in the database.
// POST route: /api/users
export const createUser = async (req, res) => {
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

    res.status(201).json({
        id: req.user.id,
        joined: req.user.createdAt,
        accessToken: req.accessToken,
    });
};

// --- DELETE ---

// Delete a user and their reviews
// DELETE route: /api/users/:id
export const deleteUser = async (req, res) => {
    // Delete reviews
    db.UserReview.destroy({
        where: {
            userId: req.user.id,
        },
    });

    // Delete user
    req.user.destroy();

    // Clear the client's cookie
    res.clearCookie('refreshToken', {
        httpOnly: true,
        // sameSite: 'None',
        // secure: true,
    });

    res.status(204).send('User profile removed');
};
