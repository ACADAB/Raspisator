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