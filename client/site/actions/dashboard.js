import {
    API,
    API_USERS,
    USER_INFO_S,
    USER_INFO_F,
    TOGGLE_S,
    TOGGLE_F,
	  SUG_RESOURCES_S,
	  SUG_RESOURCES_F,
    USERS_APPS_D_S,
    USERS_APPS_D_F,
    UPDATE_PROFILE_S,
    UPDATE_PROFILE_F
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

export const deletedApp = data => ({
    type: USERS_APPS_D_S,
    payload: data
});

export const failedToDeleteApp = err => ({
    type: USERS_APPS_D_F,
    payload: err
});

export const deleteApp = (appId) => ({
    type: API,
    payload: {
        url: API_USERS+"/apps",
        method: "DELETE",
        data: {
            appId
        },
        success: deletedApp,
        error: failedToDeleteApp
    }
});

export const updatedProfile = data => ({
    type: UPDATE_PROFILE_S,
    payload: data
});

export const failedToUpdateProfile = data => ({
    type: UPDATE_PROFILE_F,
    payload: data
});

export const editUser = ({ email, password,  firstName, lastName, phone, streetAddress, city, state, zipCode, income, age, gender, ethnicity, inMilitary, educationLevel, categoriesOfInterest, profile }) => {
    const data = new FormData();

    profile && data.append("file", profile[0]);

    data.append("data", JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        phone,
        streetAddress,
        city,
        state,
        zipCode,
        income,
        age,
        gender,
        ethnicity,
        inMilitary,
        educationLevel,
        categoriesOfInterest
    }));

    return {
        type: API,
        payload: {
            url: API_USERS+"/update",
            method: "PUT",
            data: data,
            success: updatedProfile,
            error: failedToUpdateProfile
        }
    };
}
