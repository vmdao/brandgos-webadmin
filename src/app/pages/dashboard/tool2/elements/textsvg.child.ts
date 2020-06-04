import { BaseTextChild } from './base-text-child.abstract';

export class TextSvgChild extends BaseTextChild {
  constructor(options: any, parent) {
    super(options, parent);
  }

  render() {
    console.log(this.html, 1234, this);
    this.typeBehavior.render();
    this.elementAppendTo(this.parent.$dom);
  }
}
