import React from 'react';
import DragLayer from 'react-dnd/lib/DragLayer';
import Class from './class.jsx';
import classStore from '../stores/classStore.jsx';

function collect (monitor) {
    var item = monitor.getItem();
    return {
        id: item && item.id,
        name: item && item.name,
        currentOffset: monitor.getSourceClientOffset(),
        isDragging: monitor.isDragging()
    };
}

function getItemStyles (currentOffset) {
    if (!currentOffset) {
        return {
            display: 'none'
        };
    }

    // http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
    var x = currentOffset.x;
    var y = currentOffset.y + document.body.scrollTop;
    var transform = `translate(${x}px, ${y}px)`;

    return {
        pointerEvents: 'none',
        transform: transform,
        WebkitTransform: transform
    };
}

export class ItemPreview  extends( React.Component) {

    constructor(props){
        super(props);
        this.state={};
    }

    render(){
        const {id, isDragging, currentOffset} = this.props;

        if (!isDragging) {
            return <div> </div>;
        }
        const c = classStore.getClassByID(id);
        return (
            <div
                className="preview"
                style={getItemStyles(currentOffset)}
            >
                <div className="preview-class-wrapper class-box">
                    <Class name={c.name} id={c.id} color={c.color} teacher={c.teacher} grade={c.grade}/>
                </div>
            </div>
        );
    }
}

export default DragLayer(collect)(ItemPreview);