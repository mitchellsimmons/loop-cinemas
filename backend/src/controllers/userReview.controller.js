import db from '../database/index.js';

/**
 * Select all user reviews from the database.
 *
 * GET route: /api/userreviews
 */
export const getAll = async (req, res) => {
    const reviews = await db.UserReview.findAll();

    for (const review of reviews) {
        const user = await db.User.findByPk(review.userId);
        review.dataValues.firstName = user.firstName;
        review.dataValues.lastName = user.lastName;
    }

    res.json(reviews);
};

/**
 * Select all user reviews from the database for a specific user.
 *
 * GET route: /api/userreviews/:id
 */
export const getAllUserReviewsByUser = async (req, res) => {
    const reviews = await db.UserReview.findAll({
        where: {
            userId: req.params.userId,
        },
    });

    for (const review of reviews) {
        const user = await db.User.findByPk(review.userId);
        review.dataValues.firstName = user.firstName;
        review.dataValues.lastName = user.lastName;
    }

    res.json(reviews);
};

/**
 * Edit a user's review.
 *
 * PATCH route: /api/userreviews
 */
export const editReview = async (req, res) => {
    const review = await db.UserReview.findOne({
        where: {
            userId: req.userId, // Verified from accessToken
            movieId: req.params.movieId,
        },
    });

    if (review !== null) {
        review.text = req.body.text;
        review.rating = req.body.rating;
        // NOTE: Not awaiting this will cause much debugging pain!
        await review.save();
    } else {
        res.sendStatus(404); // Not found
    }

    res.sendStatus(204); // No content
};

/**
 * Create a user review.
 *
 * POST route: /api/userreviews
 */
export const createReview = async (req, res) => {
    try {
        await db.UserReview.create({
            text: req.body.text,
            rating: req.body.rating,
            userId: req.userId, // Verified from accessToken
            movieId: req.params.movieId,
        });

        res.sendStatus(201); // Created
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message); // Internal server error
    }
};

/**
 * Delete a user's review.
 *
 * DELETE route: /api/userreviews
 */
export const deleteReview = async (req, res) => {
    try {
        await db.UserReview.destroy({
            where: {
                userId: req.userId, // Verified from accessToken
                movieId: req.params.movieId,
            },
        });

        res.sendStatus(204); // No content
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message); // Internal server error
    }
};
