import axios from 'axios';
import queryString from 'query-string';
import alertStore from './stores/alertStore.jsx';
//requests from API/$url.php, sending $data, using $method
//returns a promise, wich returns the response  

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

export default function request (url, data={}, method='get', a = undefined, success_a = undefined, error_a = undefined) {
	let path = document.location.pathname;

	if (a !== undefined)
		alertStore.addAlert(a);

	path = path.split('/');
	if (path[path.length-1].indexOf('index.php') >= 0) path.remove(-1);
	path = path.reduce((l,r) => l+'/'+r);
	if (path == '/') path = '';
	url =document.location.origin + path +'/API/' + url + '.php';
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


	const res = axios(config);

	if (a!==undefined){
		return res.then((resp)=>{
				alertStore.removeAlert(a);
				alertStore.addAlert(success_a);
				return resp;
			}, (resp)=>{
				alertStore.removeAlert(a);
				alertStore.addAlert(error_a);
				return resp; 
			})
	} else 
		return res;
}