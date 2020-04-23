import $ from '../utils/jquery';
import ModelBase from './ModelBase';

export default class ModelButton extends ModelBase {
  constructor(
    where,
    observers = {},
    { type, code, name, html, id, isActive, isIcon, label }
  ) {
    super(where, observers);
    this.type = type;
    this.name = name;
    this.code = code;
    this.isIcon = isIcon || !1;
    this.isActive = typeof isActive === 'undefined' ? !1 : isActive;
    this.items = [];
    this.handleClick = this.handleClick.bind(this);
    this.handleClickOn = this.handleClickOn.bind(this);
    this.createHTML();
  }

  createHTML() {
    const boxWrapper = `<li class="toolbar__item ${
      this.code ? 'toolbar__item--' + this.code : ''
    } ${this.isActive ? 'toolbar__item--active' : ''}"> 
        <button class="toolbar__button ${
          this.code ? 'toolbar__button--' + this.code : ''
        } ${this.isIcon ? 'toolbar__button--icon' : ''}">
        <span class="toolbar__label toolbar__label--left">${
          this.name
        }</span></button> </li>`;
    this.setHTML(boxWrapper);
    this.setDom($(boxWrapper));
    this.setEvent();
  }

  setEvent() {
    typeof this.observers.click === 'function'
      ? this.$dom.find('.toolbar__button').on('click', this.handleClick)
      : () => {};
  }

  handleClickOn(event) {}

  updateActive(isActive) {
    this.setActive(isActive);
    this.isActive
      ? this.$dom.addClass('toolbar__item--active')
      : this.$dom.removeClass('toolbar__item--active');
  }

  setActive(isActive) {
    this.isActive = isActive;
  }

  handleClick(event) {
    const isActive = !this.isActive;
    if (this.type === 'radio') {
      this.updateActive(isActive);
    }
    typeof this.observers.click === 'function'
      ? this.observers.click(this)
      : '';
  }
}
