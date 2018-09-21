import mongoose from "mongoose";

const resourceModel = new mongoose.Schema({
    organizationName: String,
    contactEmail: String,
    email: String,
    logo: String,
    description: String,
	website: String,
	phone: String,
	minIncome: Number,
	  maxIncome: Number,
    minAge: Number,
    maxAge: Number,
	inMilitary: Boolean,
    pending: {
        type: Boolean,
        default: true
    },
    approved: {
        type: Boolean,
        default: false
    },
    applicants: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    stateServed: {
        type: [String],
    },
    ethnicityServed: {
        type: [String],
    },
    categories: {
        type: [String],
        default: []
    }
});

export const Resource = mongoose.model("resources", resourceModel);
