import nodemailer from "nodemailer";
import { applying, accepted, denied, forgotPass } from "./mail-templates";

const mailHelper = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        type: "OAuth2",
        user: process.env.MAILUSER,
        clientId: process.env.MAIL_CLIENT_ID, //Client ID from Google API Console
        clientSecret: process.env.MAIL_CLIENT_SECRET, // Client Secret from Google API Console
        refreshToken: process.env.MAIL_REFRESH_TOKEN // Refresh Token from https://developers.google.com/oauthplayground/
    }
});

export const sendForgotEmail = ({ id, email}) => {
    return new Promise((resolve, reject) => {
        var mailOpts = {
            from: process.env.MAILUSER,
            to: email,
            subject: "Reset Password for Youth Wins Login",
            html: forgotPass(id)
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
