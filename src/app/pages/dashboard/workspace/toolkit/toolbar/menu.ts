import { BaseMenu } from '../basebar/menu.abstract';
import { BaseElement } from '../../elements/abstracts/base.abstract';
import {
  ButtonUI,
  ButtonToggleUI,
  ButtonColorUI,
  DropdownUI,
  SliderOneUI,
  DropPadUI,
  InputUI,
  ButtonInputUI,
} from './ui';
import { Command } from '../command';

export interface DataMenuItem {
  type: string;
  name: string;
  icon: string;
  children: Array<DataMenuItemChild>;
  actions: Array<{ event: string; command: Command }>;
  context: any;
}

export interface DataMenuItemChild {
  type: string;
  icon: string;
  name: string;
  actions: Array<{ event: string; command: Command }>;
  context: any;
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
        return new ButtonUI(options);
      }
      case 'button-toggle': {
        const options = { ...item, children: [] };
        return new ButtonToggleUI(options);
      }
      case 'input': {
        const options = { ...item, children: [] };
        return new InputUI(options);
      }
      case 'button-color': {
        const options = { ...item, children: [] };
        return new ButtonColorUI(options);
      }
      case 'slider-one': {
        const options = { ...item, children: [] };
        return new SliderOneUI(options);
      }
      case 'drop-pad': {
        const options = { ...item };
        let children = [];
        if (options && Array.isArray(item.children)) {
          children = options.children.map((c) => {
            const child = this.factoryMenuItemChild(c);
            child.render();
            return child;
          });
        }
        return new DropPadUI({ ...options, children });
      }
      case 'dropdown': {
        const options = { ...item, children: [] };
        return new DropdownUI(options);
      }
      case 'button-input': {
        const options = { ...item, children: [] };
        return new ButtonInputUI(options);
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
      case 'slider-one': {
        const options = { ...item };
        return new SliderOneUI(options);
      }
      default:
        return new ButtonUI({ ...item });
    }
  }
}
