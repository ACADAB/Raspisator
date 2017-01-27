import { EventEmitter} from "events";

import dispatcher from '../dispatcher.jsx';

function daydiff(first, second) {
    return Math.floor((second-first)/(1000*60*60*24));
}

function getEmptyTable(x,y, val = -1){
	var a = [], b;
	while (a.push(b = []) <= x) while (b.push((typeof(val))=="function"? val() : val) < y);
	a.pop();
	return {width : x, height : y, table : a}
}

class ScheduleStore extends EventEmitter{
	constructor(){
		super();
		this.schedule = getEmptyTable(0, 0, false);
		this.numDays = 0;
		this.setMaxListeners(1000);
		this.lpd = 6;//[{message:'Привет, Дмитрий!', wait:true, type:'danger'}]
	}

	setDates(from, to){
		from = new Date(from);
		to = new Date(to);
		this.startDate = from;
		console.log(daydiff(from,to))
		this.numDays = daydiff(from,to);

		this.schedule = getEmptyTable( this.lpd, this.numDays,false);
		this.emit('change');
	}

	getColNames(){
		let res = [];
		for(let i=0; i < this.numDays; i++){
			res.push((new Date(this.startDate.getTime() + i * (1000*60*60*24))).toLocaleString('ru-RU').slice(0,10));
		}
		return res;
	}

	handleActions(action){
		//bla bla, add actions. It does not mmatter for this to have a dispatched from actions actions
		switch (action.type) {
			default:
				// statements_def
				break;
		}
	}
}

const scheduleStore = new ScheduleStore; 

dispatcher.register(scheduleStore.handleActions.bind(scheduleStore));

window.scheduleStore = scheduleStore;

export default scheduleStore;