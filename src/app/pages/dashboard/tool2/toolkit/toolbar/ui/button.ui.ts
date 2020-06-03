import { BaseMenuItemUI } from '../../basebar/ui.asbtract';

export class ButtonUI extends BaseMenuItemUI {
  isActive = false;

  constructor(options) {
    super(options);
    this.html = `<li class="toolbar__item ${
      this.code ? 'toolbar__item--' + this.code : ''
    } ${this.isActive ? 'toolbar__item--active' : ''}"> 
        <button class="toolbar__button ${
          this.code ? 'toolbar__button--' + this.code : ''
        } ${this.options.icon ? 'toolbar__button--icon' : ''}">
        <span class="toolbar__label toolbar__label--left">${
          this.name
        }</span></button> </li>`;
  }
}
