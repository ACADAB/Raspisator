import React from "react";
import {Col} from 'react-bootstrap';


export default class Home extends(React.Component){
	

	render(){
		return(
			<Col md={10} xs={10}>
				<h1> Мы помогаем создавать школьное расписание</h1>
				<p> Проект Емельяненко Дмитрия, Андреевой Марии и Белгородова Григория </p>
			</Col>
			);
	}
}
