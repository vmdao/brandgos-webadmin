import $ from 'jquery';

export default class ModelBase {
    constructor(where, observers = {}) {
        this.observers = observers;
        this.where = where;
    }

    render() {
        $(this.where).append(this.getDom());
    }

    getHTML() {
        return this.html;
    }

    setHTML(html) {
        this.html = html;
    }

    getDom() {
        return this.$dom;
    }

    setDom($dom) {
        this.$dom = $dom;
    }

    setDisable() {

    }

    setEnable() {

    }

    setShow() {

    }

    setHide() {

    }

    setDestroy() {

    }

    setDetach() {

    }

    addItem(item) {
        this.items.push(item);
        this.insertItem(item);
    }

    insertItem(item) {
        this.$dom.find('.toolbar__list,.menuList__inner').append(item.$dom);
    }
}