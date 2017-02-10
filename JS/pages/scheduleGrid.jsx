import React from "react";
import scheduleStore from "../stores/scheduleStore.jsx";

import TimeSpace from './timeSpot.jsx';

import {Table} from 'react-bootstrap';

export default class SchduleGrid extends(React.Component){
	constructor(props){
		super(props);
		this.rerender = this.rerender.bind(this);
		this.state={};
	}


	rerender(){
		this.setState({});
	}

	componentWillMount(){
		scheduleStore.on('change', this.rerender)
	}

	componentWillUnmount(){
		scheduleStore.removeListener('change', this.rerender );
	}

	getHeadRow(){
		var row = [];

		const height = scheduleStore.schedule.height;
		const colNames = scheduleStore.getColNames();


		row.push(<th draggable="false" key={-1}> № урока \ Дата </th>);
		for (let y = 0; y < height; y++){
			row.push(
					<th draggable="false" key={y}>{colNames[y]}</th>
				)
		}
		return row;
	}

	render(){
		const width = scheduleStore.schedule.width;

		const height = scheduleStore.schedule.height;
		var rows = [];
		var rows_head = []


		rows_head.push(
				<tr draggable="false" key={-1}>
					{this.getHeadRow()}
				</tr>
			)

		for (let x = 0; x < width; x++){
			var row = [];
			row.push(<td draggable="false" key={-1}>{(x%scheduleStore.lpd)+1}</td>)
			for (let y = 0; y < height; y++){
				row.push(
						<td draggable="false" key={y}><TimeSpace x={x} y={y} /></td>
					)
			}

			rows.push(
					<tr key={x}>
						{row}
					</tr>
				)
		}
		return (
				<div className='grid-wrapper'>
					<Table responsive draggable='false'>
						<thead draggable='false'>
							{rows_head}
						</thead>
						<tbody draggable='false'>
							{rows}
						</tbody>
					</Table>
				</div>
			)
	}
}
