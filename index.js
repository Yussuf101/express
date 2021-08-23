const express = require("express");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // This ensures input is considered to be json

app.get("/", (req, res) => {
    res.status(200).send("Hello world");
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