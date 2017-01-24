import React from "react";

import * as AccountActions from '../actions/accountActions.jsx';
import alertStore from '../stores/alertStore.jsx';
import OverlayAlert from './overlayAlert.jsx';


import Spinner from 'react-spinner';
export default class OverlayLayout extends(React.Component){
	constructor(props){
		super(props);
		this.state = {};
		this.rerender = this.rerender.bind(this);
		//this.mixins = [Router.Navigation]
	}

	rerender(){
		this.forceUpdate();//setState({});
	}

	componentWillMount(){
		alertStore.on('change', this.rerender)
	}

	componentWillUnmount(){
		alertStore.removeListener('change', this.rerender );
	}
	
	render(){
		const alerts = alertStore.alerts;
		const renderedAlerts = alerts.map((a, index)=>{return <OverlayAlert a={a} key={index}/>});

		return (
			<div className="alert-container-fixed">
				{renderedAlerts}
			</div>
			);

	}
}
