import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import apiMiddleware from "../site/middleware/api";
import rootReducer from './reducers'
import { createLogger } from 'redux-logger'

export default createStore(
		rootReducer,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
		applyMiddleware(
			thunk,
			apiMiddleware,
			// createLogger({collapsed: false})
		)
)
