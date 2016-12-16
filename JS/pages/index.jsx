import React from "react";
import request from "../API.jsx";
import {Link} from 'react-router';
import AccountStore from '../stores/accountStore.jsx';
import Projects from './projects.jsx';
import Home from './home.jsx';

export default class Index extends(React.Component){

	constructor(props){
		super(props);
		this.rerender = this.rerender.bind(this);
	}

	rerender(){
		this.setState({});
	}

	componentWillMount(){
		AccountStore.on('change', this.rerender)
	}

	componentWillUnmount(){
		AccountStore.removeListener('change', this.rerender );
	}

	render(){
		if (AccountStore.getAccount().isLoggedIn){
			return(
				<div>
					<Projects />
				</div>
				)
		} 
		else {
			return(
				<div>
					<Home/>
				</div>
				)
		}
	}
}
