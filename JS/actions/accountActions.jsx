import dispatcher from '../dispatcher.jsx';

export function login(data){
	console.log('Loginn');
	dispatcher.dispatch({
		type: 'LOGIN',
		data: data 
	});
} 

export function logout(){
	dispatcher.dispatch({
		type: 'LOGOUT',
	});
} 