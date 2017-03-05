import React from "react";
import Class from './class.jsx';
import ClassDrag from './classDrag.jsx';
import update from 'react/lib/update';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import ItemTypes from '../ItemTypes.jsx';
import * as ClassActions from '../actions/classActions.jsx';
import classStore from '../stores/classStore.jsx';
import ScrollArea from 'react-scrollbar';



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
        const {connectDropTarget} = this.props;

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
        let poses = [];

        const ClassComp = connectDropTarget ? ClassDrag : Class;

        for (let i =0; i< unused.length; i++){
            const db_id = subjected?classStore.projectLessons[ unused[i].db_id].name : unused[i].db_id;
            if (!(db_id in unique)) continue;
            const {c, count, firstPos} = unique[db_id];

            //console.log(c, unused[i]);

            // we want to show only stacked and sorted by verbose
            if ( !unused[i].verbose) continue;
            
            //if (subjected && firstPos!=unused[i].unusedIndex) continue;
            classes.push(
                    <ClassComp db_id={db_id} hideGrade={grade != undefined} renderPicker={!subjected && classStore.editingID == c.id && !hideVerbose} index={classes.length} color={c.color} id={c.id} amount={count} showAll={!hideVerbose} renderCounter={!hideVerbose} subjected={subjected} key={c.id}/>
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
		
		
        const res = (
             <div className="class-list" onClick={this.unuseIfEditing}>
                    <ScrollArea onClick={this.unuseIfEditing} horizontal={false} speed={0.8} smoothScrolling={true} className="class-list-inner">
                        {classes}
                    </ScrollArea>
                    
            </div>
            );

        return connectDropTarget ? connectDropTarget(res) : res;
	}
}
