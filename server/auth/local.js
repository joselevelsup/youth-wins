// const LocalStrategy = require("passport-local").Strategy;
// const bcrypt = require("bcrypt");
// const { User } = require("../models/user");
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { User, Admin } from "../models";


module.exports = (passport) => {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (id, done) {
        done(null, id);
    });

    passport.use('local-login', new LocalStrategy({ usernameField: "email", passwordField: "password", passReqToCallback: true },
                                                  function (request, username, password, done) {
                                                      User.findOne({$or: [{ "username": username }, {"email": username }] }).select("+password").exec(function (errUser, user) {
                                                          if (errUser) {
                                                              return done(errUser);
                                                          }
                                                          if(!user){
                                                              Admin.findOne({ "email": username }).select("+password").exec(function(errAdmin, adminUser){
                                                                  if(errAdmin){
                                                                      return done(err);
                                                                  }

                                                                  if(!adminUser){
                                                                      return done(null, false, { message: "no user"});
                                                                  }

                                                                  if(adminUser && bcrypt.compareSync(password, adminUser.password)){
                                                                      return done(null, adminUser);
                                                                  } else {
                                                                      return done(null, false, { message: "admin does not exist"});
                                                                  }
                                                              });
                                                          }
                                                          if (user && bcrypt.compareSync(password, user.password)) {
                                                              return done(null, user);
                                                          } else {
                                                              return done(null, false, { message: "user does not exist"});
                                                          }
                                                      });
                                                  }));
}
