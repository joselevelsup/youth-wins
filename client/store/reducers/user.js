import axios from 'axios'

const initialState = {
	loggedIn: false
}

//Action types
const LOG_IN = 'LOG_IN'
const SIGN_UP = 'SIGN_UP'

//Action creators
const signUpAction = status => ({
	type: SIGN_UP,
	status
})

const logInAction = status => ({
	type: LOG_IN,
	status
})

//Thunk creators
export function signUp(user){
	return function thunk (dispatch){
		return axios.post('/signup', user)
		.then(res => res.status)
		.then(status => {
			const action = signUp(status)
			dispatch(action);
		})
	}
}

export function logIn(user){
	return function thunk (dispatch){
		return axios.post('/logIn', user)
		.then(res => res.status)
		.then(status => {
			const action = signUp(status)
			dispatch(action);
		})
	}
}

export default function userReducer(state = initialState, action){
	switch(action.type){
		case LOG_IN:
			const loggedIn = action.loggedIn === 200 ? true : false
			return Object.assign({}, ...state, {loggedIn})
		case SIGN_UP:
			const signedUp = action.loggedIn === 200 ? true : false
			return Object.assign({}, ...state, {loggedIn: signedUp})
		default:
			return state
	}
}