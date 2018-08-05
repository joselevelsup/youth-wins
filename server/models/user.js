import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
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
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: Number,
    isAdmin: {
        type: mongoose.Schema.Types.Boolean,
        deafult: true
    }
});

export const User = mongoose.model("user", userModel);
export const Admin = mongoose.model("admin", adminModel)
