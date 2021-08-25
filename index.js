require("dotenv").config();
const connect = require("connect");
const mongoose = require("mongoose");
const { connection } = require("./database");
const { strategy, authUser } = require("./auth");
const express = require("express");
const indexRouter = require("./routes/index");
const errorRouter = require("./routes/error");
const userRouter = require("./routes/user");
const passport = require("passport");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const port = process.env.PORT || 5000;
const myStore = new SequelizeStore({db: connection});

mongoose.connect(
    `mongodb://${process.env.MONGO_DB_URL}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}`,
    {useNewUrlParser:true, useUnifiedTopology: true}
);

const mongoconnection = mongoose.connection;

mongoconnection.once("open", ()=>{
    console.log("Connection to Mongo established");
})

app.use(express.json()); // This ensures input is considered to be json
app.use(session({
    secret: process.env.SECRET_KEY,
    store: myStore,
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
myStore.sync();

passport.use(strategy);
passport.serializeUser(authUser);
passport.deserializeUser(authUser);

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("*", errorRouter);

app.listen(port, () => {
    connection.authenticate();
    console.log("App is online");
});