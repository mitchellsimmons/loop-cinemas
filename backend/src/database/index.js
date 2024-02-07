import { Sequelize, DataTypes } from 'sequelize';

// User seed data
import users from './data/users.js';
// Movie seed data
import movies from './data/movies.js';

import Actor from './models/actor.js';
import Critic from './models/critic.js';
import CriticReview from './models/criticReview.js';
import Movie from './models/movie.js';
import MovieActor from './models/movieActor.js';
import MovieTime from './models/movieTime.js';
import Reservation from './models/reservation.js';
import ReservedSeat from './models/reservedSeat.js';
import Seat from './models/seat.js';
import User from './models/user.js';
import UserReview from './models/userReview.js';

const db = {
    Op: Sequelize.Op,
};

// --- Create Sequelize ---
db.sequelize = new Sequelize(
    process.env.DB,
    process.env.DB_USER,
    process.env?.DB_PASSWORD || null,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
    }
);

// --- Define models ---
db.Actor = Actor(db.sequelize, DataTypes);
db.Critic = Critic(db.sequelize, DataTypes);
db.CriticReview = CriticReview(db.sequelize, DataTypes);
db.Movie = Movie(db.sequelize, DataTypes);
db.MovieActor = MovieActor(db.sequelize, DataTypes);
db.MovieTime = MovieTime(db.sequelize, DataTypes);
db.Reservation = Reservation(db.sequelize, DataTypes);
db.ReservedSeat = ReservedSeat(db.sequelize, DataTypes);
db.Seat = Seat(db.sequelize, DataTypes);
db.User = User(db.sequelize, DataTypes);
db.UserReview = UserReview(db.sequelize, DataTypes);

// --- Define relationships ---
db.Actor.belongsToMany(db.Movie, {
    through: db.MovieActor,
    foreignKey: {
        name: 'actor',
        allowNull: false,
    },
});

db.Movie.belongsToMany(db.Actor, {
    through: db.MovieActor,
    foreignKey: {
        name: 'movieId',
        allowNull: false,
    },
});

db.Critic.hasMany(db.CriticReview, {
    foreignKey: { name: 'critic', allowNull: false },
});

// db.CriticReview.belongsTo(db.Critic);

db.Movie.hasMany(db.CriticReview, {
    foreignKey: { name: 'movieId', allowNull: false },
});

db.CriticReview.belongsTo(db.Movie);

db.User.hasMany(db.UserReview, {
    foreignKey: { name: 'userId', allowNull: false },
});

db.UserReview.belongsTo(db.User);

db.Movie.hasMany(db.UserReview, {
    foreignKey: { name: 'movieId', allowNull: false },
});

db.UserReview.belongsTo(db.Movie);

db.Movie.hasMany(db.MovieTime, {
    foreignKey: { name: 'movieId', allowNull: false },
});

db.MovieTime.belongsTo(db.Movie);

db.User.hasMany(db.Reservation, {
    foreignKey: 'userId',
    allowNull: false,
});

db.Reservation.belongsTo(db.User);

db.MovieTime.hasMany(db.Reservation, {
    foreignKey: 'movieTimeId',
    allowNull: false,
});

db.Reservation.belongsTo(db.MovieTime);

db.Reservation.hasMany(db.ReservedSeat, {
    foreignKey: 'reservationId',
    allowNull: false,
});

db.ReservedSeat.belongsTo(db.Reservation);

db.Seat.hasMany(db.ReservedSeat, {
    foreignKey: 'seatId',
    allowNull: false,
});

db.ReservedSeat.belongsTo(db.Seat);

// --- Sync schema ---
// Use force=true to force sync if data already exists
db.sync = async (force = false) => {
    await db.sequelize.sync({ force: force });
    await seedUsers();
    await seedActors();
    await seedCritics();
    await seedMovies();
    await seedSeats();
};

// --- Seed data ---
const seedUsers = async () => {
    const count = await db.User.count();

    // Only seed data if necessary.
    if (count > 0) return;

    // Hashing is handled by model hooks
    for (const user of users) {
        await db.User.create({
            email: user.email,
            passwordHash: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            admin: user.admin,
            blocked: false,
        });
    }
};

const seedActors = async () => {
    const count = await db.Actor.count();

    // Only seed data if necessary.
    if (count > 0) return;

    const actors = [...new Set(movies.map((movie) => movie.cast).flat())];

    for (const actor of actors) {
        await db.Actor.create({
            name: actor,
        });
    }
};

const seedCritics = async () => {
    const count = await db.Critic.count();

    // Only seed data if necessary.
    if (count > 0) return;

    const critics = [
        ...new Set(
            movies
                .map(
                    (movie) =>
                        movie.criticReviews?.map((review) => review.critic) ||
                        []
                )
                .flat()
        ),
    ];

    for (const critic of critics) {
        await db.Critic.create({
            name: critic,
        });
    }
};

const seedMovies = async () => {
    const count = await db.Movie.count();

    // Only seed data if necessary.
    if (count > 0) return;

    // Seed Movies
    for (const movie of movies) {
        const movieEntry = await db.Movie.create({
            title: movie.title,
            titleShort: movie.titleShort,
            overview: movie.overview,
            synopsis: movie.synopsis.join('\n'),
            release: movie.release,
            released: movie.released,
            rating: movie.rating,
            genre: movie.genre,
            duration: movie.duration,
            director: movie.director,
            resource: movie.resource,
        });

        // Seed MovieActor
        for (const actor of movie.cast) {
            await db.MovieActor.create({
                actor: actor,
                movieId: movieEntry.id,
            });
        }

        // Seed MovieTime
        if (movie.times !== undefined) {
            for (const [day, times] of Object.entries(movie.times)) {
                for (const time of times) {
                    await db.MovieTime.create({
                        day: day,
                        time: time,
                        movieId: movieEntry.id,
                    });
                }
            }
        }

        // Seed CriticReview
        if (movie.criticReviews !== undefined) {
            for (const criticReview of movie.criticReviews) {
                await db.CriticReview.create({
                    text: criticReview.review,
                    rating: criticReview.rating,
                    critic: criticReview.critic,
                    movieId: movieEntry.id,
                });
            }
        }
    }
};

const seedSeats = async () => {
    const count = await db.Seat.count();

    // Only seed data if necessary.
    if (count > 0) return;

    const rows = ['A', 'B'];
    for (const row of rows) {
        for (let num = 1; num <= 5; num++) {
            db.Seat.create({
                row: row,
                number: num,
            });
        }
    }
};

export default db;
