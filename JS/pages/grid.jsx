import React from "react";
import ClassSpace from "./classSpace.jsx";
import classStore from "../stores/classStore.jsx";
import {Table} from 'react-bootstrap';

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
		classStore.on('change', this.rerender)
	}

	componentWillUnmount(){
		classStore.removeListener('change', this.rerender );
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
		return (
				<div class='grid-wrapper'>
					<Table responsive draggable={false}>
						<thead draggable={false}>
							{rows_head}
						</thead>
						<tbody draggable={false}>
							{rows}
						</tbody>
					</Table>
				</div>
			)
	}
}
