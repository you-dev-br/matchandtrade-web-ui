export class TradeResult {
  tradeId: number;
  tradeName: string;
  totalOfItems: number;
  totalOfTradedItems: number;
  totalOfNotTradedItems: number;
  tradedItems: Array<TradedItem>;
}


export class TradedItem {
  userId: number;
  userName: string;
  itemId: number;
  itemName: string;
  receivingUserId: number;
  receivingUserName: string;
  receivingItemId: number;
  receivingItemName: string;
  sendingUserId: number;
  sendingUserName: string;
} 