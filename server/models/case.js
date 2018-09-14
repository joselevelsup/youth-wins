import mongoose from "mongoose";

const caseModel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    resource: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "resources"
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin"
    },
    dateCreated: {
        type: mongoose.Schema.Types.Date,
        default: Date.now()
    },
    status: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    }
});

export const AppliedCase = mongoose.model("applications", caseModel);
