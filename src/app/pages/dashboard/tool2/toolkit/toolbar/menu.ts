import { BaseMenu } from '../basebar/menu.abstract';
import { BaseElement } from '../../elements/base.abstract';
import { BaseMenuItemUI } from '../basebar/ui.asbtract';
import { ButtonUI } from './ui/button.ui';

export class ToolbarMenu extends BaseMenu {
  htmlWraper = `<menu class="menu toolbar"><ul class="toolbar__list"></ul></menu>`;
  constructor(options: {
    where?: string;
    type?: string;
    dataElement: BaseElement;
  }) {
    super(options);
  }

  builderMenu(
    items: Array<{
      type: string;
      options: {
        icon: string;
        children: [{ type: string; options: { icon: string } }];
      };
    }>
  ) {
    items.forEach((item) => {
      const menuItemUI = this.factoryMenuItem(item);
      this.renderItem(menuItemUI);
    });
  }

  factoryMenuItem(item: {
    type: string;
    options: {
      icon: string;
      children: [{ type: string; options: { icon: string } }];
    };
  }) {
    switch (item.type) {
      case 'button': {
        const options = { ...item.options, children: [] };
        if (item.options && Array.isArray(item.options.children)) {
          options.children = item.options.children.map((c) => {
            return this.factoryMenuItem(c);
          });
        }
        return new ButtonUI(options);
      }
    }
  }
}
