import React from "react";
import {Col} from 'react-bootstrap';


export default class Home extends(React.Component){
	

	render(){
		return(
			<Col md={10} xs={10}>
				<h1>Ошибка при подтверждении аккаунта</h1>
				<p>Попробуйте зарегистрироваться заново</p>
			</Col>
			);
	}
}
