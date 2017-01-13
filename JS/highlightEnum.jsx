//the bigger the number - the more verbose is the highlight

export const NORMAL = 0;
export const UNAVAILABLE = 1;
export const CURRENT = 2;
export const OVER = 3
export const CONFLICT = 4;
export const toColor = {
	0:"",
	1:"grey",
	4:"red",
	2:"green"
};

export class Highlight{
	constructor(...highlights){
		this.highlights = highlights;
		this.highlights.push(NORMAL);
	}

	highlight(h){
		if (!this.hasHighlight(h))
			this.highlights.push(h);
	}

	removeHighlight(...a){
		this.highlights.filterInPlace(e=>!a.includes(e)); 
		
	}

	hasHighlight(h){
		return this.highlights.includes(h);
	}

	getMostVerbose(){
		return Math.max.apply(Math,this.highlights);
	}
}