import {
    ADMIN_S,
    ADMIN_F,
    ADMIN_RES_S,
    ADMIN_USERS_S,
    ADMIN_APPS_S,
} from "../../site/constants/constants";

const initialState = [];

export const adminResources = (state = initialState, action) => {
    switch(action.type){

    case ADMIN_RES_S:
        return {
            pending: action.payload.resources.filter(r => r.pending == true),
            approved: action.payload.resources.filter(r => r.approved == true)
        };
    default:
        return state || initialState;
    }
}

export const adminUsers = (state = initialState, action) => {
    switch(action.type){

    case ADMIN_USERS_S:
        console.log(action.payload);
        if(action.payload.success){
            return {
                users: action.payload.users,
                staff: action.payload.admins,
                admins: action.payload.admins.filter(a => a.isAdmin == true)
            };
        }
    default:
        return state || initialState;
    }
}
