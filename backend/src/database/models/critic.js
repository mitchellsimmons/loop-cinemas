export default (sequelize, DataTypes) =>
    sequelize.define(
        'critic',
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
