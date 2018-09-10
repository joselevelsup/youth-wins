import nodemailer from "nodemailer";
import { applying, accepted, denied } from "./mail-templates";

const mailHelper = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPASS
    }
});

export const sendUserInfo = (to, resource, user) => {
    return new Promise((resolve, reject) => {
        var mailOpts = {
            from: process.env.MAILUSER,
            to: to,
            subject: `Applicant for ${resource}`,
            html: applying(user)
        };

        mailHelper.sendMail(mailOpts, function(err, info){
            if(err){
                reject(err);
            } else {
                resolve(info);
            }
        });
    })
}


export const sendAcceptedEmail = (to) => {
    return new Promise((resolve, reject) => {
        var mailOpts = {
            from: process.env.MAILUSER,
            to: to,
            subject: `Thank You for Your Interest in Expanding the YouthWins Network`,
            html: accepted()
        };

        mailHelper.sendMail(mailOpts, function(err, info){
            if(err){
                reject(err);
            } else {
                resolve(info);
            }
        });
    });
}

export const sendDeniedEmail = (to) => {
    return new Promise((resolve, reject) => {
        var mailOpts = {
            from: process.env.MAILUSER,
            to: to,
            subject: `Thank You for Your Interest in Expanding the YouthWins Network`,
            html: denied()
        };

        mailHelper.sendMail(mailOpts, function(err, info){
            if(err){
                reject(err);
            } else {
                resolve(info);
            }
        });
    });
}
