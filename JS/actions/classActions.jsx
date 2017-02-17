import dispatcher from '../dispatcher.jsx';

export function swapByIndex(i1,i2, stopEdit = true){
	dispatcher.dispatch({
		type: 'SWAP_UNUSED_CLASS_BY_INDEX',
		i1: i1,
		i2: i2
	});
	if (stopEdit)
		dispatcher.dispatch({
			type: 'STOP_EDITING'
		});
} 

export function swapByID(i2){
	dispatcher.dispatch({
		type: 'SWAP_CLASS_BY_ID',
		i2: i2
	});
	dispatcher.dispatch({
		type: 'STOP_EDITING'
	});
} 

export function setUsed(x,y){
	dispatcher.dispatch({
		type: 'MOVE_TO_USED',
		x: x,
		y: y
	});
	dispatcher.dispatch({
		type: 'STOP_EDITING'
	});
} 

export function setUnused(id){
	dispatcher.dispatch({
		type: 'MOVE_TO_UNUSED',
		id: id
	});
	dispatcher.dispatch({
		type: 'STOP_EDITING'
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

export function startEditMode(id, subjected = false){
	dispatcher.dispatch({
		id:id,
		subjected: subjected,
		type: 'START_EDITING'
	});
} 

export function stopEditMode(){
	dispatcher.dispatch({
		type: 'STOP_EDITING'
	});
} 

