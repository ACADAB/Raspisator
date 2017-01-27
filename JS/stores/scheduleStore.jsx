import { EventEmitter} from "events";

import dispatcher from '../dispatcher.jsx';
import request  from '../API.jsx';

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
		this.schoolID = -1;
		this.setMaxListeners(1000);
		this.idToLPD = {};
		this.lpd = 0;//[{message:'Привет, Дмитрий!', wait:true, type:'danger'}]
	}

	getSchools(){
		return request('getMySchools').then((res)=>{
			for (let i = 0; i< res.data.length; i++){
				this.idToLPD[res.data[i].id] = parseInt(res.data[i].lessons_per_day);
				return res;
			}
		});
	}

	setDates(from, to, school_id){

		from = new Date(from);
		to = new Date(to);
		this.startDate = from;
		this.numDays = daydiff(from,to)+1;

		this.schoolID = school_id;
		this.lpd = this.idToLPD[school_id];

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

	save(){
		let toSave = [];

		for (let y = 0; y < this.schedule.height; y++){
			let res = [];
			for (let x = 0; x< this.schedule.width; x++){
				res.push(this.schedule.table[x][y]);
			}
			toSave.push({date:(new Date(this.startDate.getTime() + y * (1000*60*60*24))).toISOString().slice(0,10), ready:res});
		}


		const overlayAlert = {message: 'Сохранение графика', wait:true, type: 'warning'};
		const successAlert = {message: 'График Сохранён', wait:false, type: 'success'};
		const errorAlert = {message: 'Ошибка при сохранении графика', wait:false, type: 'danger'};

		//console.log(toSave);
		request('setSchedule',{schedule:JSON.stringify({'days': toSave, 'school_id':this.schoolID})},"post", overlayAlert, successAlert, errorAlert).then(res=>{console.log(res)});
	
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