import { BaseElement } from '../abstracts/base.abstract';
import { ELEMENT_TYPE } from '../const';

export class GroupElement extends BaseElement {
  elements: Array<BaseElement> = [];

  constructor(options: any) {
    super(options);
    this.elementType = ELEMENT_TYPE.GROUP_TEXT;
    this.$el.addClass(this.elementType);
  }

  addElements(elements) {
    this.elements = this.elements.concat(elements);
  }

  removeElements(ids: Array<string>) {
    this.elements = this.elements.filter((e) => {
      return !ids.includes(e.elementId);
    });
  }
}
