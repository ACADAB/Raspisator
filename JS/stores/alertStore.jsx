import { EventEmitter} from "events";

import dispatcher from '../dispatcher.jsx';


class AlertStore extends EventEmitter{
	constructor(){
		super();
		this.alerts = [];//[{message:'Привет, Дмитрий!', wait:true, type:'danger'}]
	}

	addAlert(a){
		this.alerts.push(a);
		const id = this.alerts.length-1;
		this.emit('change');
		return id;
	}

	removeAlert(a){
		this.alerts = this.alerts.filter((al)=>{return a!==al});
		this.emit('change');
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

const alertStore = new AlertStore; 

dispatcher.register(alertStore.handleActions.bind(alertStore));

export default alertStore;