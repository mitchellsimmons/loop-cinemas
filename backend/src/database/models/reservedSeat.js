export default (sequelize, DataTypes) =>
    // This is a weak entity with a composite primary key (two foreign keys belong to Reservation and Seat tables)
    sequelize.define(
        'reserved_seat',
        {
            reservationId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            seatId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
        },
        {
            timestamps: false,
        }
    );
