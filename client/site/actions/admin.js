import {
    API,
    API_ADMIN,
    ADMIN_S,
    ADMIN_F,
    ADMIN_RES_S,
    ADMIN_USERS_S,
    ADMIN_APPS_S,
    ADMIN_CREATE_USER,
    ADMIN_FAILED_USER
} from "../constants/constants";

export const adminSuccess = data => ({
    type: ADMIN_S,
    payload: data
});

export const adminFail = err => ({
    type: ADMIN_F,
    payload: err
});

export const getAdminData = () => ({
    type: API,
    payload: {
        url: API_ADMIN,
        success: adminSuccess,
        error: adminFail
    }
});

export const allResources = data => ({
    type: ADMIN_RES_S,
    payload: data
});

export const getAllResources = () => ({
    type: API,
    payload: {
        url: API_ADMIN+`/resources`,
        success: allResources
    }
});

export const allUsers = data => ({
    type: ADMIN_USERS_S,
    payload: data
});

export const getAllUsers = () => ({
    type: API,
    payload: {
        url: API_ADMIN+`/users`,
        success: allUsers
    }
});

export const createdUser = data => ({
    type: ADMIN_CREATE_USER,
    payload: data
});

export const failedCreateUser = err => ({
    type: ADMIN_FAILED_USER,
    payload: err
});

export const createUser = (userData) => ({
    type: API,
    payload: {
        url: API_ADMIN+`/users`,
        method: "PUT",
        data: {
            user: userData
        },
        success: createdUser,
        error: failedCreateUser
    }
})

export const allApps = data => ({
    type: ADMIN_APPS_S,
    payload: data
});

export const getAllApplications = () => ({
    type: API,
    payload: {
        url: API_ADMIN+`/case`,
        success: allApps
    }
});

