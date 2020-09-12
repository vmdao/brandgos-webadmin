import { BaseMenuItemUI } from '../../basebar/ui.asbtract';
import * as jQuery from 'jquery';
export class DropPadUI extends BaseMenuItemUI {
  htmlList = '';
  htmlListItems = '';
  items: Array<any> = [];
  $domList;
  $domCover;
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
    this.$dom = jQuery(this.html);
    this.$domWrapper = jQuery(this.htmlWrapper);
    this.$domList = this.buildDomList();
    this.$domCover = jQuery('<div class="submenu-cover"></div>');
    this.$domWrapper.append(this.$dom);
    this.$domWrapper.append(this.$domCover);
    this.$domWrapper.append(this.$domList);
    this.setEvent();
    this.renderItems();
    return this;
  }

  updateActive() {
    this.$domList.find('li').each((i, e) => {
      jQuery(e).removeClass('active');
    });
  }

  setEvent() {
    this.$domWrapper.find('> .toolbar__button').on('click', (event) => {
      this.$domWrapper.addClass('toolbar__item--submenuExpanded');
    });
    this.$domCover.on('click', eventClickOff.bind(this));
    function eventClickOff(event) {
      this.$domWrapper.removeClass('toolbar__item--submenuExpanded');
    }
  }

  update() {
    this.context.isActive
      ? this.$domWrapper.addClass('toolbar__item--submenuExpanded')
      : this.$domWrapper.removeClass('toolbar__item--submenuExpanded');
  }

  renderItems() {
    this.children.forEach((item) => {
      this.addItem(item);
    });
  }

  addItem(item) {
    item.appendTo(this.$domList);
  }

  buildDomList() {
    return jQuery(
      `<menu class="menuList"><ul class="menuList__inner"></ul></menu>`
    );
  }
}
