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
			{
				id: 3,
				name:"Биология",
				teacher:"Таня",
				grade:"6"
			},
			{
				id: 4,
				name:"Алгебра",
				teacher:"ИЕ",
				grade:"8"
			},
			{
				id: 5,
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
		const minInd = Math.min(ind1,ind2);
		const maxInd = Math.max(ind1,ind2);
		if (maxInd-minInd > 1){
			if (ind1 < ind2){

				const tmp = this.unused[minInd];
				for (let i =minInd+1; i<=maxInd; i+=1 ){
					this.unused[i-1] = this.unused[i]
				}
				this.unused[maxInd] = tmp; 
			} else {
				const tmp = this.unused[maxInd];
				for (let i =maxInd-1; i>=minInd; i-=1 ){
					this.unused[i+1] = this.unused[i]
				}
				this.unused[minInd] = tmp; 
			}
		} else {

			const tmp = this.unused[minInd];
			this.unused[minInd] = this.unused[maxInd];
			
			this.unused[maxInd] = tmp;
		}
		
				console.log(minInd,maxInd);
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