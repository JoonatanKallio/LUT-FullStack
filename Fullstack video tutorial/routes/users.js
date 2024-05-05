const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/database");
const bcrypt = require("bcryptjs")

const User = require("../models/user");

// Register
router.post("/register", (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    })

    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({success: false, msg: "Failed to register user"})
        } else {
            res.json({success: true, msg: "User registered"})
        }
    });
});

// Auth
router.post("/authenticate", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: "User not found" });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            console.log(password, user.password, isMatch)

            if (isMatch) {
                const token = jwt.sign({user}, config.secret, {
                    expiresIn: 604800
                });

                res.json({
                    success: true,
                    token: "Bearer " + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        username: user.username,
                    }
                })
            } else {
                return res.json({ success: false, msg: "Wrong password" });
            }
        })
    })
});

// Profile
router.get("/profile", passport.authenticate("jwt", {session: false}), (req, res, next) => {
    res.json({ user: req.user })
});

// Validate
router.get("/validate", (req, res, next) => {
    res.send("Validate");
});

module.exports = router
