import axios from 'axios';
import properties from './settings.jsx';


//requests from API/$url.php, sending $data, using $method
//returns a promise, wich returns the response  
export default function request (url, data={}, method='get') {
	url = properties.location+'/API/' + url + '.php';
		
	let config = {
			method : method,
		url : url,
			data : data
	}

	if (method === 'get'){
		config['params'] = data;
		}
	return axios(config);
}