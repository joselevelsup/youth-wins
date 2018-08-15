import mongoose from "mongoose";

const resourceModel = new mongoose.Schema({
    organizationName: String,
    contactEmail: String,
    logo: String,
    pending: {
        type: Boolean,
        default: true
    },
    approved: {
        type: Boolean,
        default: false
    },
    stateServed: {
        type: [String],
        default: []
    },
    ethnicityServed: {
        type: [String],
        default: []
    },
    categories: {
        type: [String],
        default: []
    }
});

export const Resource = mongoose.model("resources", resourceModel);
