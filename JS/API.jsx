import axios from 'axios';
import properties from './settings.jsx';
import queryString from 'query-string';

//requests from API/$url.php, sending $data, using $method
//returns a promise, wich returns the response  
export default function request (url, data={}, method='get') {
	url = properties.location+'/API/' + url + '.php';
		
	let config = {
			method : method,
		url : url,
			data : data,
			transformRequest:[(data)=>queryString.stringify(data)]//FIXME!!!
	}

	if (method === 'get'){
		config['params'] = data;
	} 
	//console.log(config);
	return axios(config);
}