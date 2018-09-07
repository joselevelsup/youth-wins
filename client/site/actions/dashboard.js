import {
    API,
    API_USERS,
    USER_INFO_S,
    USER_INFO_F,
	SUG_RESOURCES_S,
	SUG_RESOURCES_F
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

export const getSuggestions = data => ({
	type: SUG_RESOURCES_S,
	payload: data
})

export const failedGetSuggestions = err => ({
	type: SUG_RESOURCES_F,
	payload: err
})

export const getUserSuggested = () => ({
	type: API,
	payload: {
		url: API_USERS+"/suggested",
		success: getSuggestions,
		error: failedGetSuggestions
	}
})