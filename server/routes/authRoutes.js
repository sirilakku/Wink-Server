var express = require("express");
var router = express.Router();
var debug = require("debug")("server:routes");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userByName  = require("../../model/userModel");

passport.use(
    new LocalStrategy(async function (username, password, done) {
      try {
        const user = await userByName(username);
        if (!user) {
          return done(null, false);
        }
        const passwordsMatch = (password === user.password);
        if (!passwordsMatch) {
          return done(null, false);
        }
        const userToSend = user.toObject();
        delete userToSend.password;
        console.log("user after deleting password", userToSend);
        return done(null, userToSend);
      } catch (error) {
        return done(error, null);
      }
    })
  );

passport.serializeUser(function (user, done) {
    console.log("passport wants to store this user in a cookie", user);
    done(null, user.username);
  });
  
  passport.deserializeUser(async function (username, done) {
    console.log("passport is trying to recover the user from the cookie", username);
    try {
      const user = await userByName(id);
      if (!user) {
        done(new Error("User not found or deleted"));
        return;
      }
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
  
  router.post("/login", passport.authenticate("local"), (req, res) => {
    res.send(req.user);
  });

  router.get("/logout", (req, res) => {
    req.logout();
    res.send("successfully logged out");
  });
  
  router.get("/loggedInUser", (req, res) => {
    res.send(req.user);
  });
  
  module.exports = router;
  