const User = require("../models/User");
const { hashSync, compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.register = (req, res) => {
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
};

module.exports.login = (req, res) => {
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
};
