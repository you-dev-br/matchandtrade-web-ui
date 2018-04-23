import {Item} from '../../classes/pojo/item';

export class CheckableItem extends Item {
  private _checked: boolean = false;
  
  public checked() {
    return (this._checked ? true : false);
  }

  public setChecked(checked: boolean): void {
    this._checked = checked;
  }

  public toogleChecked() {
    this._checked = !this._checked;
  }

}
