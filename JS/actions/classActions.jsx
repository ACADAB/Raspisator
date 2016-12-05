import dispatcher from '../dispatcher.jsx';

export function swap(i1,i2){
	dispatcher.dispatch({
		type: 'MOVE_CLASS',
		i1: i1,
		i2: i2
	});
} 