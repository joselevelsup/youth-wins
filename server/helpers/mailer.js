import nodemailer from "nodemailer";
import { accepted, denied } from "./mail-templates";

const mailHelper = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPASS
    }
});


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
