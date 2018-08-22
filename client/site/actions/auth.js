import {
    API,
    LOGIN,
    LOG_IN,
    USER_S,
    CURRENT_USER
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

export const currentSuccess = data => ({
    type: USER_S,
    payload: data
});

export const getCurrentUser = () => ({
    type: API,
    payload: {
        url: CURRENT_USER,
        success: currentSuccess
    }
})
