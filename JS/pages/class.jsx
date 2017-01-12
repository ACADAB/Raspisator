import React from "react";
import { DragSource } from 'react-dnd';
import ItemTypes from '../ItemTypes.jsx';
import * as ClassActions from '../actions/classActions.jsx';
import classStore from "../stores/classStore.jsx";

const cardSource = {
	canDrag(props){
		return !props.notDraggable
	},
	beginDrag(props) {
		ClassActions.startEditMode(props.id);
		return {
	      id: props.id,
	      index: props.index
	    };
  }
};

@DragSource(ItemTypes.CLASS, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectDragPreview: connect.dragPreview()
}))
export default class Class extends(React.Component){
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount(){
		var connectDragPreview = this.props.connectDragPreview;
  		var img = new Image();
    	connectDragPreview(img);
	}

	handleClick(){
		if (!classStore.editing) this.startEditing();
	}

	startEditing(){
		cardSource.beginDrag(this.props);
	}

	render(){
		const { grade, teacher, name, color, isDragging,borderColor, id, connectDragSource} = this.props;


		const DOMclasses =color + ((borderColor!='')?(' border-' + borderColor):'') + ' class-box class' + (isDragging?' dragging': '');

		return connectDragSource(
			<div className={DOMclasses} onClick={this.handleClick}>
				{grade}, 
				{teacher}, 
				{name}
			</div>
			);
	}
}
