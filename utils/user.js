const User = require("../models/user");

const addUser = async(name, passwordHash) => {
    try {
        const newUser = await User.build({name, passwordHash});
        newUser.save();
    } catch(error) {
        console.log(error);
    }
}

const listUsers = async() => {
    try {
        return await User.findAll({});
    } catch(error) {
        console.log(error);
        return [];
    }
}

module.exports = {
    addUser,
    listUsers
};