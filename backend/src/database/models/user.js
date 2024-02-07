import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
    const User = sequelize.define(
        'user',
        {
            // Email is not a good primary key since it may change
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true, // Login requires unique email
            },
            passwordHash: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            firstName: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            admin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            refreshToken: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true,
            },
            blocked: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
        },
        {
            timestamps: true,
            hooks: {
                beforeCreate: async (user) => {
                    if (user.passwordHash) {
                        user.passwordHash = await bcrypt.hash(
                            user.passwordHash,
                            10
                        );
                    }
                },
            },
        }
    );

    User.prototype.verifyPassword = async function (password) {
        return await bcrypt.compare(password, this.passwordHash);
    };

    User.prototype.updatePassword = async function (password) {
        this.passwordHash = await bcrypt.hash(password, 10);
        await this.save();
    };

    User.findOneByEmail = async function (email) {
        return await this.findOne({
            where: {
                email: email,
            },
        });
    };

    User.findOneByRefreshToken = async function (refreshToken) {
        return await this.findOne({
            where: {
                refreshToken: refreshToken,
            },
        });
    };

    return User;
};
