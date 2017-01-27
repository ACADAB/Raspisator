import React from "react";
import scheduleStore from '../stores/scheduleStore.jsx';

export default class TimeSpace extends(React.Component){
	constructor(props){
		super(props);
		this.rerender = this.rerender.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}


	rerender(){
		this.forceUpdate();//this.setState({});
	}

	componentWillMount(){
		scheduleStore.on('change', this.rerender);
	}

	componentWillUnmount(){
		scheduleStore.removeListener('change', this.rerender );
	}

	handleClick(){
		const {x, y} = this.props;
		scheduleStore.schedule.table[x][y] ^= true;
		this.rerender();
		//TODO: add change of state
	}

	render(){
		const {x, y} = this.props;
		
		const selected = scheduleStore.schedule.table[x][y];
		
		return(
			<div className={"schedule-time schedule-"+(selected?"selected":"unselected")} onClick={this.handleClick}>
				
			</div>
			);
	}
}
