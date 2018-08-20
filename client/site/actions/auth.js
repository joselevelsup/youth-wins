import {
    API,
    LOGIN,
    LOG_IN,
    SIGNUP,
    SIGN_UP
} from "../constants/constants";

export const loginSuccess = data => ({
    type: LOG_IN,
    payload: data
});

export const loginError = err => ({
    type: "LOG_IN_F",
    payload: err
});

export const logIn = ({ email, password }) => ({
    type: API,
    payload: {
        url: LOGIN,
        method: "POST",
        data: {
            email,
            password
        },
        success: loginSuccess,
        error: loginError
    }
});

