import {
    API,
    API_USERS,
    USER_INFO_S,
    USER_INFO_F
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
})
