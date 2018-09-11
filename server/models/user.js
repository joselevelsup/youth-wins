import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    email: String,
    password: {
        type: String,
        select: false
    },
    profile: String,
    firstName: String,
    lastName: String,
    phone: Number,
    zipCode: Number,
    streetAddress: String,
    city: String,
    state: String,
    isUsResident: Boolean,
    ssn: String,
    sec: String,
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


const adminModel = new mongoose.Schema({
    email: String,
    password: {
        type: String,
        select: false
    },
    firstName: String,
    lastName: String,
    position: String,
    profile: String,
    bio: String,
    isAdmin: {
        type: mongoose.Schema.Types.Boolean,
        deafult: false
    },
    isStaff: {
        type: mongoose.Schema.Types.Boolean,
        default: true
    }
});

export const User = mongoose.model("user", userModel);
export const Admin = mongoose.model("admin", adminModel);
