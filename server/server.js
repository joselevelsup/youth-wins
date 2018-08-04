require("dotenv").config();

import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
import passport from "passport";
import routes from "./routes/routes";

const MongoStore = require("connect-mongo")(session);

let app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB);

app.use(session({
    secret: "issa secret",
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(passport.initialize());

app.use(passport.session());

app.use(bodyParser.json());

routes(app, passport);

app.listen(8080, () => {
    console.log("Server is running");
});
