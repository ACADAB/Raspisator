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
  isDragging: monitor.isDragging()
}))


export default class Class extends(React.Component){
	constructor(props){
		super(props);
	}

	render(){
		const { grade, teacher,name,isDragging, connectDragSource} = this.props;
		
		const DOMclasses = 'class'//isDragging?'class dragging': 'class'

		return connectDragSource(
			<div className={DOMclasses}>
				{grade}, 
				{teacher}, 
				{name}
			</div>
			);
	}
}
