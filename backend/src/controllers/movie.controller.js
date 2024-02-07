import db from '../database/index.js';
import { Op } from 'sequelize';

// --- Constants ---

const LIMIT_QUERY_PARAMETER = 'limit';
const OFFSET_QUERY_PARAMETER = 'offset';
const QUERY_QUERY_PARAMETER = 'query';
const TIMES_QUERY_PARAMETER = 'times';
const CAST_QUERY_PARAMETER = 'cast';
const CRITIC_REVIEWS_QUERY_PARAMETER = 'criticReviews';
const USER_REVIEWS_QUERY_PARAMETER = 'userReviews';
const SEATS_QUERY_PARAMETER = 'reservedSeats';

// --- Utils ---

const getTimesByMovieId = async (id) => {
    const times =
        (await db.MovieTime.findAll({
            where: {
                movieId: id,
            },
        })) || [];

    return times;
};

const getCriticReviewsByMovieId = async (id) => {
    const reviews =
        (await db.CriticReview.findAll({
            where: {
                movieId: id,
            },
        })) || [];

    return reviews;
};

const getUserReviewsByMovieId = async (id) => {
    const reviews =
        (await db.UserReview.findAll({
            where: {
                movieId: id,
            },
        })) || [];

    return reviews;
};

const getCastByMovieId = async (id) => {
    const cast =
        (
            await db.MovieActor.findAll({
                where: {
                    movieId: id,
                },
            })
        ).map((movieActor) => movieActor.actor) || [];

    return cast;
};

// --- Handlers ---

/**
 * Select all movies from the database.
 *
 * GET route: /api/movies
 *
 * Optional query params:
 *   times - Include all MovieTime records for each movie
 *   cast - Include all cast members for each movie
 *   criticReviews - Include all CriticReview records for each movie
 *   userReviews - Include all UserReview records for each movie
 */
export const getAll = async (req, res) => {
    const movies = await db.Movie.findAll();

    // Select additional data if requested
    if (TIMES_QUERY_PARAMETER in req.query) {
        for (let movie of movies) {
            movie.dataValues.times = await getTimesByMovieId(movie.id);
        }
    }

    if (CAST_QUERY_PARAMETER in req.query) {
        for (let movie of movies) {
            movie.dataValues.cast = await getCastByMovieId(movie.id);
        }
    }

    if (CRITIC_REVIEWS_QUERY_PARAMETER in req.query) {
        for (let movie of movies) {
            movie.dataValues.criticReviews = await getCriticReviewsByMovieId(
                movie.id
            );
        }
    }

    if (USER_REVIEWS_QUERY_PARAMETER in req.query) {
        for (let movie of movies) {
            movie.dataValues.userReviews = await getUserReviewsByMovieId(
                movie.id
            );
        }
    }

    res.json(movies);
};

/**
 * Select all movies from the database whose title contains a given query string.
 *
 * GET route: /api/movies?query=query
 *
 * Required query params:
 *   query - Include all movies whose title contains this string.
 *
 * Optional query params:
 *   times - Include all MovieTime records for each movie
 *   cast - Include all cast members for each movie
 *   criticReviews - Include all CriticReview records for each movie
 *   userReviews - Include all UserReview records for each movie
 *   limit - Limit the number of results
 *   offset - Return results from a given offset
 */
export const getMatching = async (req, res) => {
    let limits = {};
    if (LIMIT_QUERY_PARAMETER in req.query) {
        limits = {
            offset:
                OFFSET_QUERY_PARAMETER in req.query
                    ? parseInt(req.query[OFFSET_QUERY_PARAMETER])
                    : 0,
            limit: parseInt(req.query[LIMIT_QUERY_PARAMETER]),
        };
    }

    const movies = await db.Movie.findAll({
        ...limits,
        where: {
            title: {
                [Op.like]: '%' + req.query[QUERY_QUERY_PARAMETER] + '%',
            },
        },
    });

    // Select additional data if requested
    if (TIMES_QUERY_PARAMETER in req.query) {
        for (let movie of movies) {
            movie.dataValues.times = await getTimesByMovieId(movie.id);
        }
    }

    if (CAST_QUERY_PARAMETER in req.query) {
        for (let movie of movies) {
            movie.dataValues.cast = await getCastByMovieId(movie.id);
        }
    }

    if (CRITIC_REVIEWS_QUERY_PARAMETER in req.query) {
        for (let movie of movies) {
            movie.dataValues.criticReviews = await getCriticReviewsByMovieId(
                movie.id
            );
        }
    }

    if (USER_REVIEWS_QUERY_PARAMETER in req.query) {
        for (let movie of movies) {
            movie.dataValues.userReviews = await getUserReviewsByMovieId(
                movie.id
            );
        }
    }

    res.json(movies);
};

/**
 * Select showing movies from the database.
 *
 * GET route: /api/movies/showing
 *
 * Optional query params:
 *   times - Include all MovieTime records for each movie
 *   cast - Include all cast members for each movie
 *   criticReviews - Include all CriticReview records for each movie
 *   userReviews - Include all UserReview records for each movie
 */
