import { BaseMenuItemUI } from '../../basebar/ui.asbtract';
import { omit } from 'lodash';
import * as jQuery from 'jquery';
export class DropdownUI extends BaseMenuItemUI {
  htmlList = '';
  htmlListItems = '';
  items: Array<any> = [];
  $domList;

  $document;
  constructor(options) {
    super(options);
    this.htmlWrapper = `<li class="toolbar__item toolbar__item--submenu ${
      this.code ? 'toolbar__item--' + this.code : ''
    }"></li>`;
    this.html = `<button class="toolbar__button  ${
      this.code ? 'toolbar__button--' + this.code : ''
    }">
        <span class="toolbar__label">
            ${this.contentName}
        </span>
    </button>`;
  }

  render() {
    this.$dom = jQuery(this.html);
    this.$domList = this.buildDomList();
    this.$domWrapper = jQuery(this.htmlWrapper);

    this.$domWrapper.append(this.$dom);
    this.$domWrapper.append(this.$domList);
    this.$document = jQuery(window.document);
    this.setCommands();
    this.setEvent();
    return this;
  }

  setCommand(action) {
    this.$domList.on(action.event, 'li', (event) => {
      this.updateActive();
      const item = jQuery(event.currentTarget);
      item.addClass('active');
      const data = item.data('data');
      const value = omit(data, ['$dom']);
      action.command.execute(value);
    });
  }

  updateActive() {
    this.$domList.find('li').each((i, e) => {
      jQuery(e).removeClass('active');
    });
  }

  setEvent() {
    this.$domWrapper.find('> .toolbar__button').on('click', (event) => {
      this.$domWrapper.addClass('toolbar__item--submenuExpanded');
      this.$document
        .find('#areaWorkspace')
        .one('click', eventClickOff.bind(this));
    });

    function eventClickOff(event) {
      this.$domWrapper.removeClass('toolbar__item--submenuExpanded');
    }
  }

  update() {
    this.context.isActive
      ? this.$domWrapper.addClass('toolbar__item--submenuExpanded')
      : this.$domWrapper.removeClass('toolbar__item--submenuExpanded');
  }

  addBatchItems(wrapper, items) {
    items.forEach((item) => {
      this.addItem(wrapper, item);
    });
  }

  addItem(wrapper, item) {
    item.$dom = jQuery(`<li class="selectable">
    <button class="toolbar__button toolbar__button--font" data-text="${
      item.label
    }">
        ${
          item.thumbUrl
            ? `<img class="toolbar__thumbnail" src="${item.thumbUrl}" width="${item.width}" height="${item.height}"/>`
            : item.label
        }</button>
    </button>`);
    item.$dom.data('data', item);
    this.items.push(item);
    wrapper.append(item.$dom);
  }

  buildDomList() {
    const wrapper = jQuery(
      `<menu class="menuList"><ul class="menuList__inner"></ul></menu>`
    );
    this.addBatchItems(wrapper, this.context['list']);
    return wrapper;
  }
}
