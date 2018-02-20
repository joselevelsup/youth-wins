require("dotenv").config();

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
import routes from "./routes/routes";

let app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

routes(app);

mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB);

app.listen(8080, () => {
    console.log("Server is running");
});
