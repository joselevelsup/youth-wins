require("dotenv").config();

import express from "express";
import bodyParser from "body-parser";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/routes";
import local from "./auth/local";

const MongoStore = require("connect-mongo")(session);

let app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB, { useNewUrlParser: true });

app.use(cookieParser("issa secret"));

app.use(session({
    secret: "issa secret",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(passport.initialize());

app.use(passport.session());

app.use(bodyParser.json({
    extended: true,
    urlencoded: true
}));

local(passport);

routes(app, passport);

app.listen(8080, () => {
    console.log("Server is running");
});
