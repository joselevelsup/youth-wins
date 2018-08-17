import {combineReducers} from 'redux'
import user from './user'
import  resources from "./resources";
import { reducer as formReducer } from 'redux-form'

export default combineReducers({user, resources, form: formReducer});
