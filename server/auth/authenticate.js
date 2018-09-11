import bcrypt from "bcrypt";
import passport from "passport";
import encryptSsn from "../helpers/encrypt";
import { User } from "../models/user";
import { getImage } from '../helpers/aws'

export function login(req, res){
    passport.authenticate("local-login", function(err, user, info) {
        if(err){
            res.status(500).json({
                message: "error has occurred"
            });
        }
        if(user){
            req.logIn(user, function(err){
                if(err){
                    res.status(500).json({
                        message: "error has occurred"
                    });
                } else {
                    res.status(200).json(getImage([req.user])[0]);
                }
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
        ssn,
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
            // const encSsn = encryptSsn(ssn);

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
            }).save();
        } else {
            res.status(200).json({
                message: "user already exists"
            });
        }
    }).then((user) => {
        res.status(200).json(user);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: "Unable to register user"
        });
    });
}


export function logOut(req, res){
    req.logout();

    res.status(200).json({
        "success": true
    });
}