export const getShowing = async (req, res) => {
    const movies = await db.Movie.findAll({
        where: {
            released: true,
        },
    });

    // Select additional data if requested
    if (TIMES_QUERY_PARAMETER in req.query) {
        for (let movie of movies) {
            movie.dataValues.times = await getTimesByMovieId(movie.id);
        }
    }

    if (CAST_QUERY_PARAMETER in req.query) {
        for (let movie of movies) {
            movie.dataValues.cast = await getCastByMovieId(movie.id);
        }
    }

    if (CRITIC_REVIEWS_QUERY_PARAMETER in req.query) {
        for (let movie of movies) {
            movie.dataValues.criticReviews = await getCriticReviewsByMovieId(
                movie.id
            );
        }
    }

    if (USER_REVIEWS_QUERY_PARAMETER in req.query) {
        for (let movie of movies) {
            movie.dataValues.userReviews = await getUserReviewsByMovieId(
                movie.id
            );
        }
    }

    res.json(movies);
};

/**
 * Select upcoming movies from the database.
 *
 * GET route: /api/movies/upcoming
 *
 * Optional query params:
 *   times - Include all MovieTime records for each movie
 *   cast - Include all cast members for each movie
 *   criticReviews - Include all CriticReview records for each movie
 *   userReviews - Include all UserReview records for each movie
 */
export const getUpcoming = async (req, res) => {
    const movies = await db.Movie.findAll({
        where: {
            released: false,
        },
    });

    // Select additional data if requested
    if (TIMES_QUERY_PARAMETER in req.query) {
        for (let movie of movies) {
            movie.dataValues.times = await getTimesByMovieId(movie.id);
        }
    }

    if (CAST_QUERY_PARAMETER in req.query) {
        for (let movie of movies) {
            movie.dataValues.cast = await getCastByMovieId(movie.id);
        }
    }

    if (CRITIC_REVIEWS_QUERY_PARAMETER in req.query) {
        for (let movie of movies) {
            movie.dataValues.criticReviews = await getCriticReviewsByMovieId(
                movie.id
            );
        }
    }

    if (USER_REVIEWS_QUERY_PARAMETER in req.query) {
        for (let movie of movies) {
            movie.dataValues.userReviews = await getUserReviewsByMovieId(
                movie.id
            );
        }
    }

    res.json(movies);
};

/**
 * Select a movie from the database with a matching short title.
 *
 * GET route: /api/movies/:title
 *
 * Optional query params:
 *   times - Include all MovieTime records with matching title
 *   cast - Include all cast members for the movie
 *   criticReviews - Include all CriticReview records for the movie
 *   userReviews - Include all UserReview records for the movie
 */
export const getOneByTitle = async (req, res) => {
    const movie = await db.Movie.findOne({
        where: {
            titleShort: decodeURIComponent(req.query.title),
        },
    });

    // Select additional data if requested
    if (TIMES_QUERY_PARAMETER in req.query) {
        movie.dataValues.times = await getTimesByMovieId(movie.id);
    }

    if (CAST_QUERY_PARAMETER in req.query) {
        movie.dataValues.cast = await getCastByMovieId(movie.id);
    }

    if (CRITIC_REVIEWS_QUERY_PARAMETER in req.query) {
        movie.dataValues.criticReviews = await getCriticReviewsByMovieId(
            movie.id
        );
    }

    if (USER_REVIEWS_QUERY_PARAMETER in req.query) {
        movie.dataValues.userReviews = await getUserReviewsByMovieId(movie.id);
    }

    res.json(movie);
};

/**
 * Select a movie from the database with a matching id.
 *
 * GET route: /api/movies/:id
 *
 * Optional query params:
 *   times - Include all MovieTime records for the movie
 *   cast - Include all cast members for the movie
 *   criticReviews - Include all CriticReview records for the movie
 *   userReviews - Include all UserReview records for the movie
 */
export const getOneById = async (req, res) => {
    const movie = await db.Movie.findOne({
        where: {
            id: Number.parseInt(req.params.id),
        },
    });

    // Select additional data if requested
    if (TIMES_QUERY_PARAMETER in req.query) {
        movie.dataValues.times = await getTimesByMovieId(movie.id);
    }

    if (CAST_QUERY_PARAMETER in req.query) {
        movie.dataValues.cast = await getCastByMovieId(movie.id);
    }

    if (CRITIC_REVIEWS_QUERY_PARAMETER in req.query) {
        movie.dataValues.criticReviews = await getCriticReviewsByMovieId(
            movie.id
        );
    }

    if (USER_REVIEWS_QUERY_PARAMETER in req.query) {
        movie.dataValues.userReviews = await getUserReviewsByMovieId(movie.id);
    }

    res.json(movie);
};

/**
 * Select user reviews from the database for a movie with a matching id.
 *
 * GET route: /api/movies/:id/userreviews
 */
export const getAllUserReviewsByMovie = async (req, res) => {
    const reviews = await db.UserReview.findAll({
        where: {
            movieId: Number.parseInt(req.params.id),
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
 * Select a movie time from the database with a matching id.
 *
 * GET route: /api/movies/times/:id
 */
export const getOneMovieTimeById = async (req, res) => {
    const time = await db.MovieTime.findByPk(req.params.id);

    if (SEATS_QUERY_PARAMETER in req.query) {
        let seats = [];

        const reservations = await db.Reservation.findAll({
            where: {
                movieTimeId: Number.parseInt(time.id),
            },
        });

        // Include reserved seats for each reservation
        if (reservations) {
            for (let reservation of reservations) {
                const reservationSeats =
                    (await db.ReservedSeat.findAll({
                        where: {
                            reservationId: reservation.id,
                        },
                        include: [
                            {
                                model: db.Seat,
                                required: true,
                            },
                        ],
                    })) || [];
                seats = [...seats, ...reservationSeats];
            }
        }

        time.dataValues.seats = seats;
    }

    if (time === null) {
        res.sendStatus(404);
    } else {
        res.json(time);
    }
};
