const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { User } = require("../models/user");


module.exports = (passport) => {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (id, done) {
        done(null, id);
    });

    passport.use('local-login', new LocalStrategy({ usernameField: "username", passwordField: "password", passReqToCallback: true },
                                                  function (request, username, password, done) {
                                                      console.log(username);
                                                      console.log(password);
                                                      User.findOne({$or: [{ "username": username }, {"email": username }] }, function (err, user) {
                                                          if (err) {
                                                              console.log("err");
                                                              return done(err);
                                                          }
                                                          if (!user) {
                                                              console.log("not user");
                                                              return done(null, false);
                                                          }
                                                          if (user && bcrypt.compareSync(password, user.password)) {
                                                              console.log("user and passwords match");
                                                              return done(null, user);
                                                          }
                                                      });
                                                  }));
}
