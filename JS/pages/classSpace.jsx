import React from "react";
import ItemTypes from '../ItemTypes.jsx';
import classStore from '../stores/classStore.jsx';
import * as ClassActions from '../actions/classActions.jsx';
import { DropTarget } from 'react-dnd';


import Class from './class.jsx';

function fakeMonitor(){
	const item = {id:classStore.editingID};

	return {
		getItem: ()=>item
	}
}

const cardTarget = {
	canDrop : function(props, monitor, component){
		return classStore.canDrop(props.x, props.y);;
	},

	drop : function(props, monitor, component) {

		const dragID = monitor.getItem().id;
		const currID = classStore.table.table[props.x][props.y];
		if (currID == -1){
			ClassActions.setUsed(dragID, props.x, props.y);
		} else {
			ClassActions.swapByID(dragID, currID);
		};
	},
	hover : function(props, monitor, component) {
		const dragID = monitor.getItem().id;
		classStore.canDrop(props.x, props.y,true, true);
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
		this.handleClick = this.handleClick.bind(this);
		this.handleHover = this.handleHover.bind(this);
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

	handleClick(){
		if (classStore.editing && classStore.setable) cardTarget.drop(this.props, fakeMonitor(),undefined)
	}

	handleHover(){
		if (classStore.editing) cardTarget.hover(this.props, fakeMonitor(),undefined)
	
	}

	render(){
		const {x, y, isOver, isDragging} = this.props;
		let canDrop = this.props.canDrop;

		const id = classStore.table.table[x][y];
		const isDrag = (isDragging == null)? false: true;
		const isChanging = classStore.editing || isDrag;


		if (!isDrag && isChanging) canDrop = classStore.canDrop(x,y);

		const {connectDropTarget} = this.props;
		const isHighlighted = classStore.stoppingHighlight.table[x][y];

		let c = '';
		if (id != -1){
			c = classStore.getClassByID(id);
		}
			return connectDropTarget(
				<div className="class-space class-box" onMouseEnter={ this.handleHover} onClick={this.handleClick}>
					<div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
					
					{
					(id != -1) && <Class name={c.name} id={c.id} index={c.id} color={c.color} teacher={c.teacher} grade={c.grade}/>
					}
					{isChanging&& canDrop && isOver && this.renderOverlay('yellow')}	
					{isChanging&& !isHighlighted && !canDrop && this.renderOverlay('grey')}
					{isChanging && !canDrop && isHighlighted && this.renderOverlay('red')}		
					</div>
				</div>
					
				);
	}
}
