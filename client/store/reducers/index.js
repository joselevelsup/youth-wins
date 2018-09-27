import {combineReducers} from 'redux'
import { LOGOUT_S } from "../../site/constants/constants";
import { userReducer as user, currentReducer as current, contentReducer } from './user'
import  resources from "./resources";
import { adminResources, adminUsers, adminApps, adminSettings } from "./admin";
import dashboard from "./dashboard";
import { reducer as formReducer } from "redux-form";


const rootReducer = combineReducers({
    user, current,
    resources, adminResources,
    adminUsers, dashboard,
    cms: adminSettings, adminApps,
    content: contentReducer,
    form: formReducer
});

export default rootReducer;
