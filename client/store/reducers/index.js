import {combineReducers} from 'redux'
import { userReducer as user, currentReducer as current } from './user'
import  resources from "./resources";
import { adminResources, adminUsers, adminApps } from "./admin";
import dashboard from "./dashboard";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
    user, current,
    resources, adminResources,
    adminUsers, dashboard,
    adminApps, form: formReducer
});
