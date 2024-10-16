const express = require("express");
const router = express.Router();

const todosRoute = require("./todos-route")
const authRoute = require("./auth-route");
const { validateToken } = require("../middleware/auth");

router.get("/", (req, res) => {
    res.json({
        message: "Your Todo List",
    });
});

router.use("/auth", authRoute);
router.use("/todos", validateToken, todosRoute);

module.exports = router;
