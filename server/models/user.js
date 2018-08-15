import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    email: String,
    password: String,
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
    password: String,
    firstName: String,
    lastName: String,
    phone: Number,
    isAdmin: {
        type: mongoose.Schema.Types.Boolean,
        deafult: true
    }
});

export const User = mongoose.model("user", userModel);
export const Admin = mongoose.model("admin", adminModel);
