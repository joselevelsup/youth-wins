import {
    API,
    API_ADMIN,
    ADMIN_S,
    ADMIN_F,
    ADMIN_RES_S,
    ADMIN_USERS_S,
    ADMIN_APPS_S,
    ADMIN_CREATE_STAFF_S,
    ADMIN_CREATE_STAFF_F,
    ADMIN_UPDATE_STAFF_S,
    ADMIN_UPDATE_STAFF_F,
    ADMIN_DELETE_STAFF_S,
    ADMIN_DELETE_STAFF_F,
    CREATED_RES_S,
    CREATED_RES_F,
    UPDATED_RES_S,
    UPDATED_RES_F,
    DELETED_RES_S,
    APPROVED_RES_S,
    APPROVED_RES_F,
    DENIED_RES_S,
    DENIED_RES_F
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

export const createdResource = data => ({
    type: CREATED_RES_S,
    payload: data
});

export const failedResource = err => ({
    type: CREATED_RES_F,
    payload: err
});

export const createResource = data => ({
    type: API,
    payload: {
        url: API_ADMIN+`/resources`,
        method: "POST",
        data: data,
        success: createdResource,
        error: failedResource
    }
});

export const updatedResource = data => ({
    type: UPDATED_RES_S,
    payload: data
});

export const failedUpdateResource = err => ({
    type: UPDATED_RES_F,
    payload: err
});

export const updateResource = ({ id, ...data }) => ({
    type: API,
    payload: {
        url: API_ADMIN+`/resources`,
        method: "PUT",
        data: {
            resourceId: id,
            updates: data
        },
        success: updatedResource,
        error: failedUpdateResource
    }
});


export const deletedResource = data => ({
    type: DELETED_RES_S,
    payload: data
});

export const deleteResource = id => ({
    type: API,
    payload: {
        url: API_ADMIN+`/resources`,
        method: "DELETE",
        data: {
            resourceId: id
        },
        success: deletedResource
    }
});

export const approvedResource = data => ({
    type: APPROVED_RES_S,
    payload: data
});

export const failedToApprove = err => ({
    type: APPROVED_RES_F,
    payload: err
});

export const approve = id => ({
    type: API,
    payload: {
        url: API_ADMIN+"/resource/approve",
        method: "POST",
        data: {
            resourceId: id
        },
        success: approvedResource,
        error: failedToApprove
    }
});

export const deniedResource = data => ({
    type: DENIED_RES_S,
    payload: data
});

export const failedToDeny = err => ({
    type: DENIED_RES_F,
    payload: err
});

export const deny = id => ({
    type: API,
    payload: {
        url: API_ADMIN+"/resource/deny",
        method: "POST",
        data: {
            resourceId: id
        },
        success: deniedResource,
        error: failedToDeny
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

export const createdStaff = data => ({
    type: ADMIN_CREATE_STAFF_S,
    payload: data
});

export const failedCreateStaff = err => ({
    type: ADMIN_CREATE_STAFF_F,
    payload: err
});

export const createStaff = (userData) => ({
    type: API,
    payload: {
        url: API_ADMIN+`/users/s`,
        method: "POST",
        data: userData,
        success: createdStaff,
        error: failedCreateStaff
    }
});

export const updatedStaff = data => ({
    type: ADMIN_UPDATE_STAFF_S,
    payload: data
});

export const failedUpdateStaff = err => ({
    type: ADMIN_UPDATE_STAFF_F,
    payload: err
});

export const updateStaff = (id, userData) => ({
    type: API,
    payload: {
        url: API_ADMIN+`/users/s`,
        method: "PUT",
        data: {
            resourceId: id,
            user: userData
        },
        success: updatedStaff,
        error: failedUpdateStaff
    }
});

export const deletedStaff = data => ({
    type: ADMIN_DELETE_STAFF_S,
    payload: data
});

export const failedDeleteStaff = err => ({
    type: ADMIN_DELETE_STAFF_F,
    payload: err
});

export const deleteStaff = (id, userData) => ({
    type: API,
    payload: {
        url: API_ADMIN+`/users/s`,
        method: "DELETE",
        data: {
            resourceId: id
        },
        success: deletedStaff,
        error: failedDeleteStaff
    }
});

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

