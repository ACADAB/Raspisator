import { EventEmitter} from "events";
import * as Highlight from "../highlightEnum.jsx";
import dispatcher from '../dispatcher.jsx';

import request from '../API.jsx';

window.hig = Highlight

//generates a matrix, filled with -1 of size x*y
function getEmptyTable(x,y, val = -1){
	var a = [], b;
	while (a.push(b = []) <= x) while (b.push((typeof(val))=="function"? val() : val) < y);
	a.pop();
	return {width : x, height : y, table : a}
}

class ClassStore extends EventEmitter{
	constructor(){
		super();
		this.projectID = -1;

		this.initEmptyProj = this.initEmptyProj.bind(this);

		this.editing = false;
		this.editingID = -1;

		this.setable = true;

		this.setMaxListeners(100);
		this.save = this.save.bind(this);

		this.initEmptyProj();
		this.startEditing = this.startEditing.bind(this);
		this.stopEditing = this.stopEditing.bind(this);

		document.addEventListener('click', (e)=>{
			if (!e.target.classList.contains("class-box") && !e.target.parentNode.classList.contains("class-box") && this.editing)

			this.stopEditing();
		});

	}

	initEmptyProj(){
		

		this.unused = [];
		this.used = [];
		this.classPosition = {};

		this.maxID = -1; 
		this.schoolID = -1;

		let grades = [];

		for (let id in this.projectLessons){
			grades.push(this.projectLessons[id].grade);
		}

		grades = grades.getUnique();
		grades.sort();

		this.colClasses = grades;


		this.table = getEmptyTable(6,this.colClasses.length);

		this.school = {grades:{}, subjects:{}, teachers:{}}
		this.refreshStoppingHighlight(false);

	}


	getGrades(){
		return this.colClasses;
	}

	getAvailableLessons(){
		return this.projectLessons;
	}

	getGradeName(id, delim=''){
		const grade = this.school.grades[id];
		return grade.grade_number+delim+ grade.grade_name;
	}

	loadProject(project_id){

		this.projectLessons = {};

		return this.loadLessons(project_id).then(
			()=>request('getProject', {'project_id':project_id, 'return_school_data':true})).then(res=>{	

			this.initEmptyProj();
			this.projectID = project_id;
			
			this.school = res.data.school;

			console.log('resp ',res.data)
			if ((''+res.data.project.project_data).toLowerCase() == 'null') {
				this.emit('change');
				console.log('null data');
				return;
			}
			this.schoolID = res.data.project.school_id;
			const data = JSON.parse(res.data.project.project_data);
			const usedLen = data.lessons.filter((lesson)=>lesson.isUsed).length;

			this.project_name = res.data.project_name;
			this.unused = Array(data.lessons.length - usedLen);
			this.used = Array(usedLen);
			this.colClasses = data.grades;
			this.refreshStoppingHighlight(false);
			

			this.table = data.table;


			const dataLen = data.lessons.length;
			this.maxID = dataLen-1;
			for (let i =0; i< dataLen; i++){

				const resLesson = data.lessons[i];
				

				const projLesson = this.projectLessons[resLesson.db_id];

				const lesson = {
					id: i,
					db_id: resLesson.db_id,
					grade: projLesson.grade,
					name: projLesson.name,
					teacher: projLesson.teacher,
					color: resLesson.color
				}

				this.setClassByPos(resLesson,lesson,false);
				this.classPosition[i] = {
					isUsed : resLesson.isUsed,
					index : resLesson.index,
					x : resLesson.x,
					y : resLesson.y
				};
			}

			this.emit('change');
		}).catch(err=>{console.log(err);});
	}


	loadLessons(project_id){
		return request('getLessons', {'project_id':project_id}).then(res=>{	
			const dataLen = res.data.length;
			this.projectLessons = {};

			for (let i =0; i< dataLen; i++){
				this.projectLessons[parseInt(res.data[i].id)] = {
					grade :  res.data[i].grade_id,//res.data[i].grade_number + res.data[i].grade_name,
					name : res.data[i].subject_id,//res.data[i].lesson_name,
					teacher : res.data[i].teacher_id,//res.data[i].name
				};
			}
			return this.projectLessons;
		}, (e)=>{console.log(e)});
	}

	loadAllLessons(school_id){
		return request('getSchoolLessons', {'school_id':school_id}).then(res=>{	
			const dataLen = res.data.length;
			console.log(res);
			this.projectLessons = {};

			for (let i =0; i< dataLen; i++){
				this.projectLessons[parseInt(res.data[i].id)] = {
					grade :  res.data[i].grade_id,//res.data[i].grade_number + res.data[i].grade_name,
					name : res.data[i].subject_id,//res.data[i].lesson_name,
					teacher : res.data[i].teacher_id,//res.data[i].name
				};
			}
			return this.projectLessons;
		}, (e)=>{console.log(e)});
	}

