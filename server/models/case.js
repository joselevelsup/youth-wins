import mongoose from "mongoose";

const caseModel = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  resourceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "resources"
  },
  timeCreated: {
    type: mongoose.Schema.Types.String,
    default: Date.now()
  },
  status: {
    type: mongoose.Schema.Types.String,
    default: "Created"
  }
});

export const Case = mongoose.model("case", caseModel);
