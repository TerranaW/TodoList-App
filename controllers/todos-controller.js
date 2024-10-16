const Todos = require("../models/Todos");

module.exports = {
    getAllTodo: async (req, res) => {
        const data = await Todos.find({})
        res.json({
            message: "Sucsessfully get all todo",
            data,
        });
    },
    getTodoById: async (req, res) => {
        const data = await Todos.findById(req.params.id);
        if (!data) return res.status(404).send('Todo not found.');
        res.json({
            message: "Sucessfully get todo by id ",
            data,
        });
    },
    addTodo: (req, res) => {
        const data = req.body
        const newTodos = new Todos(data);
        newTodos.save();
        res.json({
            message: "Todo sucessfully added",
        });
    },

    addTodoBulk: (req, res) => {
        const data = req.body
        const newTodos = Todos.insertMany(data);
        res.json({
            message: "All Todo sucessfully added",
        });
    },

    editTodoById: async (req, res) => {
        try {
            await Todos.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json({
                message: "Todo successfully updated",
            });
        } catch (error) {
            res.status(500).json({ message: "Todo not found, error updating todo" });
        }
    },
    deleteAllTodo: async (req, res) => {
        await Todos.deleteMany({})
        res.json({
            message: "All todos successfully deleted",
        });
    },
    deleteTodoById: async (req, res) => {
        await Todos.findByIdAndDelete(req.params.id, req.body, { new: true }),
            res.json({
                message: "Todo sucessfully deleted",
            });
    }
};
