import React from "react";

import {Form, ControlLabel } from 'react-bootstrap'
import {AutoAffix} from 'react-overlays';
import Switch from 'react-bootstrap-switch';

import ClassList from './classList.jsx';

export default class SideList extends(React.Component){
	constructor(props){
		super(props);
		this.handleSwitch = this.handleSwitch.bind(this);
		this.classList = undefined;
		this.setMode = {set:(s)=>{}};
	}

	handleSwitch(e,s){
		this.setMode.set(s);
	}

	render(){
		return (
					<div className="class-list-fixed-wrapper" draggable='false'> 
						<AutoAffix viewportOffsetTop={15} container={this.props.parent}>
							<div draggable='false' className="class-list margined class-list-fixed padded">
								<Form inline>
									<ControlLabel >По предеметам</ControlLabel>
										
									<Switch onChange={this.handleSwitch} bsSize="mini" defaultValue={false} wrapperClass="wrapper pull-right"/>
								</Form>
								<ClassList used="unused" setMode={this.setMode} subjected={false} hideVerbose/>
							</div>
						</AutoAffix>
					</div>
				);//
	}
}
