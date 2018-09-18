import {
    API,
    API_ADMIN,
    ADMIN_S,
    ADMIN_F,
    ADMIN_RES_S,
    ADMIN_USERS_S,
    ADMIN_APPS_S,
    ADMIN_APPS_F,
    ADMIN_APPS_D_S,
    ADMIN_APPS_D_F,
    ADMIN_CREATE_STAFF_S,
    ADMIN_CREATE_STAFF_F,
    ADMIN_UPDATE_STAFF_S,
    ADMIN_UPDATE_STAFF_F,
    ADMIN_DELETE_STAFF_S,
    ADMIN_DELETE_STAFF_F,
    ADMIN_DELETE_USER_S,
    ADMIN_DELETE_USER_F,
    CREATED_RES_S,
    CREATED_RES_F,
    UPDATED_RES_S,
    UPDATED_RES_F,
    DELETED_RES_S,
    APPROVED_RES_S,
    APPROVED_RES_F,
    DENIED_RES_S,
    DENIED_RES_F,
    GET_CONTENT_S,
    GET_CONTENT_F,
    UPDATE_HOME_CONTENT_S,
    UPDATE_HOME_CONTENT_F,
    UPDATE_SUPPORT_CONTENT_S,
    UPDATE_SUPPORT_CONTENT_F,
    UPDATE_ABOUT_CONTENT_S,
    UPDATE_ABOUT_CONTENT_F,
    ADDED_MEMBER,
    FAILED_ADD_MEMBER,
    ADD_CATEGORY_S,
    ADD_CATEGORY_F,
    DELETED_CATEGORY_S,
    DELETED_CATEGORY_F

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

export const createResource = ({organizationName, email, website, contactEmail, description, logo, ethnicityServed, categoriesOfInterest, stateServed, phone, inMilitary, minIncome, maxIncome }) => {

    const data = new FormData();

    logo && data.append("file", logo[0]);
    data.append("data", JSON.stringify({
        organizationName,
        email,
        website,
        contactEmail,
        description,
        ethnicityServed,
        stateServed,
		categoriesOfInterest,
		phone, 
		inMilitary, 
		minIncome, 
		maxIncome
    }));

    return {
        type: API,
        payload: {
            url: API_ADMIN+`/resources`,
            method: "POST",
            data: data,
            success: createdResource,
            error: failedResource
        }
    }
};

export const updatedResource = data => ({
    type: UPDATED_RES_S,
    payload: data
});

export const failedUpdateResource = err => ({
    type: UPDATED_RES_F,
    payload: err
});

export const updateResource = (id, {organizationName, email, website, contactEmail, description, logo, ethnicityServed, stateServed, categoriesOfInterest }) => {
    const file = new FormData();
    logo && file.append('file', logo[0]);
    file.append("data", JSON.stringify({
        id,
        organizationName,
        email,
        website,
        contactEmail,
        description,
        ethnicityServed,
        stateServed,
        categoriesOfInterest
    }));
    return{
        type: API,
        payload: {
            url: API_ADMIN+`/resources`,
            method: "PUT",
            data: file,
            success: updatedResource,
            error: failedUpdateResource
        }
    }
};


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

export const createStaff = ({firstName, lastName, password, cpassword, position, email, profile, description}) => {
    const file = new FormData();
    profile && file.append('file', profile[0]);
    file.append("data", JSON.stringify({
        firstName,
        lastName,
        password,
        cpassword,
        position,
        email,
        description
    }));
    return {
        type: API,
        payload: {
            url: API_ADMIN+`/users/s`,
            method: "POST",
            data: file,
            success: createdStaff,
            error: failedCreateStaff
        }
    };
};

export const updatedStaff = data => ({
    type: ADMIN_UPDATE_STAFF_S,
    payload: data
});

export const failedUpdateStaff = err => ({
    type: ADMIN_UPDATE_STAFF_F,
    payload: err
});

export const updateStaff = ({ _id, firstName, lastName, password, cpassword, position, email, profile, description }) => {
    const data = new FormData();
    profile && data.append("file", profile[0]);
    data.append("data", JSON.stringify({
        id: _id,
        firstName,
        lastName,
        password,
        cpassword,
        position,
        email,
        profile,
        description
    }));

    return {
        type: API,
        payload: {
            url: API_ADMIN+"/users/s",
            method: "PUT",
            data: data,
            success: updatedStaff,
            error: failedUpdateStaff
        }
    };
};

export const deletedStaff = data => ({
    type: ADMIN_DELETE_STAFF_S,
    payload: data
});

export const failedDeleteStaff = err => ({
    type: ADMIN_DELETE_STAFF_F,
    payload: err
});

export const deleteStaff = id => ({
    type: API,
    payload: {
        url: API_ADMIN+`/users/s`,
        method: "DELETE",
        data: {
            staffId: id
        },
        success: deletedStaff,
        error: failedDeleteStaff
    }
});


export const deletedUser = data => ({
    type: ADMIN_DELETE_USER_S,
    payload: data
});

export const failedDeleteUser = err => ({
    type: ADMIN_DELETE_USER_F,
    payload: err
});

export const deleteUser = id => ({
    type: API,
    payload: {
        url: API_ADMIN+`/users/a`,
        method: "DELETE",
        data: {
            userId: id
        },
        success: deletedStaff,
        error: failedDeleteStaff
    }
});
export const allApps = data => ({
    type: ADMIN_APPS_S,
    payload: data
});

export const failedApps = err => ({
    type: ADMIN_APPS_F,
    payload: err
});

export const getAllApplications = () => ({
    type: API,
    payload: {
        url: API_ADMIN+`/apps`,
        success: allApps
    }
});

export const deletedApp = data => ({
    type: ADMIN_APPS_D_S,
    payload: data
});

export const failedToDeleteApp = err => ({
    type: ADMIN_APPS_D_F,
    payload: err
});

export const deleteApp = (appId) => ({
    type: API,
    payload: {
        url: API_ADMIN+"/apps",
        method: "DELETE",
        data: {
            appId
        },
        success: deletedApp,
        error: failedToDeleteApp
    }
});

export const gotContent = data => ({
    type: GET_CONTENT_S,
    payload: data
});

export const failedContent = err => ({
    type: GET_CONTENT_F,
    payload: err
});

export const getEditableContent = () => ({
    type: API,
    payload: {
        url: API_ADMIN+`/cms/e`,
        success: gotContent,
        failure: failedContent
    }
})

export const getContent = () => ({
    type: API,
    payload: {
        url: API_ADMIN+`/cms`,
        success: gotContent,
        failure: failedContent
    }
});

export const updatedHome = data => ({
    type: UPDATE_HOME_CONTENT_S,
    payload: data
});

export const failedToUpdateHome = err => ({
    type: UPDATE_HOME_CONTENT_F,
    payload: err
});

export const updateHomeContent = ({bannerText, bannerImage, titleText, body}) => {

    const content = new FormData();
    bannerImage && content.append("file", bannerImage[0]);
    content.append("data", JSON.stringify({
        bannerText,
        titleText,
        body
    }));

    return {
        type: API,
        payload: {
            url: API_ADMIN+"/cms/home",
            method: "PUT",
            data: content,
            success: updatedHome,
            error: failedToUpdateHome
        }
    };
};

export const updatedSupport = data => ({
    type: UPDATE_SUPPORT_CONTENT_S,
    payload: data
});

export const failedToUpdateSupport = err => ({
    type: UPDATE_SUPPORT_CONTENT_F,
    payload: err
});

export const updateSupportContent = ({bannerText, bannerImage, section1Title, section1Body, section2Title, section2Body}) => {

    const content = new FormData();
    bannerImage && content.append("file", bannerImage[0]);
    content.append("data", JSON.stringify({
        bannerText, bannerImage, section1Title, section1Body, section2Title, section2Body
    }));

    return {
        type: API,
        payload: {
            url: API_ADMIN+"/cms/support",
            method: "PUT",
            data: content,
            success: updatedSupport,
            error: failedToUpdateSupport
        }
    };
};


export const updatedAbout = data => ({
    type: UPDATE_ABOUT_CONTENT_S,
    payload: data
});

export const failedToUpdateAbout = err => ({
    type: UPDATE_ABOUT_CONTENT_F,
    payload: err
});

export const updateAboutContent = ({bannerText, bannerImage, section1Title, section1Body, section2Title, section2Body}) => {

    const content = new FormData();
    bannerImage && content.append("file", bannerImage[0]);
    content.append("data", JSON.stringify({
        bannerText, bannerImage, section1Title, section1Body, section2Title, section2Body
    }));

    return {
        type: API,
        payload: {
            url: API_ADMIN+"/cms/about",
            method: "PUT",
            data: content,
            success: updatedAbout,
            error: failedToUpdateAbout
        }
    };
};

export const addedMember = data => ({
    type: ADDED_MEMBER,
    payload: data
});

export const failedToAddMember = err => ({
    type: FAILED_ADD_MEMBER,
    payload: err
});

export const addMember = id => ({
    type: API,
    payload: {
        url: API_ADMIN+"/cms/add-member",
        method: "POST",
        data: {
            userId: id
        },
        success: addedMember,
        error: failedToAddMember
    }
});

export const addedCategory = data => ({
    type: ADD_CATEGORY_S,
    payload: data
});

export const failedToAddCategory = err => ({
    type: ADD_CATEGORY_F,
    payload: err
});

export const createNewCategory = data => ({
    type: API,
    payload: {
        url: API_ADMIN+"/cms/category",
        method: "POST",
        data: data,
        success: addedCategory,
        error: failedToAddCategory
    }
});

export const deletedCategory = data => ({
    type: DELETED_CATEGORY_S,
    payload: data
});

export const failedToDeleteCategory = err => ({
    type: DELETED_CATEGORY_F,
    payload: err
});

export const deleteACategory = data => ({
    type: API,
    payload: {
        url: API_ADMIN+"/cms/category",
        method: "DELETE",
        data: {
            category: data
        },
        success: deletedCategory,
        error: failedToDeleteCategory
    }
});
