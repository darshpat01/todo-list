if (process.env.NODE_ENV !== "production") {
  require("dotenv/config");
}

//required packages
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
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

const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");

app.use("/", authRoutes);
app.use("/todo", todoRoutes);

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
