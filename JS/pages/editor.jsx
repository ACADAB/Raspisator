import React from "react";
import Class from './class.jsx';
import ClassList from './classList.jsx';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';



@DragDropContext(HTML5Backend)
export default class Editor extends(React.Component){
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="editor">
				<ClassList/>
			</div>
			);
	}
}
