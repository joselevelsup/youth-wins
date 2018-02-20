require("dotenv").config();

import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";
import shortId from "shortid";

let connection = mongoose.createConnection(process.env.DB);

autoIncrement.initialize(connection);

const resourceModel = new mongoose.Schema({
  shortUrl: {
    type: String,
    default: shortId.generate()
  },
  orgId: Number,
  organizationName: String,
  contact: String,
  logo: String,
  maxAgeServed: Number,
  minAgeServed: Number,
  maxIncome: Number,
  minIncome: Number,
  zipServed: {
    type: [Number],
    default: []
  },
  cityServed: {
    type: [String],
    default: []
  },
  stateServed: {
    type: [String],
    default: []
  },
  onlyUsResidents: {
    type: Boolean,
    default: false
  },
  onlyMilitary: {
    type: Boolean,
    default: false
  },
  ethnicityServed: {
    type: [String],
    default: []
  },
  maxEducationLevel: String,
  categories: {
    type: [String],
    default: []
  }
});

resourceModel.plugin(autoIncrement.plugin, {model: "resources", field: "orgId"});

export const Resource = mongoose.model("resources", resourceModel);
