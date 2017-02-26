import { EventEmitter} from "events";

import dispatcher from '../dispatcher.jsx';
import request  from '../API.jsx';


function selectionLikeDict (selection, dict) {
	let res = {};
	for (let id in dict){
		res[id] = false;
	}
	selection.forEach((t)=>{
		res[t] = true;
	});
	return res;
}

class SchoolStore extends EventEmitter{
	constructor(){
		super();
		this.init = this.init.bind(this);
		this.init(-1);
	}

	init(id){
		this.schoolID = id;
		this.setMaxListeners(100);
		this.lessons = {};
		this.school = {school:[{name:'',lessons_per_day:0}], grades:{}, subjects:{}, teachers:{}};
		this.loading = 0;
		this.maxLessonID = 0;
		this.added = [];
		this.removed = [];
		this.selection = {teachers:[], subjects:[], grades:[]};
		if (this.schoolID != -1){
			this.loadSchoolData();
			this.loadAllLessons();
		}
	}

	loaded(){
		if (this.loading > 0) this.loading--;
		if (this.loading == 0) {
			this.emit('change');
		}
	}

	loadSchoolData(){
		this.loading+=1;
		return request('getSchoolData', {'school_id':this.schoolID}).then(res=>{
			this.school = res.data;
			this.loaded();
		}, (e)=>{console.log(e)})
	}

	loadAllLessons(){
		this.loading+=1;
		return request('getSchoolLessons', {'school_id':this.schoolID}).then(res=>{	
			const dataLen = res.data.length;
			console.log(res);
			this.lessons = {};
			let maxID = 0;
			for (let i =0; i< dataLen; i++){
				maxID = Math.max(maxID, parseInt(res.data[i].id));
				this.lessons[parseInt(res.data[i].id)] = {
					grade :  res.data[i].grade_id,//res.data[i].grade_number + res.data[i].grade_name,
					name : res.data[i].subject_id,//res.data[i].lesson_name,
					teacher : res.data[i].teacher_id,//res.data[i].name
				};
			}
			this.maxLessonID = maxID;
			this.loaded();
			return this.lessons;
		}, (e)=>{console.log(e)});
	}

	getGradeSelection(){
		const len = this.selection.teachers.length * this.selection.subjects.length;
		if (len == 0) return [];
		let teachers = selectionLikeDict(this.selection.teachers,this.school.teachers);
		let subjects = selectionLikeDict(this.selection.subjects,this.school.subjects);
		let grades = selectionLikeDict([],this.school.grades);
		let removed = selectionLikeDict(this.removed,this.lessons);

		for (let l_id in this.lessons){
			const lesson = this.lessons[l_id];
			if (teachers[lesson.teacher] && subjects[lesson.name] && !removed[l_id])
				grades[lesson.grade]++;
		}
		let res = [];
		
		for (let id in grades){
			if(grades[id] == len) res.push(id);
		}
		return res;
	}

	addLessonIfNot(teacher, subject, grade){
		console.log('adding');
		let ind = -1;
		this.removed.forEach( (e, index) => {
			const lesson = this.lessons[e];
			if (lesson.teacher == teacher && lesson.name == subject && lesson.grade == grade)
				ind = index;
		});
		if (ind != -1) {
			this.removed.splice(ind,1);
			return;
		}

		for (let id in this.lessons){
			const lesson = this.lessons[id];
			if (lesson.teacher == teacher && lesson.name == subject && lesson.grade == grade)
				ind = id;
		}

		if (ind != -1) {
			return;
		}

		const les = {grade:grade, name:subject, teacher:teacher};
		this.maxLessonID++;
		this.lessons[this.maxLessonID] = les;
		this.added.push(this.maxLessonID);
	}

	removeLessonIfNot(teacher, subject, grade){
		let ind = -1;
		this.removed.forEach( (e, index) => {
			const lesson = this.lessons[e];
			if (lesson.teacher == teacher && lesson.name == subject && lesson.grade == grade)
				ind = index;
		});
		if (ind != -1) {
			return;
		}

		for (let id in this.lessons){
			const lesson = this.lessons[id];
			if (lesson.teacher == teacher && lesson.name == subject && lesson.grade == grade)
				ind = id;
		}

		if (ind != -1) {
			this.removed.push(ind);
			return;
		}
	}

	fixLessons(_next){
		let teachers = selectionLikeDict(this.selection.teachers,this.school.teachers);
		let subjects = selectionLikeDict(this.selection.subjects,this.school.subjects);

		const now = selectionLikeDict( this.selection.grades, this.school.grades);
		let next = selectionLikeDict( _next , this.school.grades);
		for (let id in now){
			console.log(next[id] , now[id])
			if (next[id] && !now[id]){
				console.log(this.selection);
				this.selection.teachers.forEach( (t)=>{
					this.selection.subjects.forEach( (s)=> {
						this.addLessonIfNot(t,s,id);
					});
				});
			} else if( !next[id] && now[id] ){
				this.selection.teachers.forEach( (t)=>{
					this.selection.subjects.forEach( (s)=> {
						this.removeLessonIfNot(t,s,id);
					});
				});
			}
		}
		this.selection.grades = _next;
	};

	setSelection(type, selection){
		if (type === 'grades') {
			this.fixLessons(selection);
		} else {
			this.selection[type] = selection;
			this.selection.grades = this.getGradeSelection();
		}
		this.emit('change');
	}

	addSubject(name){
		const overlayAlert = {message: 'Добавление урока', wait:true, type: 'warning'};
		const successAlert = {message: 'Урок добавлен', wait:false, type: 'success'};
		const errorAlert = {message: 'Ошибка при добавлении', wait:false, type: 'danger'};
		
		request('addSubject', {school_id:this.schoolID, name:name},'post',overlayAlert,successAlert, errorAlert).then((res)=>{
			this.school.subjects[res.data.id] = {id:res.data.id, name:name};
			this.emit('change');
		});

	}

	addGrade(name, number){
		const overlayAlert = {message: 'Добавление класса', wait:true, type: 'warning'};
		const successAlert = {message: 'Класс добавлен', wait:false, type: 'success'};
		const errorAlert = {message: 'Ошибка при добавлении', wait:false, type: 'danger'};
		
		request('addGrade', {school_id:this.schoolID, name:name, number:number},'post',overlayAlert,successAlert, errorAlert).then((res)=>{
			console.log(res);
			this.school.grades[res.data.id] = {id:res.data.id, grade_name:name, grade_number:number};
			this.emit('change');
		});

	}

	save(){
		const news = this.added.filter((e=>this.removed.indexOf(e) == -1));
		const rems = this.removed.filter((e=>this.added.indexOf(e) == -1));
		console.log(news,rems, this.added, this.removed);
		news.forEach((e,ind)=> {
			console.log(e);
			const les = this.lessons[e];
			request('addLesson', {school_id:this.schoolID, subject_id:les.name, teacher_id:les.teacher, grade_id:les.grade},'post').then((res)=>{
				console.log(res);
			}).catch(e=>console.log(e));
		});	
		rems.forEach((e,ind)=> {
			request('deleteLesson', {lesson_id:e},'post');
		});	
		this.init(this.schoolID);
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

const schoolStore = new SchoolStore; 

dispatcher.register(schoolStore.handleActions.bind(schoolStore));

window.schoolStore = schoolStore;

export default schoolStore;