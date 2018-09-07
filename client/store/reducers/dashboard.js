import {
    USER_INFO_S,
    USER_INFO_F,
	SUG_RESOURCES_S
} from "../../site/constants/constants";

const initialState = {
	user: {},
	suggestions: []
};

export default function dashboard(state = initialState, action){
    switch(action.type){
    case USER_INFO_S:
        return {...state, user: action.payload}
    case USER_INFO_F:
		return action.payload;
	case SUG_RESOURCES_S:
		return {...state, suggestions: action.payload.suggestions}
    default:
        return state || initialState;
    }
}
