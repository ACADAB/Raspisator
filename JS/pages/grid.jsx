import React from "react";
import ClassSpace from "./classSpace.jsx";
import classStore from "../stores/classStore.jsx";


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

	render(){
		const width = classStore.table.width;
		const height = classStore.table.height;
		const colNames = classStore.getColNames();
		var rows = [];

		var row = [];
		for (let y = 0; y < height; y++){
			row.push(
					<th draggable="false" key={y}>{colNames[y]}</th>
				)
		}

		rows.push(
				<tr draggable="false" key={-1}>
					{row}
				</tr>
			)

		for (let x = 0; x < width; x++){
			var row = [];
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
					<table draggable={false}>
						<tbody draggable={false}>
							{rows}
						</tbody>
					</table>
				</div>
			)
	}
}
