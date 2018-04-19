import { Injectable } from '@angular/core';
import { Authentication } from '../classes/pojo/authentication';
import { Message, MessageType } from '../components/message/message';
import { StorableMessage } from '../components/message/storable-message';


enum LocalStorageKey {
	AUTHENTICATION_TOKEN='AUTHENTICATION_TOKEN',
	AUTHENTICATION='AUTHENTICATION',
	NAVIGATION_MESSAGE='NAVIGATION_MESSAGE'
}

@Injectable()	
export class StorageService {

	message: Message = new Message();

	constructor() { }

	setAuthentication(authentication: Authentication): void {
		localStorage.setItem(LocalStorageKey.AUTHENTICATION, JSON.stringify(authentication));
	}

	getAuthentication(): Authentication {
		const authenticationAsString = localStorage.getItem(LocalStorageKey.AUTHENTICATION);
		return JSON.parse(authenticationAsString);
	}

	removeAuthentication(): void {
		localStorage.removeItem(LocalStorageKey.AUTHENTICATION);
	}

	setNavigationMessage(msg: any): void {
		const parsedMessage = this.message.parseMessage(msg);
		const valueToBeStored = new StorableMessage();
		valueToBeStored.text = parsedMessage;
		valueToBeStored.type = MessageType.INFO;
		localStorage.setItem(LocalStorageKey.NAVIGATION_MESSAGE, JSON.stringify(valueToBeStored));
	}
	
	removeNavigationMessage(): StorableMessage {
		const storedMessage = localStorage.getItem(LocalStorageKey.NAVIGATION_MESSAGE);
		localStorage.removeItem(LocalStorageKey.NAVIGATION_MESSAGE);
		if (storedMessage) {
			return JSON.parse(storedMessage);
		} else {
			return null;
		}
	}
}
