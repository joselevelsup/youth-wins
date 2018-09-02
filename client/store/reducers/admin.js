import {
    ADMIN_S,
    ADMIN_F,
    ADMIN_RES_S,
    ADMIN_USERS_S,
    ADMIN_APPS_S,
    CREATED_RES_S,
    CREATED_RES_F,
    APPROVED_RES_S,
    APPROVED_RES_F,
    DENIED_RES_S,
    DENIED_RES_F,
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
