import { EventEmitter} from "events";

import dispatcher from '../dispatcher.jsx';


class ClassStore extends EventEmitter{
	constructor(){
		super();
		this.unused = [
			{
				id: 0,
				name:"Биология",
				teacher:"Азамат",
				grade:"6"
			},
			{
				id: 1,
				name:"Физика",
				teacher:"Гриц",
				grade:"8"
			},
			{
				id: 2,
				name:"Физика",
				teacher:"ЮН",
				grade:"11"
			},
		];
	}

	getUnused(){
		return this.unused;
	}

	getLenUnused(){
		return this.unused.length;
	}

	setUnused(arr){
		this.unused = arr;
		this.emit('change');
	}

	swapUnusedItems(ind1,ind2){
		const tmp = this.unused[ind1];
		this.unused[ind1] = this.unused[ind2];
		this.unused[ind2] = tmp;
		this.emit('change');
	}

	handleActions(action){

		switch (action.type) {
			case "MOVE_CLASS":
				this.swapUnusedItems(action.i1, action.i2);
				break;
			default:
				// statements_def
				break;
		}
	}
}

const classStore = new ClassStore; 

dispatcher.register(classStore.handleActions.bind(classStore));

export default classStore;