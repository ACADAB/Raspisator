import React from "react";
import ItemTypes from '../ItemTypes.jsx';
import classStore from '../stores/classStore.jsx';
import * as ClassActions from '../actions/classActions.jsx';
import { DropTarget } from 'react-dnd';


import Class from './class.jsx';

const cardTarget = {
	canDrop : function(props, monitor, component){
		return classStore.canDrop(monitor.getItem().id, props.x, props.y);;
	},

	drop : function(props, monitor, component) {
		const dragID = monitor.getItem().id;
		const currID = classStore.table.table[props.x][props.y];
		if (currID == -1){
			ClassActions.setUsed(dragID, props.x, props.y);
		} else {
			ClassActions.swapByID(dragID, currID);
		};
	}
};

@DropTarget(ItemTypes.CLASS, cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
   isDragging: monitor.getItem()
}))

export default class ClassSpace extends(React.Component){
	constructor(props){
		super(props);
		this.rerender = this.rerender.bind(this);
	}

	rerender(){
		this.setState({});
	}

	componentWillMount(){
		classStore.on('change', this.rerender)
	}

	componentWillUnmount(){
		classStore.removeListener('change', this.rerender );
	}


	renderOverlay(color) {
	    return (
	      <div className={"overlay "+color}/>
	    );
	  }

	render(){
		const {x, y, isOver,canDrop, isDragging} = this.props;
		const id = classStore.table.table[x][y];
		const isDrag = (isDragging == null)? false: true;
		const {connectDropTarget} = this.props;
		let c = '';
		if (id != -1){
			c = classStore.getClassByID(id);
		}
			return connectDropTarget(
				<div className="class-space class-box" >
					<div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
					
					{
					(id != -1) && <Class name={c.name} id={c.id} index={c.id} color={c.color} teacher={c.teacher} grade={c.grade}/>
					}
					{isDrag&& canDrop && isOver && this.renderOverlay('yellow')}	
					{isDrag&& !canDrop && this.renderOverlay('red')}		
					</div>
				</div>
					
				);
	}
}