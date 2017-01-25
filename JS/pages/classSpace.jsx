		import React from "react";
import ItemTypes from '../ItemTypes.jsx';
import classStore from '../stores/classStore.jsx';
import * as ClassActions from '../actions/classActions.jsx';
import { DropTarget } from 'react-dnd';
import * as Highlight from "../highlightEnum.jsx";


console.log(Highlight);

import Class from './class.jsx';


function fakeMonitor(){
	const item = {id:classStore.editingID};

	return {
		getItem: ()=>item
	}
}

const cardTarget = {
	canDrop : function(props, monitor, component){
		return classStore.canDrop(props.x, props.y);
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

		this.oldID = -1;
		this.oldHighlight = Highlight.toColor[Highlight.NORMAL];
	}


	rerender(){
		if (this.oldID != this.getCurrentId() || this.oldHighlight != this.getCurrentHighlight()[0])
			this.forceUpdate();//this.setState({});
	}

	componentWillMount(){
		classStore.on('change', this.rerender);
		classStore.on('changeHighlight', this.rerender);
	}

	componentWillUnmount(){
		classStore.removeListener('change', this.rerender );
		classStore.removeListener('changeHighlight', this.rerender );
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

	getCurrentId(){
		const {x,y} = this.props;
		return classStore.table.table[x][y];
	}

	getCurrentHighlight(){
		const {x,y} = this.props;
		const highlight = classStore.stoppingHighlight.table[x][y].getMostVerbose();
		
		const isHighlighted = highlight != Highlight.NORMAL;
		return [Highlight.toColor[highlight],isHighlighted];
	}

	render(){
		const {x, y, isOver, isDragging} = this.props;
		let canDrop = this.props.canDrop;

		const id = this.getCurrentId();
		
		const isDrag = (isDragging == null)? false: true;
		const isChanging = classStore.editing || isDrag;

		if (!isDrag && isChanging) canDrop = classStore.canDrop(x,y);

		const {connectDropTarget} = this.props;

		const [highlightColor,isHighlighted] = this.getCurrentHighlight();

		const overlay = true;

		//console.log(Highlight.toColor[highlight]);
		
		this.oldID = id;
		this.oldHighlight = highlightColor;

		let c = '';
		if (id != -1){
			c = classStore.getClassByID(id);
		}
			return connectDropTarget(
				<div className={"class-space class-box"+(isHighlighted && !overlay? ' '+highlightColor: '')} onMouseEnter={ this.handleHover} onClick={this.handleClick}>
					<div style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}>
					
					{
					(id != -1) && <Class id={c.id} index={c.id} db_id={c.db_id} color={c.color} borderColor={(!overlay)?highlightColor:''}/>
					}
					{isChanging&& canDrop && isOver && this.renderOverlay('yellow')}			
					{isChanging&& isHighlighted && overlay && this.renderOverlay(highlightColor)}			
					</div>
				</div>
					
				);
	}
}