	addPair(grade, name, teacher, color, db_id = -1){
		this.maxID += 1;
		this.unused.push({
			id : this.maxID,
			db_id : db_id,
			grade : grade,
			name : name,
			teacher : teacher,
			color : color
		});
		this.classPosition[this.maxID] = {isUsed : false, index : this.unused.length-1, x : -1, y : -1};		
		this.emit('change');
	}


	//now this just duplicates this.getGrades, but nay change =)
	getColNames(){
		return this.colClasses.map(id=>{
			const grade = this.school.grades[id];
			return grade.grade_number + grade.grade_name;
		});		
	}

	getLessons(used = 'unused',grade = undefined){
		let res = [];
		if (used != 'used') res = res.concat(this.unused);
		if (used != 'unused') res = res.concat(this.used);

		if (grade != undefined) res.filterInPlace((e)=>{return e.grade === grade});

		return res;
	}

	getLenUnused(){
		return this.unused.length;
	}

	setUnused(arr){
		this.unused = arr;
		this.emit('change');
	}

	refreshStoppingHighlight(change = true, rebuild = true){
		if (rebuild){
			this.stoppingHighlight = getEmptyTable(this.table.width, this.table.height, ()=>Object.freeze(new Highlight.Highlight()));
			if (this.editingID != -1){
				const curPos = this.classPosition[this.editingID];
				if (curPos.isUsed) this.stoppingHighlight.table[curPos.x][curPos.y].highlight(Highlight.CURRENT);
			}
		} else {
			for (let x=0; x < this.stoppingHighlight.width; x++){
				for (let y=0; y< this.stoppingHighlight.height; y++){
					this.stoppingHighlight.table[x][y].removeHighlight(Highlight.CONFLICT);
				}
			}
		}
		if (change) this.emit('change');
	}

	setCanDrop(x,y,isConflict, highlight){
		if (isConflict) this.stoppingHighlight.table[x][y].highlight(Highlight.UNAVAILABLE);
		const curPos = this.classPosition[this.editingID];
		if (curPos.x == x && curPos.y == y && this.editing && curPos.isUsed){

			if (curPos.isUsed) this.stoppingHighlight.table[curPos.x][curPos.y].highlight(Highlight.CURRENT);
		}
		if (highlight) this.emit('change');
		return !isConflict;
	}

	canDrop(x, y, highlight = false, rec= true, interID=-1, first=false){

		if (!highlight && !first){
			return !this.stoppingHighlight.table[x][y].hasHighlight(Highlight.UNAVAILABLE);
		}

		if (highlight) this.refreshStoppingHighlight(false, false);



		const id = interID==-1? this.editingID : interID;
		
		const lesson = this.getClassByID(id);

		let isConflict = false;

		if (this.colClasses[y] != lesson.grade){
			if (highlight)
				for (let i = 0; i< this.table.width; i++){
					this.stoppingHighlight.table[i][y].highlight(Highlight.CONFLICT);
				}
			isConflict = true;
		}
		for (let i=0; i< this.table.height; i++){
			if (i!=y && this.table.table[x][i] != -1 && id!==this.table.table[x][i] && this.getClassByID( this.table.table[x][i]).teacher == lesson.teacher){
				isConflict = true;
				if (highlight)
					this.stoppingHighlight.table[x][i].highlight(Highlight.CONFLICT);
				else 
					break;
			}
		}

		//TODO: add teacher timetable support

		if (isConflict){ 
			return this.setCanDrop(x,y,isConflict, highlight);
		}

		const targetID = this.table.table[x][y];
		const pos = this.classPosition[id];
		
		if (rec && targetID != -1 && pos.isUsed) return this.canDrop(pos.x, pos.y, false, false, id);
		return this.setCanDrop(x,y,isConflict, highlight);
	}

	save(){
		let lessons = [];
		for(let i=0; i<= this.maxID; i++){
			let lesson = this.classPosition[i];
			const classDesc = this.getClassByPos(lesson);

			lesson.db_id = classDesc.db_id;
			lesson.color = classDesc.color;

			lessons.push(lesson);
		}
		//console.log(this.maxID);
		const toSave = {
			lessons: lessons,
			table: this.table,
			grades: this.colClasses
		}
		//console.log(toSave);
		//TODO: display something if we get error or ok status.
		request('saveProject',{'data': JSON.stringify(toSave), 'project_id':this.projectID},"post").then(res=>{console.log(res)});
	}

