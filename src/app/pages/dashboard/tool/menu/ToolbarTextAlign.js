import $ from 'jquery';
import ModelBase from './ModelBase';
import ModelSlider from './ModelSlider';
import ModelButtonPad from './ModelButtonPad';

export default class ToolbarTextAlign extends ModelBase {
  constructor(where, observers = []) {
    super(where, observers, name);
    this.items = [];
    this.createHTML();
  }
  createHTML() {
    const boxWrapper = `<li class="toolbar__item"></li>`;
    this.setHTML(boxWrapper);
    this.setDom($(boxWrapper));

    const modelButtonPad = new ModelButtonPad(this.$dom, [], {
      name: 'helll ß',
    });
    modelButtonPad.addItem(
      new ModelSlider(modelButtonPad.$dom, [], { name: 'slider' })
    );

    this.addItem(modelButtonPad);
  }
}
