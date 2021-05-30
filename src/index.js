import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import {  BrowserRouter, HashRouter, Route, Switch} from 'react-router-dom';
import MainPage from './components/MainPage';
import FormPage from './components/FormPage'
import LoginPage from './components/LoginPage'
import Question from './components/Question'
import ScorePage from './components/ScorePage'

const rootElement = document.getElementById("root");


ReactDOM.render(
	<HashRouter>
		<Switch>
				<Route exact path="/" component={MainPage} />
				
				<Route path="/login" component={LoginPage} />
				<Route path="/formpage" component={FormPage} />
				<Route path='/question' component={Question} />
				<Route path='/scorepage' component={ScorePage} />
		</Switch>
	</HashRouter>,
	rootElement
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
