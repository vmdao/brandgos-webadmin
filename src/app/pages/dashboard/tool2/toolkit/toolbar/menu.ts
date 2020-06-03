import { BaseMenu } from '../basebar/menu.abstract';
import { BaseElement } from '../../elements/base.abstract';
import { ButtonUI } from './ui/button.ui';

export interface DataMenuItem {
  type: string;
  options: {
    icon: string;
    children: Array<DataMenuItemChild>;
  };
}

export interface DataMenuItemChild {
  type: string;
  options: {
    icon: string;
  };
}

export class ToolbarMenu extends BaseMenu {
  htmlWrapper = `<menu class="menu toolbar"><ul class="toolbar__list"></ul></menu>`;
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
        const options = { ...item.options, children: [] };
        if (item.options && Array.isArray(item.options.children)) {
          options.children = item.options.children.map((c) => {
            return this.factoryMenuItemChild(c);
          });
        }
        return new ButtonUI(options);
      }
    }
  }

  factoryMenuItemChild(item: DataMenuItemChild) {
    switch (item.type) {
      case 'button': {
        const options = { ...item.options, children: [] };
        return new ButtonUI(options);
      }
    }
  }
}
