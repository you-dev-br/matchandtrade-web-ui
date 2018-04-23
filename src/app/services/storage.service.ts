import { Injectable } from '@angular/core';
import { Authentication } from '../classes/pojo/authentication';
import { Message, MessageType } from '../components/message/message';
import { StorableMessage } from '../components/message/storable-message';
import { isNumber } from 'util';


enum LocalStorageKey {
	AUTHENTICATION_TOKEN='AUTHENTICATION_TOKEN',
	AUTHENTICATION='AUTHENTICATION',
	LAST_ITEM_MATCHER_LIST_PAGE='LAST_ITEM_MATCHER_LIST_PAGE',
	NAVIGATION_MESSAGE='NAVIGATION_MESSAGE',
}

@Injectable()	
export class StorageService {

	message: Message = new Message();

	constructor() { }

	getAuthentication(): Authentication {
		const authenticationAsString = localStorage.getItem(LocalStorageKey.AUTHENTICATION);
		return JSON.parse(authenticationAsString);
	}

	removeAuthentication(): void {
		localStorage.removeItem(LocalStorageKey.AUTHENTICATION);
	}
	
	removeLastItemMatcherListPage(): number {
		const storedItem: string = localStorage.getItem(LocalStorageKey.LAST_ITEM_MATCHER_LIST_PAGE);
		localStorage.removeItem(LocalStorageKey.LAST_ITEM_MATCHER_LIST_PAGE);
		const storedItemParsed = Number.parseInt(storedItem);
		if (Number.isInteger(storedItemParsed)) {
			return storedItemParsed;
		}
		return null;
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

	setAuthentication(authentication: Authentication): void {
		localStorage.setItem(LocalStorageKey.AUTHENTICATION, JSON.stringify(authentication));
	}

	setLastItemMatcherListPage(pageNumber: number) {
		if (pageNumber) {
			localStorage.setItem(LocalStorageKey.LAST_ITEM_MATCHER_LIST_PAGE, pageNumber.toString());
		}
	}

	setNavigationMessage(msg: any): void {
		const parsedMessage = this.message.parseMessage(msg);
		const valueToBeStored = new StorableMessage();
		valueToBeStored.text = parsedMessage;
		valueToBeStored.type = MessageType.INFO;
		localStorage.setItem(LocalStorageKey.NAVIGATION_MESSAGE, JSON.stringify(valueToBeStored));
	}
	
}
