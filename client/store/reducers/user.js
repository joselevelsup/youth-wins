import axios from 'axios'
import {
    LOG_IN,
    SIGN_UP,
    USER_S,
    CONTENT_S,
    LOGOUT_S
} from "../../site/constants/constants";
const initialState = {
	loggedIn: false
}

const initialUser = [];

//Action types
// const LOG_IN = 'LOG_IN'
// const SIGN_UP = 'SIGN_UP'

// Action creators
const signUpAction = status => ({
	type: SIGN_UP,
	status
})

// const logInAction = status => ({
// 	type: LOG_IN,
// 	status
// })

//Thunk creators
export function signUp(user){
	return function thunk (dispatch){
		return axios.post('/signup', user)
		.then(res => res.status)
		.then(status => {
			const action = signUpAction(status)
			dispatch(action);
		})
	}
}

// export function logIn(user){
// 	return function thunk (dispatch){
// 		  return axios.post('/login', user)
// 		.then(res => res.status)
// 		.then(status => {
// 			const action = logInAction(status)
// 			dispatch(action);
// 		})
// 	}
// }

export const userReducer = (state = initialState, action) => {
	switch(action.type){
	case LOG_IN:
      action.payload.password = null;
      return {...action.payload, loggedIn: true};
  case "LOG_IN_F":
      console.log(action.payload);
      return initialState;
  case SIGN_UP:
	 	action.payload.password = null;
		return action.payload
  case LOGOUT_S:
      return initialState;
  case USER_S:
      action.payload.password = (action.payload && action.payload.password) && null;
      return action.payload;
		default:
			return state;
	}
}

export const contentReducer = (state = initialState, action) => {
    switch(action.type){
        case CONTENT_S:
        return action.payload;

    default:
        return state || {};
    }
}