	moveUnusedItem(from,to){
		const minInd = Math.min(from,to);
		const maxInd = Math.max(from,to);
		if (maxInd-minInd > 1){
			if (from < to){

				const tmp = this.unused[minInd];

				//this.unused.filter(()=>)

				for (let i =minInd+1; i<=maxInd; i+=1 ){
					this.unused[i-1] = this.unused[i];
					this.classPosition[this.unused[i-1].id].index = i-1;
				}
				this.unused[maxInd] = tmp; 
				this.classPosition[tmp.id].index = maxInd;
			} else {
				const tmp = this.unused[maxInd];
				for (let i =maxInd-1; i>=minInd; i-=1 ){
					this.unused[i+1] = this.unused[i];
					this.classPosition[this.unused[i+1].id].index = i+1;
				}
				this.unused[minInd] = tmp; 
				this.classPosition[tmp.id].index = minInd;
			}
		} else {

			const tmp = this.unused[minInd];
			this.unused[minInd] = this.unused[maxInd];
			this.classPosition[this.unused[minInd].id].index = minInd;

			this.unused[maxInd] = tmp;
			this.classPosition[this.unused[maxInd].id].index = maxInd;

		}
		this.emit('change');

	}

	getClassByID(id){
		return this.getClassByPos(this.classPosition[id]);
	}

	getClassByPos(pos){
		return pos.isUsed ? this.used[pos.index] : this.unused[pos.index];
	}

	setClassByPos(pos,val,emit = true){
		if (pos.isUsed){
			this.used[pos.index] = val;	
			this.table.table[pos.x][pos.y] = val.id;
		} else {
			this.unused[pos.index] = val;
		}
		if (emit){
			this.emit('change');
		}
	}
/*
	swapByPos(pos1,pos2){
		
	}
*/
	swapByID(id1,id2){
		const pos1 = this.classPosition[id1];
		const pos2 = this.classPosition[id2];
 		
 		const tmp = this.getClassByPos(pos1);

		this.setClassByPos(pos1, this.getClassByPos(pos2),false);
		this.setClassByPos(pos2, tmp,false);
		
		this.classPosition[id1] = pos2;
		this.classPosition[id2] = pos1;

		this.emit('change');
	}

	startEditing(id){
		this.editing = true;
		this.editingID = id;
		this.setable = false;

		setTimeout((()=>{this.setable = true}).bind(this), 100);
		this.refreshStoppingHighlight();

		for (let x=0; x < this.stoppingHighlight.width; x++){
			for (let y=0; y< this.stoppingHighlight.height; y++){
				this.canDrop(x,y,false,true,-1,true);
			}
		}

		this.emit("change");
	}

	stopEditing(){
		this.editing = false;
		this.editingID = -1;

		this.refreshStoppingHighlight();

		this.emit('change');
	}

	//sets class with id=id to the grid with coordinates x,y
	//supposes, that (x,y) is empty
	setUsed(id,x,y){
		const pos = this.classPosition[id];
		if (this.table.table[x][y] != -1){
			console.error('trying to set in not empty grid cell!',this.table.table[x][y]);
			return;
		}

		if (pos.isUsed){
			this.table.table[x][y] = id;
			this.table.table[pos.x][pos.y] = -1;
			this.classPosition[id].x = x;
			this.classPosition[id].y = y;
		} else {
			this.table.table[x][y] = id;
			this.classPosition[id] = {isUsed : true, index: this.used.length, x: x, y: y};
			for (let i = pos.index+1; i < this.unused.length; i++){
				this.classPosition[this.unused[i].id].index = i-1;
			}

			this.used.push(this.unused[pos.index]);
			this.unused.splice(pos.index,1);			
		}
		this.emit('change');
	}
	
	setToUnused(id){
		const pos = this.classPosition[id];

		if (pos.isUsed){
			this.table.table[pos.x][pos.y] = -1;
			this.classPosition[id] = {isUsed : false, index: this.unused.length, x: -1, y: -1};
			
			for (let i = pos.index+1; i < this.used.length; i++){
				this.classPosition[this.used[i].id].index = i-1;
			}

			this.unused.push(this.used[pos.index]);
			this.used.splice(pos.index,1);
			this.emit('change');
		}
	}

	handleActions(action){

		switch (action.type) {
			case "SWAP_UNUSED_CLASS_BY_INDEX":
				this.moveUnusedItem(action.i1, action.i2);
				break;
			case "SWAP_CLASS_BY_ID":
				this.swapByID(action.i1, action.i2);
				break;
			case "MOVE_TO_USED":
				this.setUsed(action.id, action.x,action.y);
				break;
			case "MOVE_TO_UNUSED":
				this.setToUnused(action.id);
				break;
			case "ADD_PAIR":
				this.addPair(action.grade, action.name, action.teacher, action.color, action.db_id);
				break;
			case "SAVE_PROJECT":
				this.save();
				break;
			case "START_EDITING":
				this.startEditing(action.id);
				break;
			case "STOP_EDITING":
				this.stopEditing();
				break;
			default:
				// statements_def
				break;
		}
	}
}

const classStore = new ClassStore; 

dispatcher.register(classStore.handleActions.bind(classStore));

window.classStore = classStore;

export default classStore;