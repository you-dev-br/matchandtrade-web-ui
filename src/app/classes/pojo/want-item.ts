export class WantItem {
  itemId: number = null;
  priority: number = null;

  constructor(itemId: number, priority: number) {
    this.itemId = itemId;
    this.priority = priority;
  }
}
