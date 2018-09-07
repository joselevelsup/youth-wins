import {
    ADMIN_S,
    ADMIN_F,
    ADMIN_RES_S,
    ADMIN_USERS_S,
    ADMIN_APPS_S,
    ADMIN_APPS_F,
    ADMIN_APPS_D_S,
    ADMIN_APPS_D_F,
    CREATED_RES_S,
    CREATED_RES_F,
    APPROVED_RES_S,
    APPROVED_RES_F,
    DENIED_RES_S,
    DENIED_RES_F,
    GET_CONTENT_S,
    GET_CONTENT_F
} from "../../site/constants/constants";

const initialState = [];

export const adminResources = (state = initialState, action) => {
    switch(action.type){

    case ADMIN_RES_S:
        return {
            pending: action.payload.resources.filter(r => r.pending == true),
            approved: action.payload.resources.filter(r => r.approved == true)
        };

    case CREATED_RES_S:
    case CREATED_RES_F:
    case APPROVED_RES_S:
    case APPROVED_RES_F:
    case DENIED_RES_S:
    case DENIED_RES_F:
        return action.payload;

    default:
        return state || initialState;
    }
}

export const adminUsers = (state = initialState, action) => {
    switch(action.type){

    case ADMIN_USERS_S:
        return {
            applicants: action.payload.users,
            staff: action.payload.admins,
        };
    default:
        return state || initialState;
    }
}


export const adminApps = (state = initialState, action) => {
    switch(action.type){
    case ADMIN_APPS_S:
    case ADMIN_APPS_F:
        return action.payload;

    case ADMIN_APPS_D_S:
    case ADMIN_APPS_D_F:
        return action.payload;

    default:
        return state || initialState;
    }
}

export const adminSettings = (state = initialState, action) => {
    switch(action.type){
    case GET_CONTENT_S:
    case GET_CONTENT_F:
        return action.payload;

    default:
        return state || initialState
    }
}

