import React from "react";
import {Col} from 'react-bootstrap';


export default class Home extends(React.Component){
	

	render(){
		return(
			<Col md={10} xs={10}>
				<h1> Вы успешно зарегистрированны</h1>
				<p> На указанную вами почту придёт письмо. Перейдите по ссылке из этого письма, чтобы завершить регистрацию вашкго аккаунта </p>
			</Col>
			);
	}
}
