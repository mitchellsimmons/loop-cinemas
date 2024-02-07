// If this was a real app, we would use datetime instead of a fixed day
// and data would be updated regularly
export default (sequelize, DataTypes) =>
    sequelize.define(
        'movie_time',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            day: {
                type: DataTypes.TINYINT.UNSIGNED,
                allowNull: false,
                customValidator(value) {
                    if (value < 0 || value > 6) {
                        throw new Error('Day must be between 0 and 6');
                    }
                },
            },
            time: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );
