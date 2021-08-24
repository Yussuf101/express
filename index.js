const express = require("express");
const bcrypt = require("bcrypt");
const {connection} = require("./database");
const {addUser, listUsers} = require("./utils/user");
require("dotenv").config();


const app = express();
const port = process.env.PORT || 5000;

const saltRounds = 10;

app.use(express.json()); // This ensures input is considered to be json

app.get("/", (req, res) => {
    res.status(200).send("Hello world");
});

app.get("/register", (req,res)=>{
    bcrypt.genSalt(saltRounds,(err, salt)=>{
        bcrypt.hash(req.body.password, salt, (err, hash)=>{
            if(err){
                res.status(500).json({"message": `Somthing went wrong`, "error": err});
            }
            res.status(201).json({"message":`Hashed password is: ${hash}`})
        });
    });
});

app.post("/register", async(req, res) => {
    if (req.body.password !== req.body.checkPassword) {
        return res.status(401).json({"message": `Passwords don't match`});
    } else if (!req.body.name) {
        return res.status(401).json({"message": `No username provided`});
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(req.body.password, salt);

    addUser(req.body.name, hash);
    res.status(201).json({"users": await listUsers()});

    // User entered two different passwords
    /*if (await bcrypt.compare(req.body.checkPassword, hash)) {
        res.status(201).json({"message": `Password ${req.body.checkPassword} matches ${hash}`});
    } else {
        res.status(401).json({"message": `Password ${req.body.checkPassword} does not match ${hash}`});
    }*/
});

app.post("/:username/", (req, res) => {
    res.status(201).json({"message": `You created the repo ${req.body.project}`, "data": req.body});
});

app.get("/:username/:project", (req, res) => {
    res.status(200).json({"message": `You views the project ${req.params.project}`});
});

app.post("/:username/:project", (req, res) => {
    res.status(200).json({"message": `You updated the project: ${req.params.project}`, "date": req.body});
});

app.listen(port, () => {
    connection.authenticate();
    console.log("App is online");
});