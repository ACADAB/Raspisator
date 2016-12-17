import axios from 'axios';
import queryString from 'query-string';

//requests from API/$url.php, sending $data, using $method
//returns a promise, wich returns the response  

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

export default function request (url, data={}, method='get') {
	let path = document.location.pathname;

	path = path.split('/');
	if (path[path.length-1].indexOf('index.php') >= 0) path.remove(-1);
	path = path.reduce((l,r) => l+'/'+r);

	url = path +'/API/' + url + '.php';

	method = method.toLowerCase();
		
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