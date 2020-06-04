import { BaseMenu } from '../basebar/menu.abstract';
import { BaseElement } from '../../elements/base.abstract';
import { ButtonUI, ButtonToggleUI } from './ui';
import { Command } from '../command';

export interface DataMenuItem {
  type: string;
  name: string;
  icon: string;
  children: Array<DataMenuItemChild>;
  actions: Array<{ event: string; command: Command }>;
}

export interface DataMenuItemChild {
  type: string;
  icon: string;
  name: string;
  actions: Array<{ event: string; command: Command }>;
}

export class ToolbarMenu extends BaseMenu {
  htmlWrapper = `<menu class="menu toolbar"></menu>`;
  html = `<ul class="toolbar__list"></ul>`;
  constructor(options: {
    where?: string;
    type?: string;
    dataElement: BaseElement;
  }) {
    super(options);
  }

  builderMenu(items: Array<DataMenuItem>) {
    items.forEach((item) => {
      const menuItemUI = this.factoryMenuItem(item);
      menuItemUI.render();
      this.register(menuItemUI);
    });
  }

  factoryMenuItem(item: DataMenuItem) {
    switch (item.type) {
      case 'button': {
        const options = { ...item, children: [] };
        if (options && Array.isArray(item.children)) {
          options.children = options.children.map((c) => {
            return this.factoryMenuItemChild(c);
          });
        }
        return new ButtonUI(options);
      }
      case 'button-toggle': {
        const options = { ...item, children: [] };
        return new ButtonToggleUI(options);
      }
      default:
        return new ButtonUI({ ...item });
    }
  }

  factoryMenuItemChild(item: DataMenuItemChild) {
    switch (item.type) {
      case 'button': {
        return new ButtonUI({ ...item });
      }
      case 'button-toggle': {
        return new ButtonToggleUI({ ...item });
      }
      default:
        return new ButtonUI({ ...item });
    }
  }
}
