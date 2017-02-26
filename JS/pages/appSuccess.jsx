import React from "react";
import {Col} from 'react-bootstrap';


export default class Home extends(React.Component){
	

	render(){
		return(
			<Col md={10} xs={10}>
				<h1>Аккаунт успешно подтверждён</h1>
				<p>Теперь вы можете войти на сайт</p>
			</Col>
			);
	}
}
