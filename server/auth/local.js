// const LocalStrategy = require("passport-local").Strategy;
// const bcrypt = require("bcrypt");
// const { User } = require("../models/user");
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { User } from "../models";


module.exports = (passport) => {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (id, done) {
        done(null, id);
    });

    passport.use('local-login', new LocalStrategy({ usernameField: "email", passwordField: "password", passReqToCallback: true },
                                                  function (request, username, password, done) {
                                                      User.findOne({$or: [{ "username": username }, {"email": username }] }).select("+password").exec(function (err, user) {
                                                          if (err) {
                                                              console.log(err);
                                                              return done(err);
                                                          }
                                                          if (!user) {
                                                              console.log("not user");
                                                              return done(null, false);
                                                          }
                                                          if (user && bcrypt.compareSync(password, user.password)) {
                                                              console.log("user");
                                                              return done(null, user);
                                                          }
                                                      });
                                                  }));
}
