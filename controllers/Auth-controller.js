require("dotenv").config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require("../models/User");

module.exports = {
    register: async (req, res) => {
        const data = req.body;//menangkap data inputan 

        //hashing password 
        const salt = bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(data.password, salt);
        data.password = hash

        //menyimpan data ke database
        const newUser = new User(data)
        newUser.save();

        res.json({
            message: "Sucessfully registered"
        });

    },
    login: async (req, res) => {
        const { username, password } = req.body;

        //mencari data dari database
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: "User not found" });

        //cek pw lalu compare dengan pw hashing
        const checkPassword = await bcrypt.compareSync(password, user.password);
        if (!checkPassword) return res.status(401).json({ message: "Incorrect username or password" });

        const token = jwt.sign(
            { username: user.username, email: user.email }, //payload
            process.env.JWT_KEY //secretKey(simpan di env)
        );

        res.json({
            message: "successfully logged in",
            token,
        });

    },
}