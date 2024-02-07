export default (sequelize, DataTypes) =>
    sequelize.define(
        'critic_review',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            text: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            rating: {
                type: DataTypes.FLOAT,
                allowNull: false,
                customValidator(value) {
                    if (value < 0 || value > 5) {
                        throw new Error('Rating must be between 0 and 5');
                    }
                },
            },
        },
        {
            timestamps: false,
        }
    );
