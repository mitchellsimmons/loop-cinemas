export default (sequelize, DataTypes) =>
    sequelize.define(
        'actor',
        {
            name: {
                type: DataTypes.STRING(100),
                primaryKey: true,
            },
        },
        {
            timestamps: false,
        }
    );
