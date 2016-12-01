import React from "react";
import ReactDOM from 'react-dom';
import request from './API.jsx';

import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import Layout from './pages/layout.jsx';
import Users from './pages/users.jsx';
import Register from './pages/register.jsx';
import Logout from './pages/logout.jsx';
import Login from './pages/login.jsx';

import properties from './settings.jsx';


var outVal = 0; 

const app = document.getElementById("app");





ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute component={Users}></IndexRoute>
			<Route path="users" component={Users}></Route>
			<Route path="register" component={Register}></Route>
			<Route path="logout" component={Logout}></Route>
			<Route path="login" component={Login}></Route>
		</Route> 
	</Router>
	), app);
