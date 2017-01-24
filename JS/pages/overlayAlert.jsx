import React from "react";

import {Panel, Col, Row} from 'react-bootstrap';
import Spinner from 'react-spinner';
import alertStore from '../stores/alertStore.jsx';

export default class OverlayAlert extends(React.Component){
	constructor(props){
		super(props);
		this.remove = this.remove.bind(this);
		//this.mixins = [Router.Navigation]
	}

	remove(){
		if (! this.props.a.wait) 
			alertStore.removeAlert(this.props.a);
	}

	componentWillMount(){
		setTimeout(()=>{this.remove()}, 1000);
	}

	render(){
		const a = this.props.a;
		const className = 'alert-overlay ' + 'alert-'+a.type;

		return (
			<div className={className} onClick={this.remove}>
				<div className="alert-message">
					{a.message}
				</div> 
				<div className="pull-right">
					{a.wait && <Spinner/>}
				</div>
			</div>
			
			);

	}
}
