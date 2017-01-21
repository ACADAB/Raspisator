import { EventEmitter} from "events";

import dispatcher from '../dispatcher.jsx';
import request from '../API.jsx';

import { hashHistory } from 'react-router';


class AccountStore extends EventEmitter{
	constructor(){
		super();
		this.setGuest();
	}

	setGuest(){
		this.account = {
			name: 'Guest',
			isLoggedIn: false
		};
		this.emit('change');
	}

	setAccountFromResponse(res){
		this.account.isLoggedIn = res.data.isLoggedin;
		this.account.name = this.account.isLoggedIn?res.data.name : 'Guest' ;
		this.emit('change');
	}

	updateAccount(){
		request('isLoggedIn').then(res=>{
			this.setAccountFromResponse(res);
		})
	}

	redirectToLogin(){
		this.redirect('login');
	}

	redirectToIndex(){
		this.redirect('projects');
	}

	redirect(to){
		hashHistory.push(to);
	}

	setAccount(account){
		this.account = account;
		this.emit('change');
	}

	getAccount(){
		return this.account;
	}

	handleActions(action){

		switch (action.type) {
			case "LOGIN":
				request('login', action.data, 'post').then(res=>{
					this.setAccountFromResponse(res);
					this.redirectToIndex();
				}).catch(this.setGuest());
				break;
			case "LOGOUT":
				request('logout').then(res=>{
					this.setGuest();
					this.redirectToLogin();
				});
				break;
			default:
				// statements_def
				break;
		}
	}
}

const accountStore = new AccountStore; 

dispatcher.register(accountStore.handleActions.bind(accountStore));

export default accountStore;