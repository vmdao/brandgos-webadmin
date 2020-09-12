import { BaseMenuItemUI } from '../../basebar/ui.asbtract';

export class ButtonToggleUI extends BaseMenuItemUI {
  constructor(options) {
    super(options);
    this.htmlWrapper = `<li class="toolbar__item
    ${this.code ? ' toolbar__item--' + this.code : ''}
    ${this.context.isActive ? ' toolbar__item--active' : ''} ${this.position ? 'toolbar__item--' + this.position : ''}">
    </li>`;

    this.html = `<button class="toolbar__button
    ${this.contentIcon ? ' toolbar__button--' + this.contentIcon : ''}
    ${this.contentIcon ? ' toolbar__button--icon' : ''}">
        <span class="toolbar__label toolbar__label--left">
        ${this.contentName}</span></button>`;
  }

  setCommand(action) {
    this.$dom.on(action.event, (event) => {
      this.context.isActive = !!!this.context.isActive;
      this.update();
      action.command.execute(this.context.isActive);
    });
  }

  update() {
    this.context.isActive
      ? this.$domWrapper.addClass('toolbar__item--active')
      : this.$domWrapper.removeClass('toolbar__item--active');
  }
}
