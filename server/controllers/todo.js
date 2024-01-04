const User = require("../models/User");
const Todo = require("../models/Todo");

module.exports.createTodo = (req, res) => {
  console.log("create todo hit");
  console.log(req.body);
  const todo = new Todo({
    userId: req.user._id,
    text: req.body.text,
  });

  todo
    .save()
    .then((todo) => {
      res.send({
        success: true,
        message: "Todo created successfully.",
        text: todo.text,
        _id: todo._id,
        createdBy: todo.userId,
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "Something went wrong",
        error: err,
      });
    });
};

module.exports.showTodo = (req, res) => {
  console.log("get todo hit");
  console.log(req.user);
  Todo.find({ userId: req.user._id })
    .then((todos) => {
      res.send({
        success: true,
        todos: todos,
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "Something went wrong",
        error: err,
      });
    });
};

module.exports.updateTodo = (req, res) => {
  console.log("update todo hit");
  Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    { text: req.body.text, completed: req.body.completed }
  )
    .then((todo) => {
      res.send({
        success: true,
        message: "Todo updated successfully.",
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "Something went wrong",
        error: err,
      });
    });
};

module.exports.deleteTodo = (req, res) => {
  console.log("delete todo hit");
  Todo.findOneAndDelete({ _id: req.params.id, userId: req.user._id })
    .then((todo) => {
      res.send({
        success: true,
        message: "Todo deleted successfully.",
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "Something went wrong",
        error: err,
      });
    });
};
