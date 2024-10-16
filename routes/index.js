const express = require("express");
const router = express.Router();

const todosRoute = require("./todos-route")
const authRoute = require("./auth-route")

router.get("/", (req, res) => {
    res.json({
        message: "Your Todo List",
    });
});

router.use("/todos", todosRoute);
router.use("/auth", authRoute);

module.exports = router;
