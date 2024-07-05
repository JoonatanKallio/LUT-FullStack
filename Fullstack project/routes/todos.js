const express = require("express");
const router = express.Router();
const Todos = require("../models/todos");
const passport = require("passport");

router.get("/:user", (req, res, next) => {
    Todos.find({owner: req.params.user}, ((error, todos) => {
        if (error) {
            throw error;
        }
        if (todos) {
            return res.json(todos)
        }
        return res.send({success: false, msg: "Fetch failed"})
    }))
});

router.post("/:todo", passport.authenticate("jwt", {session: false}), (req, res, next) => {
    Todos.findOneAndUpdate({_id: req.params.todo}, {done: true}, ((error, todo) => {
        if (error) {
            res.json({success: false, msg:"Failed to update todo."})
        }
        if (todo) {
            res.json({success: true, msg:"Todo updated"})
        }
    }))
});

router.delete("/:todo", passport.authenticate("jwt", {session: false}), (req, res, next) => {
    Todos.findOneAndRemove({_id: req.params.todo}, ((error, todo) => {
        if (error) {
            res.json({success: false, msg:"Failed to remove todo."})
        }
        if (todo) {
            res.json({success: true, msg:"Todo removed"})
        }
    }))
});

router.post("/create/:user", passport.authenticate("jwt", {session: false}), (req, res, next) => {
    let newTodo = new Todos({
        owner: req.params.user,
        todo: req.body.todo,
        done: req.body.done
    })

    Todos.addTodo(newTodo, (err, todo) => {
        if(err) {
            res.json({success: false, msg:"Failed to create new todo."})
        } else {
            res.json({success: true, msg:"Todo added"})
        }
    })
});


module.exports = router
