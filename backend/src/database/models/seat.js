export default (sequelize, DataTypes) =>
    sequelize.define(
        'seat',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            number: {
                type: DataTypes.INTEGER,
                allowNull: false,
                customValidator(value) {
                    if (value < 1 || value > 2) {
                        throw new Error('Seat number must be between 1-5');
                    }
                },
            },
            row: {
                type: DataTypes.CHAR(1),
                allowNull: false,
                customValidator(value) {
                    valid = ['A', 'B'];
                    if (!valid.includes(value)) {
                        throw new Error('Seat row must be A or B');
                    }
                },
            }
        },
        {
            timestamps: false,
        }
    );
