const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const { getUser } = require("./utils/user");

const strategy = new LocalStrategy(async(username, password, done) => {
    try {
        const user = await getUser(username);

        if (!user) {
            return done(null, false, {message: "Incorrect username"})
        }

        const match = await bcrypt.compare(password, user.passwordHash);
        return match ? done(null, user) : done(null, false, {message: "Incorrect password"});
    } catch(err) {
        return done(err)
    }
});

const authUser = (user, done) => done(null, user);

module.exports = {
    strategy,
    authUser,
};