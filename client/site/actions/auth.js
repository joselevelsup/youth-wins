import {
    API,
    LOGIN,
    LOG_IN,
    LOGOUT,
    USER_S,
    CURRENT_USER,
    API_CONTENT,
    CONTENT_S,
    LOGOUT_S,
    LOGOUT_F,
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

export const logoutSuccess = data => ({
    type: LOGOUT_S,
    payload: null
});

export const logoutError = err => ({
    type: LOGOUT_F,
    payload: err
});

export const logOutUser = () => ({
    type: API,
    payload: {
        url: LOGOUT,
        success: logoutSuccess,
        error: logoutError
    }
});

export const signupSuccess = data => ({
	type: SIGN_UP,
	payload: data
})

export const signupError = err => ({
	type: "SIGN_UP_F",
	payload: err
})


export const signUp = data => ({
	type: API,
	payload: {
		url: SIGNUP,
		method: "POST",
		success: signupSuccess,
		error: signupError,
		data
	}
})

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

export const contentLoaded = data => ({
    type: CONTENT_S,
    payload: data
});

export const getContent = () => ({
    type: API,
    payload: {
        url: API_CONTENT,
        success: contentLoaded
    }
})
