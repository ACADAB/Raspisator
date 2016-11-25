import React from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import API from './API.jsx'

import properties from './settings.jsx';


const app = document.getElementById("app");

class Layout extends(React.Component){
	constructor(props){
		super(props);

		this.state = {
			userName : ""
		};
	}

	componentDidMount(){

	}

	render(){
		return (
			<h1>Hello, {this.state.userName + this.state.userName?"!":""}</h1>
			);
	}
}


console.log(API.request)
API.request('sum', {'a':10, 'b':25.5}).then(res => {
	console.log(res);
})

let layout = <Layout />;
ReactDOM.render(layout, app);
