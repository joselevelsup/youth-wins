import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from 'redux-thunk';
import apiMiddleware from "../site/middleware/api";
import rootReducer from './reducers'
import { createLogger } from 'redux-logger'

const persistConfig = {
    key: "root",
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    let store = createStore(persistedReducer, composeEnhancers(
        applyMiddleware(thunk, apiMiddleware)
    ));

    let persistor = persistStore(store);

    return { persistor, store };
}

// export default createStore(
// 		rootReducer,
// 		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// 		applyMiddleware(
// 			thunk,
// 			apiMiddleware,
// 			// createLogger({collapsed: false})
// 		)
// )
