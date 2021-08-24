const express = require("express");
const bcrypt = require("bcrypt");
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

app.post("/register", (req, res)=>{
    bcrypt.genSalt(saltRounds, (err, salt)=>{
        if(err){
            res.status(500).json({"message": `Somthing went wrong`, "error": err});
        }
        bcrypt.hash(req,body.password, salt, (err,hash)=>{
            if(result){
                res.status(201).json({"message":`Hashed password is: ${hash}`});
            }else{
                res.status(201).json({"message":`Hashed password is: ${hash}`});
            }
        });
    });
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
    console.log("App is online");
});