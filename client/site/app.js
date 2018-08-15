import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import store from '../store'
import Root from './components/Root'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<Root />
		</HashRouter>
	</Provider>, 
    document.getElementById("app")
);