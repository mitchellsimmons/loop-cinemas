export default (sequelize, DataTypes) =>
    sequelize.define(
        'movie_actor',
        {},
        {
            timestamps: false,
        }
    );
