if (process.env.NODE_ENV !== "production") {
  require("dotenv/config");
}

//required packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const User = require("./models/User");
const Todo = require("./models/Todo");
const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

app = express();

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//mongodb connection
mongoose.connect(process.env.db_connection, {});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

// auth

app.use(passport.initialize());
require("./config/passport");

// routes

// auth - login and register

app.post("/register", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: hashSync(req.body.password, 10),
  });

  user
    .save()
    .then((user) => {
      const payload = {
        username: user.username,
        id: user._id,
      };

      const token = jwt.sign(
        payload,
        process.env.secret || "getabettersecretbro",
        { expiresIn: "1d" }
      );
      res.send({
        success: true,
        message: "User created successfully.",
        user: {
          id: user._id,
          username: user.username,
        },
        token: "Bearer " + token,
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        message: "Something went wrong",
        error: err,
      });
    });
});

app.post("/login", (req, res) => {
  User.findOne({ username: req.body.username }).then((user) => {
    //No user found
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Could not find the user.",
      });
    }

    //Incorrect password
    if (!compareSync(req.body.password, user.password)) {
      return res.status(401).send({
        success: false,
        message: "Incorrect password",
      });
    }

    const payload = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(
      payload,
      process.env.secret || "getabettersecretbro",
      { expiresIn: "1d" }
    );

    return res.status(200).send({
      success: true,
      message: "Logged in successfully!",
      token: "Bearer " + token,
      username: user.username,
    });
  });
});

// app.get(
//   "/protected",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     return res.status(200).send({
//       success: true,
//       user: {
//         id: req.user._id,
//         username: req.user.username,
//       },
//     });
//   }
// );

// todo - create, read, update, delete

// create todo

app.post(
  "/todo",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

// get todos of a certain user

app.get(
  "/todo",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

// update todo

app.put(
  "/todo/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

// delete todo

app.delete(
  "/todo/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

//listing on port

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
