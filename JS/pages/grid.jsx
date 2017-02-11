import React from "react";
import ClassSpace from "./classSpace.jsx";
import classStore from "../stores/classStore.jsx";
import {Table} from 'react-bootstrap';
import { DropTarget } from 'react-dnd';

import { findDOMNode } from 'react-dom';

import ItemTypes from '../ItemTypes.jsx';


const cardTarget = {
    /*drop(props, monitor, component){
        const dragID  = monitor.getItem().id;
        if (classStore.classPosition[dragID].isUsed){
            ClassActions.setUnused(dragID);
        }
    },*/

    hover(props, monitor, component) {
        const dragId =  monitor.getItem().id;
        if (props.grade != undefined && props.grade != classStore.getClassByID(dragId).grade)
            return;
        const dragID  = monitor.getItem().id;
        

        const rootTable = findDOMNode(component).children[0].children[0].children[0];

        const r1 = rootTable.children[0].getBoundingClientRect();
        const r2 =rootTable.children[1].getBoundingClientRect();
        

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

  		console.log(r1,r2,clientOffset);
        // get class height to to count the changes amount
        //const classHeight = (r=>r.bottom - r.top)(thisRect)/numClasses;


    }
};

@DropTarget(ItemTypes.CLASS, cardTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))

export default class Grid extends(React.Component){
	constructor(props){
		super(props);
		this.rerender = this.rerender.bind(this);
		this.state={};
	}


	rerender(){
		this.setState({});
	}

	componentWillMount(){
		classStore.on('init', this.rerender)
	}

	componentWillUnmount(){
		classStore.removeListener('init', this.rerender );
	}

	getHeadRow(){
		var row = [];

		const height = classStore.table.height;

		const colNames = classStore.getColNames();
		row.push(<th draggable="false" key={-2}> Дата </th>);
		row.push(<th draggable="false" key={-1}> № </th>);
		for (let y = 0; y < height; y++){
			row.push(
					<th draggable="false" key={y}>{colNames[y]}</th>
				)
		}
		return row;
	}

	render(){
		const width = classStore.table.width;
		const connectDropTarget = this.props.connectDropTarget;
		console.log('rerender grid')
		const height = classStore.table.height;
		var rows = [];
		var rows_head = []

		
/*
		rows_head.push(
				<tr draggable="false" key={-1}>
					{this.getHeadRow()}
				</tr>
			)
*/
		for (let x = 0; x < width; x++){
			var row = [];
			if (x%classStore.lpd === 0) {
				rows.push(
					<tr className="table-head" draggable="false" key={-x - 2}>
						{this.getHeadRow()}
					</tr>)
				row.push(<td draggable="false" key={-2} rowSpan={classStore.lpd}>{(new Date(classStore.startDate.getTime() + (x/classStore.lpd)*60*60*24*1000)).toLocaleDateString('ru-RU')}</td>)
			}
			row.push(<td draggable="false" key={-1}>{(x%classStore.lpd)+1}</td>)
			for (let y = 0; y < height; y++){
				row.push(

						<td draggable="false" key={y}><ClassSpace x={x} y={y} /></td>
					)
			}

			rows.push(
					<tr key={x}>
						{row}
					</tr>
				)
		}
		return (//connectDropTarget(
				<div class='grid-wrapper'>
					<Table responsive draggable='false'>
						<tbody draggable='false'>
							{rows}
						</tbody>
					</Table>
				</div>
			)
	}
}
