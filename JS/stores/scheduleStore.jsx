import { EventEmitter} from "events";

import dispatcher from '../dispatcher.jsx';
import request  from '../API.jsx';
import accountStore from './accountStore.jsx';

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
		this.initMe();
		accountStore.on('change', ()=>{this.initMe()});	
	}

	initMe(){
		this.schedule = getEmptyTable(0, 0, false);
		this.numDays = 0;
		this.schoolID = -1;
		this.setMaxListeners(1000);
		this.idToLPD = {};
		this.idToRole = {};
		this.schoolTeachers = {};
		this.my_id = -1;
		this.mySched = true;
		this.lpd = 0;//[{message:'Привет, Дмитрий!', wait:true, type:'danger'}]

	}

	getSchools(){
		return request('getMySchools').then((res)=>{
			for (let i = 0; i< res.data.length; i++){
				this.idToLPD[res.data[i].id] = parseInt(res.data[i].lessons_per_day);
				this.idToRole[res.data[i].id] = parseInt(res.data[i].role_id);
			}
			return res;
		});
	}

	dateToId(_date){
		const date = new Date(_date);
		return daydiff(this.startDate, date);
	}

	getSchoolTeachers(school_id){
		if (this.schoolTeachers[school_id] != undefined) return new Promise(()=>this.schoolTeachers[school_id]);
		return request('getSchoolTeachers', {school_id:school_id}).then((res)=>{
			let teachers = [];
			for (let id in res.data){
				teachers.push(res.data[id]);
			}
			this.schoolTeachers[school_id] = teachers;
			return teachers;
		});
	}

	setDates(_from, _to, school_id, u_id){
		const role = this.idToRole[school_id];


		const mySched = (u_id === -1 && role == 1);
		
		this.mySched = mySched;
		this.my_id = u_id;

		let from = new Date(_from);
		let to = new Date(_to);
		this.startDate = from;
		this.numDays = this.dateToId(to)+1;

		this.schoolID = school_id;
		this.lpd = this.idToLPD[school_id];

		this.schedule = getEmptyTable( this.lpd, this.numDays,false);

		const overlayAlert = {message: 'Загрузка графика', wait:true, type: 'warning'};
		const successAlert = {message: 'График загружен', wait:false, type: 'success'};
		const errorAlert = {message: 'Ошибка при загрузке графика', wait:false, type: 'danger'};

		//console.log(toSave);
		let getSched = mySched? {start:_from, finish:_to} : {user_id:u_id ,start:_from, finish:_to}

		request('getSchedule',getSched,"get", overlayAlert, successAlert, errorAlert).then(res=>{
			//console.log(res.data);
			res.data.map((e)=>{
				e.free_pairs = JSON.parse(e.free_pairs);
				return e
			})
			for (let i = 0; i < res.data.length; i++){
				const id = this.dateToId(res.data[i].date);
				if (id >= 0 && id < this.numDays){
					for (let j = 0; j < this.lpd; j++){
						//console.log(res.data[i].free_pairs[j]);
						this.schedule.table[j][id] = res.data[i].free_pairs[j];
					}
				}
			}
			this.emit('change');
		});
	

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
		let params = {schedule:JSON.stringify({'days': toSave, 'school_id':this.schoolID})};
		if (!this.mySched) params.user_id = this.my_id;
		request('setSchedule', params, "post", overlayAlert, successAlert, errorAlert).then(res=>{console.log(res)});
	
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