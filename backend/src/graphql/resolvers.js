import db from '../database/index.js';

const resolvers = {
    Query: {
        users: async () => {
            return await db.User.findAll();
        },
        user: async (_, { id }) => {
            return await db.User.findByPk(id);
        },
        userReviews: async () => {
            return await db.UserReview.findAll({
                include: [db.User]
            });
        },        
        userReview: async (_, { id }) => {
            return await db.UserReview.findByPk(id);
        },
        blockedUsers: async () => {
            return await db.User.findAll({ where: { blocked: true } });
        },
        getMovie: async (_, { id }) => {
            return await db.Movie.findByPk(id, {
                include: [
                    { model: db.Actor },
                    { model: db.UserReview, include: [db.User] },
                    { model: db.MovieTime },
                ],
            });
        },
        listMovies: async () => {
            return await db.Movie.findAll({
                include: [
                    { model: db.Actor },
                    { model: db.UserReview, include: [db.User] },
                    { model: db.MovieTime },
                ],
            });
        },
    },
    Mutation: {
        deleteUserReview: async (_, { id }) => {
            const review = await db.UserReview.findByPk(id);
            if (review) {
                await review.destroy();
                return "Review deleted successfully!";
            } else {
                throw new Error('Review not found');
            }
        },
        blockUser: async (_, { id }) => {
            const user = await db.User.findByPk(id);
            if (!user) {
                throw new Error('User not found');
            }
            user.blocked = true;
            await user.save();
            return user;
        },        
        unblockUser: async (_, { id }) => {
            const user = await db.User.findByPk(id);
            if (user) {
                user.blocked = false;
                await user.save();
                return user;
            } else {
                throw new Error('User not found');
            }
        },
        createMovie: async (_, { input }) => {
            return await db.Movie.create(input);
        },
        updateMovie: async (_, { id, input }) => {
            await db.Movie.update(input, { where: { id } });
            return await db.Movie.findByPk(id);
        }        
    },
};

export default resolvers;
