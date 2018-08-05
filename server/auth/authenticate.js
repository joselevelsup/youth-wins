import bcrypt from "bcrypt";
import passport from "passport";
import { User } from "../models/user";

export function login(req, res){
    passport.authenticate("local-login", function(err, user, info) {
        if(err){
            res.status(500).json({
                message: "error has occurred"
            });
        }

        if(user){
            res.status(200).json(req.user);
        } else {
            res.status(500).json({
                message: "wrong username or password"
            });
        }
    })(req, res);
}


export function signup(req, res){
    const {
        email,
        password,
        firstName,
        lastName,
        phone,
        zipCode,
        streetAddress,
        city,
        state,
        isUsResident,
        income,
        age,
        gender,
        ethnicity,
        inMilitary,
        educationLevel,
        categoriesOfInterest
    } = req.body;

    User.findOne({ "email": email}).then((user) => {
        if(!user){
            return new User({
                email: email,
                password: bcrypt.hashSync(password, 10),
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                zipCode: zipCode,
                streetAddress: streetAddress,
                city: city,
                state: state,
                isUsResident: isUsResident,
                income: income,
                age: age,
                gender: gender,
                ethnicity: ethnicity,
                inMilitary: inMilitary,
                educationLevel: educationLevel,
                categoriesOfInterest: categoriesOfInterest
            });
        }
    }).then((user) => {
        res.status(200).json({
            message: "successful signup"
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: "Unable to register user"
        });
    });
}
