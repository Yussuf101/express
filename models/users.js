const {DataTypes} = require("sequelize");
const{connection} = require("../database");

const User = connection.define("User", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {});

const main = async() => {
    try {
        await User.sync({alter: true});
    } catch (error) {
        console.log(error);
    }
}

main();

module.exports = User;