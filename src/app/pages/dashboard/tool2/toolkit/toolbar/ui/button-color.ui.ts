import { BaseMenuItemUI } from '../../basebar/ui.asbtract';
import Pickr from '@simonwep/pickr';
import * as jQuery from 'jquery';
import { OnViewed } from '../../../lifecycle';
export class ButtonColorUI extends BaseMenuItemUI implements OnViewed {
  constructor(options) {
    super(options);
    this.html = `<div class="toolbar__button toolbar__button--color"><span class="toolbar__label">${this.contentName}</span></div>`;
  }

  render() {
    this.$dom = jQuery(this.html);
    this.$domWrapper = jQuery(this.htmlWrapper);
    this.$domWrapper.append(this.$dom);
    this.setCommands();

    return this;
  }

  onViewed() {
    const actionChangeColor = this.actions.find((action) => {
      return action.event === 'change';
    });

    const pickr = Pickr.create({
      el: this.$dom.find('span').get(0),
      defaultRepresentation: 'HEXA',
      default: this.context.color || '#000000',
      lockOpacity: true,
      theme: 'classic',
      swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(33, 150, 243, 0.75)',
        'rgba(3, 169, 244, 0.7)',
        'rgba(0, 188, 212, 0.7)',
        'rgba(0, 150, 136, 0.75)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(139, 195, 74, 0.85)',
        'rgba(205, 220, 57, 0.9)',
        'rgba(255, 235, 59, 0.95)',
        'rgba(255, 193, 7, 1)',
      ],

      components: {
        // Main components
        preview: true,
        opacity: true,
        hue: true,
        palette: true,
        // Input / output Options
        interaction: {
          hex: true,
          rgba: true,
          hsla: true,
          hsva: true,
          cmyk: true,
          input: true,
          clear: false,
          save: true,
        },
      },
    });

    pickr.on('change', (color, instance) => {
      instance.applyColor();
      if (actionChangeColor) {
        actionChangeColor.command.execute(color.toRGBA().toString());
      }
    });
  }

  setCommand(action) {}
}
