
import axios from 'axios';
import properties from './settings.jsx';

module.exports = {
	request : function  (url, data={}, method='get') {
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
}