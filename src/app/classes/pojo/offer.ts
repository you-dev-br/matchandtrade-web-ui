export class Offer {
  offerId: number;
  offeredItemId: number;
  wantedItemId: number;
  
  constructor(offeredItemId: number, wantedItemId: number, offerId?: number) {
    this.offeredItemId = offeredItemId;
    this.wantedItemId = wantedItemId;
    this.offerId = offerId;
  }
}
