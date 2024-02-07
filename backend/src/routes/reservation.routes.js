import {
    createReservation,
    getAll,
    getAllByUserId,
    getAllByMovieTimeId,
} from '../controllers/reservation.controller.js';

import { verifyAccessToken } from '../middleware/verify.js';

export default (express, app) => {
    const router = express.Router();

    // Get a reservation.
    router.get('/', getAll);

    // Select a reservation by User id.
    router.get('/users/:id', getAllByUserId);

    // Select a reservation by User id.
    router.get('/times/:id', getAllByMovieTimeId);

    // Create a reservation.
    router.post('/', verifyAccessToken, createReservation);

    // Add routes to server.
    app.use('/reservations', router);
};
