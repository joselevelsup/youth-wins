require("dotenv").config();
import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

let connection = mongoose.createConnection(process.env.DB);

autoIncrement.initialize(connection);

const userModel = new mongoose.Schema({
  userId: Number,
  firstName: String,
  lastName: String,
  email: String,
  phone: Number,
  zipCode: Number,
  streetAddress: String,
  city: String,
  state: String,
  isUsResident: Boolean,
  isAdmin: {
    type: mongoose.Schema.Types.Boolean,
    default: false
  },
  income: {
    type: Number,
    default: 0
  },
  age: Number,
  gender: String,
  ethnicity: String,
  inMilitary: {
    type: mongoose.Schema.Types.Boolean,
    default: false
  },
  educationLevel: String,
  categoriesOfInterest: {
    type: mongoose.Schema.Types.Array,
    default: []
  }
});

userModel.plugin(autoIncrement.plugin, {model: "user", field: "userId"});

export const User = mongoose.model("user", userModel);
