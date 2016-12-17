import dispatcher from '../dispatcher.jsx';

export function swapByIndex(i1,i2){
	dispatcher.dispatch({
		type: 'SWAP_UNUSED_CLASS_BY_INDEX',
		i1: i1,
		i2: i2
	});
} 

export function swapByID(i1,i2){
	dispatcher.dispatch({
		type: 'SWAP_CLASS_BY_ID',
		i1: i1,
		i2: i2
	});
} 

export function setUsed(id,x,y){
	dispatcher.dispatch({
		type: 'MOVE_TO_USED',
		id: id,
		x: x,
		y: y
	});
} 

export function setUnused(id){
	dispatcher.dispatch({
		type: 'MOVE_TO_UNUSED',
		id: id
	});
} 

export function addPair(grade, name, teacher, color, db_id = -1){
	dispatcher.dispatch({
		type: 'ADD_PAIR',
		grade: grade,
		name: name,
		teacher: teacher,
		color: color,
		db_id: db_id
	});
} 

export function save(){
	dispatcher.dispatch({
		type: 'SAVE_PROJECT'
	});
} 