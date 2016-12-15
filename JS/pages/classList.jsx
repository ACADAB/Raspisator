import React from "react";
import Class from './class.jsx';
import update from 'react/lib/update';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import ItemTypes from '../ItemTypes.jsx';
import * as ClassActions from '../actions/classActions.jsx';
import classStore from '../stores/classStore.jsx';

import AddPair from './addPair.jsx'


const cardTarget = {
    drop(props, monitor, component){
        const dragID  = monitor.getItem().id;
        if (classStore.classPosition[dragID].isUsed){
            ClassActions.setUnused(dragID);
        }
    },

    hover(props, monitor, component) {

        const dragID  = monitor.getItem().id;
        if (! classStore.classPosition[dragID].isUsed){
            const dragIndex = monitor.getItem().index;
            const thisRect = findDOMNode(component).children[0].getBoundingClientRect();
            

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            const numClasses = classStore.getLenUnused();

            // get class height to to count the changes amount
            const classHeight = (r=>r.bottom - r.top)(thisRect)/numClasses;
            //get index of hovered class
            const hoverIndex = Math.floor((clientOffset.y-thisRect.top)/ classHeight);
            
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
              return;
            }



            // Determine rectangle on screen
            const hoverBoundingRect = {
            	top: thisRect.top + hoverIndex*classHeight,
            	bottom: thisRect.top + (hoverIndex+1)*classHeight
            };

            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            //if it's out of bounds don't do anything
            if (hoverIndex < 0 || hoverIndex >= numClasses) return;

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex == hoverIndex - 1 && hoverClientY < hoverMiddleY) {
              return;
            }

            // Dragging upwards
            if (dragIndex == hoverIndex + 1 && hoverClientY > hoverMiddleY) {
              return;
            }

            // Time to actually perform the action
            ClassActions.swapByIndex(dragIndex, hoverIndex);

            monitor.getItem().index = hoverIndex;
            //console.log(this);
        }
    }
};

@DropTarget(ItemTypes.CLASS, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
export default class ClassList extends(React.Component){
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

	render(){
		const unused = classStore.getUnused();
		const classes = unused.map((c,index) =>
				<Class name={c.name} id={c.id} index={index} color={c.color} teacher={c.teacher} grade={c.grade} key={c.id}/>
			)
		const {connectDropTarget} = this.props;
		return connectDropTarget( 
                <div className="class-list">
                        <AddPair />
            			<div>
            				{classes}
            			</div>
            			
                </div>
            );
	}
}
