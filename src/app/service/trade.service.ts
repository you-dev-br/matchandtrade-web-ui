import { Injectable } from '@angular/core';

import { Trade } from '../pojo/trade';

@Injectable({
  providedIn: 'root'
})
export class TradeService {

	find(tradeId: number): Trade {
		return {name: "Board games in Toronto - Summer 2018", description: "Location: 401 Games\nSubmission Starts: 10/10/2018\nSubmission Ends: 20/10/2018"}
	}

	findAll(): Trade[] {
		return [
				{name: 'first', description: 'First trade'},
				{name: 'second', description: 'Second trade'},
				{name: 'Three', description: 'Third trade'},
				{name: '4th', description: 'Fourth trade'},
			];
	}
}
