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
    timeCreated: {
        type: mongoose.Schema.Types.String,
        default: Date.now()
    },
    status: {
        type: mongoose.Schema.Types.String,
        default: "Created"
    }
});

export const AdminCase = mongoose.model("case", caseModel);
