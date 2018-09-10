import {
    API,
    API_USERS,
    USER_INFO_S,
    USER_INFO_F,
    TOGGLE_S,
    TOGGLE_F
} from "../constants/constants";

export const userInfo = data => ({
    type: USER_INFO_S,
    payload: data
});

export const failedUserInfo = err => ({
    type: USER_INFO_F,
    payload: err
});

export const getUserInfo = () => ({
    type: API,
    payload: {
        url: API_USERS+"/apps",
        success: userInfo,
        error: failedUserInfo
    }
});

export const toggledResponse = data => ({
    type: TOGGLE_S,
    payload: data
});

export const failedToggle = err => ({
    type: TOGGLE_F,
    payload: err
});

export const toggleResponse = (status, id) => ({
    type: API,
    payload: {
        url: API_USERS+"/apps/toggle",
        method: "POST",
        data: {
            status,
            appId: id
        },
        success: toggledResponse,
        error: failedToggle
    }
});
