import {
    API,
    API_USERS,
    SENT_FORGOT_S,
    SENT_FORGOT_F,
    CHANGED_PASS_S,
    CHANGED_PASS_F
} from "../constants/constants";

export const changePassSuccess = data => ({
    type: CHANGED_PASS_S,
    payload: data
});

export const changePassFailed = err => ({
    type: CHANGED_PASS_F,
    payload: err
});

export const changePass = newpass => ({
    type: API,
    payload: {
        url: API_USERS+"/forgot/pass",
        method: "POST",
        data: {
            password: newpass
        },
        success: changePassSuccess,
        error: changePassFailed
    }
});

export const sentForgot = data => ({
    type: SENT_FORGOT_S,
    payload: data
});

export const failedToSend = err => ({
    type: SENT_FORGOT_F,
    payload: err
});

export const sendForgotPass = email => ({
    type: API,
    payload: {
        url: API_USERS+"/forgot",
        method: "POST",
        data: {
            email: email
        },
        success: sentForgot,
        error: failedToSend
    }
});
