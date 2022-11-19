const express = require("express");
const router = express.Router();
const User = require("../models/userModel")

router.post("/login", async(req, res) => {

    const {username, password} = req.body

    try {
        const user = await User.find({username, password})

        if(user){
            res.send(user)
        }
        else{
            return res.status(400).json(error);
        }

    } catch (error) {
        return res.status(400).json(error);
    }

});


router.post("/register", async(req, res) => {

    try {
        const newuser = await User(req.body)
        await newuser.save()
        res.send('Registration successful')

    } catch (error) {
        return res.status(400).json(error);
    }

});

module.exports = router;