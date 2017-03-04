import React from "react";
import Class from './class.jsx';
import update from 'react/lib/update';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import ItemTypes from '../ItemTypes.jsx';
import * as ClassActions from '../actions/classActions.jsx';
import classStore from '../stores/classStore.jsx';
import ScrollArea from 'react-scrollbar';


const cardTarget = {
    drop(props, monitor, component){
        const dragID  = monitor.getItem().id;
        if (classStore.classPosition[dragID].isUsed){
            ClassActions.setUnused(dragID);
        }
    },

    hover(props, monitor, component) {
        const dragId =  monitor.getItem().id;
        if (props.grade != undefined && props.grade != classStore.getClassByID(dragId).grade)
            return;
        const dragID  = monitor.getItem().id;
        if (! classStore.classPosition[dragID].isUsed){
            const dragIndex = monitor.getItem().index;
            const thisRect = findDOMNode(component).children[0].getBoundingClientRect();
            

            // Determine mouse position
            const clientOffset = monitor.getClientOffset();

            const numClasses = component.poses.length;

            // get class height to to count the changes amount
            const classHeight = (r=>r.bottom - r.top)(thisRect)/numClasses;
            //get index of hovered class
            let hoverIndex = Math.floor((clientOffset.y-thisRect.top)/ classHeight);
            
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
            /*
            const hover_db_id = classStore.unused[component.poses[dragIndex]].db_id;
            if (component.poses[dragIndex]< component.poses[hoverIndex]){
                let i =0;
                while(i < component.poses[hoverIndex]){
                    if (classStore.unused[i].db_id == hover_db_id){
                        ClassActions.swapByIndex(i, component.poses[hoverIndex], false);
                        i = 0;
                        continue;
                    }
                    i++;
                }
            } else {
                ClassActions.swapByIndex(component.poses[dragIndex], component.poses[hoverIndex],false);
            }
            */
            ClassActions.swapByIndex(component.poses[dragIndex], component.poses[hoverIndex],false);
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
        this.state={subjects:props.subjected};

        this.setMode = this.setMode.bind(this);
        
        if (props.setMode) props.setMode.set = this.setMode;
        this.unuseIfEditing = this.unuseIfEditing.bind(this);
	}

    setMode(s){
        this.setState({subjects:s});
    }

	rerender(){
		this.forceUpdate();
	}

    unuseIfEditing(){
        if (classStore.editing && classStore.isUsed(classStore.editingID)){
            ClassActions.setUnused(classStore.editingID);
            //classStore.stopEditing();
        }
    }

	componentWillMount(){
		classStore.on('change', this.rerender);
        classStore.on('changeHighlight', this.rerender);
	}

	componentWillUnmount(){
		classStore.removeListener('change', this.rerender );
        classStore.removeListener('changeHighlight', this.rerender );
	}

	render(){//TODO: optimization store the counts and verbose lessons in the unique arrays
        const { grade, used, hideVerbose} = this.props;
        const subjected = this.state.subjects;
		const unused = classStore.getLessons(used,grade);

        let unique = {};
        for (let i =0; i< unused.length; i++){
            let les = unused[i];
            les.name = classStore.projectLessons[les.db_id].name;
            if(hideVerbose && les.verbose){ 
                //console.log('conti');
                continue;
            };
            if (!subjected){
                if (les.db_id in unique){
                    unique[les.db_id].count+=!les.verbose;
                    if (unique[les.db_id].firstPos == -1 || (unique[les.db_id].firstPos != -1 && les.firstPos< unique[les.db_id].firstPos)){
                        unique[les.db_id].firstPos=(les.used)? -1: les.unusedIndex;
                    }
                } else{
                    //console.log(les);
                    unique[les.db_id] = {c:les, count: 0+!les.verbose, firstPos: (les.used)? -1: les.unusedIndex};
                }
            } else {
                if (les.name in unique){
                    unique[les.name].count+=!les.verbose;
                    if (unique[les.name].firstPos == -1 || (unique[les.name].firstPos != -1 && les.firstPos< unique[les.name].firstPos)){
                        unique[les.name].firstPos=(les.used)? -1: les.unusedIndex;
                    }
                } else{
                    //console.log(les);
                    unique[les.name] = {c:les, count: 0+!les.verbose, firstPos: (les.used)? -1: les.unusedIndex};
                }
            }
        }

        //console.log(unique);

        let classes = [];
        let poses = []
        for (let i =0; i< unused.length; i++){
            const db_id = subjected?classStore.projectLessons[ unused[i].db_id].name : unused[i].db_id;
            if (!(db_id in unique)) continue;
            const {c, count, firstPos} = unique[db_id];

            //console.log(c, unused[i]);

            // we want to show only stacked and sorted by verbose
            if ( !unused[i].verbose) continue;
            
            //if (subjected && firstPos!=unused[i].unusedIndex) continue;
            classes.push(
                    <Class db_id={db_id} hideGrade={grade != undefined} renderPicker={!subjected && classStore.editingID == c.id && !hideVerbose} index={classes.length} color={c.color} id={c.id} amount={count} showAll={!hideVerbose} renderCounter={!hideVerbose} subjected={subjected} key={c.id}/>
                )
            //poses.push(firstPos);
            poses.push(unused[i].unusedIndex);
            if(subjected)delete unique[db_id];
        }
		/*const classes = unused.map((c,index) =>
				<Class name={c.name} id={c.id} index={index} color={c.color} teacher={c.teacher} grade={c.grade} key={c.id}/>
			)
        */

        this.poses = poses;
		const {connectDropTarget} = this.props;
		return connectDropTarget( 
                <div className="class-list" onClick={this.unuseIfEditing}>
            			<ScrollArea onClick={this.unuseIfEditing} horizontal={false} speed={0.8} smoothScrolling={true} className="class-list-inner">
            				{classes}
            			</ScrollArea>
            			
                </div>
            );
	}
}
