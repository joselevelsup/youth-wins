import {
    USER_INFO_S,
    USER_INFO_F
} from "../../site/constants/constants";

const initialState = [];

export default function dashboard(state = initialState, action){
    switch(action.type){
    case USER_INFO_S:
        return action.payload;

    case USER_INFO_F:
        return action.payload;

    default:
        return state || initialState;
    }
}
