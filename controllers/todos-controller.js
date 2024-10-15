const Todos = require("../models/Todos");

module.exports = {
    getAllTodo: async (req, res) => {
        const data = await Todos.find({})
        res.json({
            message: "Sucsessfully Get All Todos",
            data,
        });
    },
    getTodoById: (req, res) => {


    },

    addTodo: (req, res) => {
        const data = req.body
        const newTodos = new Todos(data);
        newTodos.save();

        res.json({
            message: "Todo sucessfully added",
        });

    },
    editTodoById: async (req, res) => {
        try {
            const todo = await Todos.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json({
                message: "Todo successfully updated",
                data: todo,
            });
        } catch (error) {
            res.status(500).json({ message: "Todo not found, error updating todo" });
        }
    },
    deleteAllTodo: (req, res) => {

    },

    deleteTodoById: (req, res) => {


    }
};
