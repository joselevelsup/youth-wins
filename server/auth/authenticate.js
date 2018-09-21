import bcrypt from "bcrypt";
import passport from "passport";
import encryptSsn from "../helpers/encrypt";
import { User } from "../models/user";
import { getImage } from '../helpers/aws'

export function login(req, res, next){
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
                    if(!req.user.profile){
                        return res.status(200).json(req.user);
                    } else {
                        return res.status(200).json(getImage(req.user));
                    }
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
        categories
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
                categoriesOfInterest: categories.includes(" ---- ") ? categories.split(" ---- ") : categories
            }).save();
        } else {
            res.status(500).json({
                message: "User already exists"
            });
        }
    }).then((user) => {
        req.logIn(user, function(err){
            if(err){
                console.log(err);
            } else {
                res.status(200).json(user);
            }
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: "Unable to Register new User"
        });
    });
}


export function logOut(req, res){
    req.logout();

    res.status(200).json({
        "success": true
    });
}
