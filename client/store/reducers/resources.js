import {
    RESOURCES_S
} from "../../site/constants/constants";

const initialState = [];

export default (state = initialState, action) => {
    switch(action.type){
    case RESOURCES_S:
        return action.payload.resources;

    default:
        return state || initialState;
    }
}
