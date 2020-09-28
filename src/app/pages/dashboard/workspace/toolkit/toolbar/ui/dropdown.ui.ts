import { BaseMenuItemUI } from '../../basebar/ui.asbtract';
import { omit } from 'lodash';
import * as jQuery from 'jquery';
export class DropdownUI extends BaseMenuItemUI {
  htmlList = '';
  htmlListItems = '';
  items: Array<any> = [];
  $elList;
  $elCover;
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
    this.$el = jQuery(this.html);
    this.$elList = this.buildDomList();
    this.$elWrapper = jQuery(this.htmlWrapper);
    this.$elCover = jQuery('<div class="submenu-cover"></div>');
    this.$elWrapper.append(this.$el);
    this.$elWrapper.append(this.$elCover);
    this.$elWrapper.append(this.$elList);
    this.setCommands();
    this.setEvent();
    return this;
  }

  setCommand(action) {
    this.$elList.on(action.event, 'li', (event) => {
      this.updateActive();
      const item = jQuery(event.currentTarget);
      item.addClass('active');
      const data = item.data('data');
      const value = omit(data, ['$el']);
      action.command.execute(value);
    });
  }

  updateActive() {
    this.$elList.find('li').each((i, e) => {
      jQuery(e).removeClass('active');
    });
  }

  setEvent() {
    this.$elWrapper.find('> .toolbar__button').on('click', (event) => {
      this.$elWrapper.addClass('toolbar__item--submenuExpanded');
    });
    this.$elCover.on('click', eventClickOff.bind(this));

    function eventClickOff(event) {
      this.$elWrapper.removeClass('toolbar__item--submenuExpanded');
    }
  }

  update() {
    this.context.isActive
      ? this.$elWrapper.addClass('toolbar__item--submenuExpanded')
      : this.$elWrapper.removeClass('toolbar__item--submenuExpanded');
  }

  addBatchItems(wrapper, items) {
    items.forEach((item) => {
      this.addItem(wrapper, item);
    });
  }

  addItem(wrapper, item) {
    item.$el = jQuery(`<li class="selectable">
    <button class="toolbar__button toolbar__button--font" data-text="${
      item.label
    }">
        ${
          item.thumbUrl
            ? `<img class="toolbar__thumbnail" src="${item.thumbUrl}" width="${item.width}" height="${item.height}"/>`
            : item.label
        }</button>
    </button>`);
    item.$el.data('data', item);
    this.items.push(item);
    wrapper.append(item.$el);
  }

  buildDomList() {
    const wrapper = jQuery(
      `<menu class="menuList"><ul class="menuList__inner"></ul></menu>`
    );
    // tslint:disable-next-line: no-string-literal
    this.addBatchItems(wrapper, this.context['list']);
    return wrapper;
  }
}
