import { BaseElement } from '../abstracts/base.abstract';
import { Color } from '../abstracts/color';
import { Html } from '../interfaces/has-html.interface';
import { GridChild } from '../grid/grid.child';

export class GridElement extends BaseElement implements Html {
  background = 0;
  html;
  colors: Array<Color>;
  strokeWidth: number;
  strokeColor: string;
  borderRadius: number;

  constructor(options: any) {
    super(options);
    this.background = options.background || 0;
    this.setHtml(new GridChild(this));
  }

  updateSvg() {
    this.html.updateSvg();
  }
  renderElement(element) {}

  setHtml(child) {
    this.html = child;
  }
  getData() {
    const baseData = super.getData();
    return {
      ...baseData,
    };
  }
}
