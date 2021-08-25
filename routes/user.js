const express = require("express");
const bcrypt = require("bcrypt");
const { addUser, listUsers } = require("../utils/user");
const saltRounds = 10;

const router = express.Router();

router.get("/", async(req, res) => {
    res.status(200).json({"msg": await listUsers()});
});

router.get("/:id", (req, res) => {
    res.status(200).json({"msg": `Attempting to get user ${req.params.id}`});
});

router.post("/register", async(req, res) => {
    if (req.body.password !== req.body.checkPassword) {
        return res.status(401).json({"message": `Passwords don't match`});
    } else if (!req.body.name) {
        return res.status(401).json({"message": `No username provided`});
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(req.body.password, salt);

    await addUser(req.body.name, hash);
    res.status(201).json({"msg": "Created user"});
    // User entered two different passwords
    /*if (await bcrypt.compare(req.body.checkPassword, hash)) {
        res.status(201).json({"message": `Password ${req.body.checkPassword} matches ${hash}`});
    } else {
        res.status(401).json({"message": `Password ${req.body.checkPassword} does not match ${hash}`});
    }*/
});

module.exports = router;