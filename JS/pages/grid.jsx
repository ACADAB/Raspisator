import React from "react";
import ClassSpace from "./classSpace.jsx";
import classStore from "../stores/classStore.jsx";


export default class Grid extends(React.Component){
	constructor(props){
		super(props);
	}

	render(){
		const width = classStore.table.width;
		const height = classStore.table.height;
		var rows = [];
		for (let x = 0; x < width; x++){
			var row = [];
			for (let y = 0; y < height; y++){
				row.push(

						<td key={y}><ClassSpace x={x} y={y} /></td>
					)
			}

			rows.push(
					<tr key={x}>
						{row}
					</tr>
				)
		}
		return (
				<div>
					<table>
						<tbody>
							{rows}
						</tbody>
					</table>
				</div>
			)
	}
}
