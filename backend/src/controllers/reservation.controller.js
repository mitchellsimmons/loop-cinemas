import db from '../database/index.js';

// --- Constants ---

const SEATS_QUERY_PARAMETER = 'seats';
const TIME_QUERY_PARAM = 'time';
const USER_QUERY_PARAM = 'user';

// --- Handlers ---

/**
 * Select all reservations from the database.
 *
 * GET route: /api/reservations
 */
export const getAll = async (req, res) => {
    const reservations = await db.Reservation.findAll();

    // Include reserved seats for each reservation
    if (reservations && SEATS_QUERY_PARAMETER in req.query) {
        for (let reservation of reservations) {
            const seats =
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
            reservation.dataValues.seats = seats;
        }
    }

    if (reservations === null) {
        res.sendStatus(404);
    } else {
        res.json(reservations);
    }
};

/**
 * Select a reservation from the database with a given User id.
 *
 * GET route: /api/reservations/user/:id
 */
export const getAllByUserId = async (req, res) => {
    const reservations = await db.Reservation.findAll({
        where: {
            userId: Number.parseInt(req.params.id),
        },
    });

    // Include associated movie time
    if (reservations && TIME_QUERY_PARAM in req.query) {
        for (let reservation of reservations) {
            const movieTime = await db.MovieTime.findOne({
                where: {
                    id: reservation.movieTimeId,
                },
            });

            reservation.dataValues.movieTime = movieTime;
        }
    }

    // Include reserved seats for each reservation
    if (reservations && SEATS_QUERY_PARAMETER in req.query) {
        for (let reservation of reservations) {
            const seats =
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
            reservation.dataValues.seats = seats;
        }
    }

    if (reservations === null) {
        res.sendStatus(404);
    } else {
        res.json(reservations);
    }
};

/**
 * Select a reservation from the database with a given MovieTime id.
 *
 * GET route: /api/reservations/times/:id
 */
export const getAllByMovieTimeId = async (req, res) => {
    const reservations = await db.Reservation.findAll({
        where: {
            movieTimeId: Number.parseInt(req.params.id),
        },
    });

    // Include associated user
    if (reservations && USER_QUERY_PARAM in req.query) {
        for (let reservation of reservations) {
            const user = await db.USER.findOne({
                where: {
                    id: reservation.userId,
                },
            });

            reservation.dataValues.user = user;
        }
    }

    // Include reserved seats for each reservation
    if (reservations && SEATS_QUERY_PARAMETER in req.query) {
        for (let reservation of reservations) {
            const seats =
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
            reservation.dataValues.seats = seats;
        }
    }

    if (reservations === null) {
        res.sendStatus(404);
    } else {
        res.json(reservations);
    }
};

/**
 * Create a reservation.
 *
 * POST route: /api/reservations
 */
export const createReservation = async (req, res) => {
    let reservation = null;
    let reservedSeats = [];

    try {
        reservation = await db.Reservation.create({
            userId: req.body.userId,
            movieTimeId: req.body.movieTimeId,
        });

        for (const seat of req.body.seats) {
            const dbSeat = await db.Seat.findOne({
                where: {
                    row: seat.row,
                    number: seat.number,
                },
            });

            if (dbSeat) {
                const reservedSeat = await db.ReservedSeat.create({
                    reservationId: reservation.id,
                    seatId: dbSeat.id,
                });

                reservedSeats.push(reservedSeat);
            } else {
                throw Error(
                    `Could not find seat, row=${seat.row}, number=${seat.number}`
                );
            }
        }

        res.sendStatus(201); // Created
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message); // Internal server error

        // Attempt to cleanup
        try {
            if (reservedSeats) {
                for (const reservedSeat of reservedSeats) {
                    await db.ReservedSeat.destroy({
                        where: {
                            reservationId: reservation.id,
                            seatId: reservedSeat.id,
                        },
                    });
                }
            }

            if (reservation) {
                await db.Reservation.destroy({
                    where: {
                        id: reservation.id,
                    },
                });
            }
        } catch (err) {
            console.err('Cleanup failed, database may be in a bad state');
        }
    }
};
