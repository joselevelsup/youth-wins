const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user");


module.exports = (passport) => {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (id, done) {
        done(null, id);
    });

    passport.use('local-login', new LocalStrategy({ usernameField: "username", passwordField: "password", passReqToCallback: true },
                                                  function (request, username, password, done) {
                                                      User.findOne({$or: [{ "username": username }, {"email": username }] }, function (err, user) {
                                                          if (err) {
                                                              return done(err);
                                                          }
                                                          if (!user) {
                                                              return done(null, false);
                                                          }
                                                          if (!bcrypt.compareSync(password, user.password)) {
                                                              return done(null, false);
                                                          }
                                                          if (user && bcrypt.compareSync(password, user.password)) {
                                                              return done(null, user);
                                                          }
                                                      });
                                                  }));
}
