const express = require("express");
const router = express.Router({ mergeParams: true });
const todo = require("../controllers/todo");

const passport = require("passport");
app.use(passport.initialize());
require("../config/passport");
const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

router
  .route("/")
  .post(passport.authenticate("jwt", { session: false }), todo.createTodo);
router
  .route("/")
  .get(passport.authenticate("jwt", { session: false }), todo.showTodo);

router
  .route("/:id")
  .put(passport.authenticate("jwt", { session: false }), todo.updateTodo);

router
  .route("/:id")
  .delete(passport.authenticate("jwt", { session: false }), todo.deleteTodo);

module.exports = router;
