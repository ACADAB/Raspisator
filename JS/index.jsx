import React from "react";
import ReactDOM from 'react-dom';
import request from './API.jsx';

import properties from './settings.jsx';


var outVal = 0; 

const app = document.getElementById("app");


class Layout extends(React.Component){
	constructor(props){
		super(props);
		this.state = {val : 0};
	}
	
	componentWillMount(){
		let ok_btn = document.getElementsByName('OK')[0];
		ok_btn.addEventListener("click", e=>{
			let b = document.getElementsByName('B')[0].value;
			let a = document.getElementsByName('A')[0].value;
			request('sum', {'a':a, 'b':b}).then(res => {
				this.setState({val : res.data.response});
				this.render();
			});
			e.preventDefault();
		});
	}

	render(){
		return (
			<h1>Hello, {this.state.val}</h1>
			);
	}
}



ReactDOM.render((
	<Layout />
	), app);
