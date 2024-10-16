const express = require("express");

const {
    getAllTodo,
    getTodoById,
    addTodo,
    editTodoById,
    deleteTodoById,
    deleteAllTodo,
    addTodoBulk,
} = require("../controllers/todos-controller");
const router = express.Router();

router.get("/", getAllTodo);
router.get("/:id", getTodoById);
router.post("/", addTodo);
router.put("/:id", editTodoById);
router.delete("/", deleteAllTodo);
router.delete("/:id", deleteTodoById)
router.post("/seeder", addTodoBulk)

module.exports = router 