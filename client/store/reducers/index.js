import {combineReducers} from 'redux'
import user from './user'
import  resources from "./resources";
import { adminResources, adminUsers } from "./admin";

export default combineReducers({user, resources, adminResources, adminUsers});
