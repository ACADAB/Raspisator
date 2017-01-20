import {Alert} from 'react-bootstrap';
import React from 'react';

export default function renderAlert(message){
		if (typeof(message) == "string" && message.length > 0){
			return ( 
				<div>
				<br />
					<Alert bsStyle="danger">
						<h4>Ошибка!</h4>
						<p>{message}</p>
					</Alert>
				</div>
			)
		} else return <div></div>
	}