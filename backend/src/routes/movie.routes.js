import {
    getAll,
    getMatching,
    getShowing,
    getUpcoming,
    getOneByTitle,
    getOneById,
    getAllUserReviewsByMovie,
    getOneMovieTimeById
} from '../controllers/movie.controller.js';

export default (express, app) => {
    const router = express.Router();

    router.get('/', (req, res, next) => {
        if ('title' in req.query) {
            // Select a movie by its (encoded) title.
            getOneByTitle(req, res, next);
        } else if ('query' in req.query) {
            // Select a movie by query string.
            getMatching(req, res, next);
        } else {
            // Select all movies
            getAll(req, res, next);
        }
    });

    // Select movies that are showing.
    router.get('/showing', getShowing);

    // Select movies that are upcoming.
    router.get('/upcoming', getUpcoming);

    // Select a movie by its id.
    router.get('/:id', getOneById);

    // Select user reviews of a movie by its id.
    router.get('/:id/userreviews', getAllUserReviewsByMovie);

    // Select a movie time by its id.
    router.get('/times/:id', getOneMovieTimeById);

    // Add routes to server.
    app.use('/movies', router);
};
