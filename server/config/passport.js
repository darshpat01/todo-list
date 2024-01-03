const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
const User = require("../models/User");
const passport = require("passport");

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secret || "getabettersecretbro";

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ _id: jwt_payload.id })
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false); // or you could create a new account
        }
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);
