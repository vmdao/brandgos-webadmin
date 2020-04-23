import ModelBase from './ModelBase';
import $ from '../utils/jquery';
export default class ModelButtonPad extends ModelBase {
    constructor(where, observers = {}, { type, code, name, html, id, isIcon, label }) {
        super(where, observers);
        this.listener = observers.listener || '';
        this.click = observers.click || '';
        this.name = name;
        this.code = code;
        this.type = type || ''; // radio || '';
        this.isIcon = isIcon || !1;
        this.label = label;
        this.items = [];
        this.handleClick = this.handleClick.bind(this);
        this.handleClickOn = this.handleClickOn.bind(this);
        this.createHTML();

    }

    createHTML() {
        const boxWrapper = `<li class="toolbar__item toolbar__item--submenu ${this.code ? "toolbar__item--" + this.code : ""}">
        <button class="toolbar__button ${this.code ? "toolbar__button--" + this.code : ""} ${this.isIcon ? "toolbar__button--icon" : ""}">
        <span class="toolbar__label toolbar__label--left">${this.name}</span></button><menu class="toolbar toolbar--textAlign">
        <ul class="toolbar__list"></ul></menu></li>`;
        this.setHTML(boxWrapper);
        this.setDom($(boxWrapper));
        this.setEvent();
    }

    setEvent() {
        // this.$dom.find('.button-expanded').clickOutsideThisElement(this.handleClickOn);
        this.$dom.find('.toolbar__button').on('click', this.handleClick);
    }

    handleClickOn(event) {
        console.log(123, event)
        // const target = event.currentTarget;
    }

    handleClick(event) {
        this.click();
        this.$dom.toggleClass('toolbar__item--submenuExpanded');
    }

    callObserver() {
        return (data) => {
            this.eventByType(data);
            this.listener(data);
        };
    }

    eventByType(data) {
        if (this.type === 'radio' && this.isIcon) {
            // format === false
            this.updateIcon(data);
            this.items.forEach(item => {
                item.updateActive(false);
            });
        }
    }

    updateIconColor(data) {
        this.$dom.find('.toolbar__button--color').css('background-color', data.hex);
    }

    updateIcon(data) {
        this.$dom.find('.toolbar__button:first').removeClass('toolbar__button--' + this.code).addClass('toolbar__button--' + data.code);
        this.setCode(data.code);
    }
    setCode(code) {
        this.code = code;
    }
}