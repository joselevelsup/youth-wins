import {combineReducers} from 'redux'
import user from './user'
import  resources from "./resources";
import { adminResources, adminUsers } from "./admin";

import { reducer as formReducer } from "redux-form";

export default combineReducers({user, resources, adminResources, adminUsers, form: formReducer});
