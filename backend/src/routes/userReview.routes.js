import {
    getAll,
    getAllUserReviewsByUser,
    editReview,
    createReview,
    deleteReview,
} from '../controllers/userReview.controller.js';
import { verifyAccessToken } from '../middleware/verify.js';

export default (express, app) => {
    const router = express.Router();

    // Select all posts.
    router.get('/', getAll);

    // Select all the reviews from a user across all movies.
    router.get('/:userId', getAllUserReviewsByUser);

    // Edit an existing post.
    router.patch('/:movieId', verifyAccessToken, editReview);

    // Create a new post.
    router.post('/:movieId', verifyAccessToken, createReview);

    // Delete an existing post.
    router.delete('/:movieId', verifyAccessToken, deleteReview);

    // Add routes to server.
    app.use('/userreviews', router);
};
