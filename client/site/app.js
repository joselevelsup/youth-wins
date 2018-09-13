import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/es/integration/react';

import configureStore from '../store';
const { store, persistor } = configureStore();
import Root from './pages/root';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

ReactDOM.render(
	  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
		    <HashRouter>
			    <Root />
		    </HashRouter>
      </PersistGate>
	  </Provider>, 
    document.getElementById("app")
);
