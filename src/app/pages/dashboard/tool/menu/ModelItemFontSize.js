import $ from '../utils/jquery';
import ModelBase from './ModelBase';

export default class ModelItem extends ModelBase {
    constructor(where, observers = {}, { code, name, html, id, isActive, isIcon, label, data }) {
        super(where, observers);
        this.name = name;
        this.code = code;
        this.isIcon = isIcon || !1;
        this.data = data;
        this.isActive = typeof isActive === 'undefined' ? !1 : isActive;
        this.handleClick = this.handleClick.bind(this);
        this.handleClickOn = this.handleClickOn.bind(this);
        this.createHTML();
    }

    createHTML() {
   
        const boxWrapper = `<li class="selectable ${this.isActive ? "active" : ""}"> 
        <button class="toolbar__button" data-text="${this.data}">${this.data}</button> </li>`;
        this.setHTML(boxWrapper);
        this.setDom($(boxWrapper));
        this.setEvent();
    }

    setEvent() {
        typeof this.observers.click === 'function' ? this.$dom.find('.toolbar__button').on('click', this.handleClick) : '';
    }

    handleClickOn(event) {
        console.log(123, event)
    }

    updateActive(isActive) {
        this.setActive(isActive);
        this.isActive ?
            this.$dom.addClass('active')
            : this.$dom.removeClass('active');
    }



    setActive(isActive) {
        this.isActive = isActive;
    }

    handleClick(event) {
        const isActive = !this.isActive;
        typeof this.observers.click === 'function' ? this.observers.click(this) : '';
        this.updateActive(isActive);
    }
}