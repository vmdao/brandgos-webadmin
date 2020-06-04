import { BaseMenuItemUI } from '../../basebar/ui.asbtract';

export class ButtonUI extends BaseMenuItemUI {
  isActive = false;

  constructor(options) {
    super(options);
    this.html = `<button class="toolbar__button 
    ${this.contentIcon ? 'toolbar__button--' + this.contentIcon : ''} 
    ${this.contentIcon ? 'toolbar__button--icon' : ''}">
        <span class="toolbar__label toolbar__label--left">
        ${this.contentName}</span></button>`;
  }

  setCommand(action) {
    this.$dom.on(action.event, (event) => {
      action.command.execute();
    });
  }
}
