const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/database");


// Todo Schema
const TodosSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    todo: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        required: true,
    }
});

const Todos = module.exports = mongoose.model("Todos", TodosSchema);

module.exports.getAllTodos = (owner, callback) => {
    Todos.find({owner: owner});
}

module.exports.addTodo = (newTodo, callback) => {
    newTodo.save(callback)
}

module.exports.updateTodo = function(updatedTodo, id, callback) {
    Todos.findByIdAndUpdate(id, updatedTodo)
}
