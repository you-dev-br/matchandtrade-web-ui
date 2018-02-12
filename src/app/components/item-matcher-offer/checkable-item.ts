import {Item} from '../../classes/pojo/item';

export class CheckableItem extends Item {
  checked: boolean = false;
  
  checkedAttribute() {
    return (this.checked ? true : null);
  }

}
