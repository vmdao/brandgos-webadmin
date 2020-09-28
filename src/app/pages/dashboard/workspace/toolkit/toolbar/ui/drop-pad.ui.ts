import { BaseMenuItemUI } from '../../basebar/ui.asbtract';
import * as jQuery from 'jquery';
export class DropPadUI extends BaseMenuItemUI {
  htmlList = '';
  htmlListItems = '';
  items: Array<any> = [];
  $elList;
  $elCover;
  constructor(options) {
    super(options);
    this.htmlWrapper = `<li class="toolbar__item toolbar__item--submenu ${
      this.contentIcon ? 'toolbar__item--' + this.contentIcon : ''
    } ${this.position ? 'toolbar__item--' + this.position : ''}"></li>`;
    this.html = `<button class="toolbar__button  ${
      this.contentIcon ? 'toolbar__button--' + this.contentIcon : ''
    }  ${this.contentIcon ? 'toolbar__button--icon' : ''}">
        <span class="toolbar__label">
            ${this.contentName}
        </span>
    </button>`;
  }

  render() {
    this.$el = jQuery(this.html);
    this.$elWrapper = jQuery(this.htmlWrapper);
    this.$elList = this.buildDomList();
    this.$elCover = jQuery('<div class="submenu-cover"></div>');
    this.$elWrapper.append(this.$el);
    this.$elWrapper.append(this.$elCover);
    this.$elWrapper.append(this.$elList);
    this.setEvent();
    this.renderItems();
    return this;
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

  renderItems() {
    this.children.forEach((item) => {
      this.addItem(item);
    });
  }

  addItem(item) {
    item.appendTo(this.$elList);
  }

  buildDomList() {
    return jQuery(
      `<menu class="menuList"><ul class="menuList__inner"></ul></menu>`
    );
  }
}
