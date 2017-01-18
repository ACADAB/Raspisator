import React from "react";
import * as ClassActions from '../actions/classActions.jsx';
import classStore from '../stores/classStore.jsx';
import {Modal, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import FormData from 'react-form-data';
import Class from './class.jsx';


const defClass = {
            bd_id: -1,
            color: 'red',
        };


export default class AddPair extends(React.Component){
    constructor(props){
        super(props);
        this.state = { showModal: false };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.rerender = this.rerender.bind(this);
        this.makePair = this.makePair.bind(this);

        this.formData = Object.create(defClass);
        this.updateFormData = FormData.updateFormData.bind(this);
        this.setFormData = FormData.setFormData.bind(this);

    }


    rerender(){
        this.setState(this.state);
    }

    close() {
        this.setState({ showModal: false });
        this.formData = Object.create(defClass);
    }

    open() {
        this.setState({ showModal: true });
    }

    componentWillMount(){
        console.log('willmount!!!!',defClass);
        this.formData = Object.create(defClass);
    }

    makePair(e){
        const {bd_id, color} = this.formData;
        if (bd_id != -1){
            const {grade, name, teacher} = classStore.getAvailableLessons()[bd_id];
            ClassActions.addPair(grade, name, teacher,color,bd_id);
        }
        this.close();
        e.preventDefault();
        return false;
    }

    render(){
        const lessons_arr = classStore.getAvailableLessons();
        const {bd_id, color} = this.formData;
        let lessons = [];

        let isFirst = true;
        let def = "";
        for (let id in lessons_arr){
            //console.log(id);
            if (isFirst) def = id;
            lessons.push(
                    <option value={id} key={id}>
                        {lessons_arr[id].name},
                        {lessons_arr[id].grade},
                        {lessons_arr[id].teacher}
                    </option>
                )
            isFirst = false;
        }

        return (
            <div>
                <Button
                  bsStyle="primary"
                  onClick={this.open}
                  block
                >
                    Add Lesson
                </Button>   
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Lesson</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.makePair} onChange={(e)=>{this.updateFormData(e); this.rerender()}}>
                            <FormGroup>
                                <ControlLabel>Урок</ControlLabel>
                                <FormControl componentClass="select" defaultValue={def} name="bd_id" required>
                                    {lessons}
                                </FormControl>
                                <ControlLabel>Цвет</ControlLabel>
                                <FormControl componentClass="select" defaultValue="red" name="color" required>
                                    <option value='red'>Красный</option>
                                    <option value='yellow'>Жёлтый</option>
                                    <option value='blue'>Синий</option>
                                </FormControl>
                                <Button type='submit'> OK </Button>
                            </FormGroup>
                            {bd_id != -1 && <Class notDraggable color={color} db_id={bd_id}/>}
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <br/>
            </div>
        );
    }
}

/*

const defClass = {
            grade: '8E',
            name: '',
            teacher: '',
            color: 'red',
        };
export default class AddPair extends(React.Component){
    constructor(props){
        super(props);
        this.state = { showModal: false };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.rerender = this.rerender.bind(this);
        this.makePair = this.makePair.bind(this);

        this.formData = defClass;
        this.updateFormData = FormData.updateFormData.bind(this);
        this.setFormData = FormData.setFormData.bind(this);

    }


    rerender(){
        this.setState(this.state);
    }

    close() {
        this.setState({ showModal: false });
        this.formData = defClass;
    }

    open() {
        this.setState({ showModal: true });
    }

    makePair(e){
        const {grade, name, teacher, color} = this.formData;
        ClassActions.addPair(grade, name, teacher,color);
        this.close();
        e.preventDefault();
        return false;
    }

    render(){
        const grades_arr = classStore.getGrades();
        const {grade, name, teacher, color} = this.formData;
        let grades = grades_arr.map((grade,index) => 
            <option value={grade} key={index}>{grade}</option>
            )
        return (
            <div>
                <Button
                  bsStyle="primary"
                  onClick={this.open}
                  block
                >
                    Add Lesson
                </Button>	
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Lesson</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.makePair} onChange={(e)=>{this.updateFormData(e); this.rerender()}}>
                            <FormGroup>
                                <ControlLabel>Класс</ControlLabel>
                                <FormControl componentClass="select" name="grade">
                                    {grades}
                                </FormControl>
                                <ControlLabel>Преподаватель</ControlLabel>
                                <FormControl required type='text' name='teacher' />
                                <ControlLabel>Предмет</ControlLabel>
                                <FormControl required type='text' name='name' />
                                <ControlLabel>Цвет</ControlLabel>
                                <FormControl componentClass="select" name="color">
                                    <option value='red'>Красный</option>
                                    <option value='yellow'>Жёлтый</option>
                                    <option value='blue'>Синий</option>
                                </FormControl>
                                <Button type='submit'> OK </Button>
                            </FormGroup>
                            <Class notDraggable name={name} color={color} teacher={teacher} grade={grade}/>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <br/>
            </div>
    	);
    }
}
*/