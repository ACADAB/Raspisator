import * as ClassActions from '../actions/classActions.jsx';
import classStore from "../stores/classStore.jsx";



const cardSource = {
	canDrag(props){
		return !props.notDraggable
	},
	beginDrag(props) {
		ClassActions.startEditMode(props.subjected ?props.db_id : props.id, props.subjected);
		return {
	      id: props.id,
	      subjected: props.subjected,
	      index: props.index,
	    };
 	},
 	endDrag(props) {
 		classStore.stopEditing();
 	}
};

export default cardSource;
