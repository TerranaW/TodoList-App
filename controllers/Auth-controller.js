const bcrypt = require('bcrypt');
const User = require("../models/User");

module.exports = {
    register: (req, res) => {
        const data = req.body;//menangkap data inputan 

        //hashing password 
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(data.password, salt);
        data.password = hash

        //menyimpan data ke database
        const newUser = new User(data)
        newUser.save();

        res.json({
            message: "Sucessfully registered"
        });

    },
    login: (req, res) => {

    },
}