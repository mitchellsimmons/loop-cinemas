export default (sequelize, DataTypes) => {
    return sequelize.define(
        'reservation',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
        },
        {
            timestamps: true,
        }
    );
};
