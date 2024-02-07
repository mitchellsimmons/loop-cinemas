export default (sequelize, DataTypes) =>
    sequelize.define(
        'movie',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            titleShort: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            overview: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            synopsis: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            release: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            released: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            rating: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            genre: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            duration: {
                type: DataTypes.SMALLINT.UNSIGNED,
                allowNull: true,
            },
            director: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            resource: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
        },
        {
            timestamps: false,
        }
    );