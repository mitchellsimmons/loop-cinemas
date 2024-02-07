import addAuthRoutes from './auth.routes.js';
import addMovieRoutes from './movie.routes.js';
import addReservationRoutes from './reservation.routes.js';
import addUserRoutes from './user.routes.js';
import addUserReviewRoutes from './userReview.routes.js';
import addS3Routes from './s3.routes.js';

export default (express, app) => {
    addAuthRoutes(express, app);
    addMovieRoutes(express, app);
    addReservationRoutes(express, app);
    addUserRoutes(express, app);
    addUserReviewRoutes(express, app);
    addS3Routes(express, app);
};
