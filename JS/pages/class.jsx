import React from "react";
import { DragSource } from 'react-dnd';
import ItemTypes from '../ItemTypes.jsx';

const cardSource = {
  beginDrag(props) {
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
	}

	componentDidMount(){
		var connectDragPreview = this.props.connectDragPreview;
  		var img = new Image();
    	connectDragPreview(img);
	}

	render(){
		const { grade, teacher, name, color, isDragging, connectDragSource} = this.props;


		const DOMclasses =color + (isDragging?' class-box class dragging': ' class class-box');

		return connectDragSource(
			<div className={DOMclasses}>
				{grade}, 
				{teacher}, 
				{name}
			</div>
			);
	}
}
