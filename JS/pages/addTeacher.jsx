import React from "react";

import schoolStore from '../stores/schoolStore.jsx';
import {Modal, Form, Button, RadioGroup, Radio,  FormGroup, FormControl, ControlLabel,Glyphicon} from 'react-bootstrap';
import FormData from 'react-form-data';

import request from '../API.jsx';

import ScrollArea from 'react-scrollbar';

import SearchInput, {createFilter} from 'react-search-input'
const KEYS_TO_FILTERS = ['user_name', 'user_email', 'name'];

const defClass = {
            id:"",
        };


export default class AddTeacher extends(React.Component){
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
        
        this.searchUpdated = this.searchUpdated.bind(this);
        
        this.users = [];
        this.term = '';
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
        this.formData = Object.create(defClass);
        request('allUsers').then((res)=>{
            this.users = res.data;
            this.forceUpdate();
        })
    }

    makePair(e){
        const {id} = this.formData;
        const name = this.users.filter((u)=>{
            return u.user_id == id;
        })[0].name;
        if (id != ''){
            schoolStore.addTeacher(id,name);
        }
        this.close();
        e.preventDefault();
        return false;
    }

    searchUpdated(term){
        this.term = term;
        this.forceUpdate();
    }

    render(){

        const radios = this.users.filter(createFilter(this.term, KEYS_TO_FILTERS)).map((u)=>{
            return <Radio key={u.user_id} name="id" value={u.user_id}>{u.name}</Radio>
        });

        return (
            <div className='add-btn-wrapper'>
                <Glyphicon className="add-btn" onClick={this.open} glyph="plus"/> 
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Добавить Учителя</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.makePair} onChange={(e)=>{this.updateFormData(e); this.rerender()}}>
                            <FormGroup>
                                <ControlLabel>Учитель</ControlLabel>
                                <SearchInput className="search-input" onChange={this.searchUpdated} />
                                <ScrollArea  horizontal={false} speed={0.8} smoothScrolling={true} className='users-list-wrapper'>
                                    {radios}
                                </ScrollArea>
                                <Button type='submit'> OK </Button>
                            </FormGroup>
                        </Form>
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