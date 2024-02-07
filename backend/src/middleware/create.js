import db from '../database/index.js';

export const createUser = async (req, res, next) => {
    // Check values are non-empty (this should be handled by frontend)
    if (
        !req.body.email ||
        !req.body.password ||
        !req.body.firstName ||
        !req.body.lastName
    ) {
        return res.status(400).send('All fields are required');
    }

    // Prevent user from registering with the same email as another
    const exists = (await db.User.findOneByEmail(req.body.email)) !== null;

    if (exists) {
        return res.status(409).send('User email already in use');
    }

    try {
        // Password is automatically salted and hashed via model hook
        const user = await db.User.create({
            email: req.body.email,
            passwordHash: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            admin: false,
            blocked: false,
        });

        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
};
