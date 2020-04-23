import $ from 'jquery';

export default class ToolbarBase {
    constructor(where, observers = []) {
        this.observers = observers;
        this.where = where;
    }

    render() {
        $(this.where).append(this.getHTML());
    }

    getHTML() {
        return this.html;
    }

    setHTML(html) {
        this.html = html;
    }
}