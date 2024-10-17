const Todos = require("../models/Todos");

module.exports = {
    getAllTodo: async (req, res) => {
        try {
            const data = await Todos.find({});
            res.status(200).json({
                message: "Successfully got all todos",
                data,
            });
        } catch (error) {
            res.status(500).json({ message: "Error getting todos", error });
        }
    },

    getTodoById: async (req, res) => {
        try {
            const data = await Todos.findById(req.params.id);
            if (!data) return res.status(404).json({ message: "Todo not found." });
            res.status(200).json({
                message: "Successfully got todo by id",
                data,
            });
        } catch (error) {
            res.status(500).json({ message: "Error getting todo by id", error });
        }
    },

    addTodo: async (req, res) => {
        try {
            const newTodos = new Todos(req.body);
            await newTodos.save();
            res.status(201).json({
                message: "Todo successfully added",
            });
        } catch (error) {
            res.status(500).json({ message: "Error adding todo", error });
        }
    },

    addTodoBulk: async (req, res) => {
        try {
            const newTodos = await Todos.insertMany(req.body);
            res.status(201).json({
                message: "All todos successfully added",
            });
        } catch (error) {
            res.status(500).json({ message: "Error adding todos in bulk", error });
        }
    },

    editTodoById: async (req, res) => {
        try {
            const updatedTodo = await Todos.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedTodo) return res.status(404).json({ message: "Todo not found." });
            res.status(200).json({
                message: "Todo successfully updated",
            });
        } catch (error) {
            res.status(500).json({ message: "Error updating todo", error });
        }
    },

    deleteAllTodo: async (req, res) => {
        try {
            await Todos.deleteMany({});
            res.status(204).json({
                message: "All todos successfully deleted",
            });
        } catch (error) {
            res.status(500).json({ message: "Error deleting all todos", error });
        }
    },

    deleteTodoById: async (req, res) => {
        try {
            const deletedTodo = await Todos.findByIdAndDelete(req.params.id);
            if (!deletedTodo) return res.status(404).send('Todo not found.');
            res.status(200).json({
                message: "Todo successfully deleted",
            });
        } catch (error) {
            res.status(500).json({ message: "Error deleting todo", error });
        }
    }
};