require("dotenv").config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/User");

module.exports = {
    register: async (req, res) => {
        try {
            const data = req.body; // menangkap data inputan 

            // hashing password 
            const salt = bcrypt.genSaltSync(10);
            const hash = await bcrypt.hashSync(data.password, salt);
            data.password = hash;

            // menyimpan data ke database
            const newUser = new User(data);
            await newUser.save();

            res.status(201).json({
                message: "Successfully registered"
            });
        } catch (error) {
            res.status(500).json({
                message: "Error registering user"
            });
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            // mencari data dari database
            const user = await User.findOne({ username });
            if (!user) return res.status(404).json({ message: "User not found" });

            // cek pw lalu compare dengan pw hashing
            const checkPassword = await bcrypt.compareSync(password, user.password);
            if (!checkPassword) return res.status(401).json({ message: "Incorrect password" });

            const token = jwt.sign(
                { username: user.username, email: user.email }, // payload
                process.env.JWT_KEY, // secretKey(simpan di env)
            );

            res.status(200).json({
                message: "successfully logged in",
                token,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error logging in",
                error
            });
        }
    },
};