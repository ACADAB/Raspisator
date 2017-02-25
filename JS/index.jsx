import React from "react";
import ReactDOM from 'react-dom';
import request from './API.jsx';
import "./ArrayExtensions.jsx";


import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import Layout from './pages/layout.jsx';
import Projects from './pages/projects.jsx';
import Schools from './pages/schools.jsx';
import Register from './pages/register.jsx';
import Logout from './pages/logout.jsx';
import Login from './pages/login.jsx';
import Editor from './pages/editor.jsx';
import Index from './pages/index.jsx';
import Home from './pages/home.jsx';
import NewProject from './pages/newProject.jsx';
import School from './pages/school.jsx';
import Schedule from './pages/schedule.jsx';
import ProjectPreferences from './pages/projectPreferences.jsx';
import NotFound from './pages/404.jsx';
import Profile from './pages/profile.jsx'

//import properties from './settings.jsx';


var outVal = 0; 

const app = document.getElementById("app");


ReactDOM.render((
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute component={Index}></IndexRoute>
			<Route path="projects" component={Projects}></Route>
			<Route path="schools" component={Schools}></Route>
			<Route path="register" component={Register}></Route>
			<Route path="newProject" component={NewProject}></Route>
			<Route path="logout" component={Logout}></Route>
			<Route path="login" component={Login}></Route>
			<Route path="schedule" component={Schedule}></Route>
			<Route path="profile" component={Profile}></Route>
			<Route path="home" component={Home}></Route>
			<Route path="editor/:id" component={Editor}></Route>
			<Route path="school/:id" component={School}></Route>
			<Route path="projectPreferences/:id" component={ProjectPreferences}></Route>
			<Route path="*" component={NotFound} />
		</Route> 
	</Router>
	), app);
