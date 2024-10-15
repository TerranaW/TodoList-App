const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema({
    task: String,
    dueDate: Date,
    completed: Boolean
});

const Todos = mongoose.model('Todos', todosSchema);

module.exports = Todos;
