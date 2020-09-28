import { BaseSvgChild } from '../abstracts/base-svg-child.abstract';
import { BaseElement } from '../abstracts/base.abstract';
import { Color } from '../abstracts/color';
import { Svg } from '../interfaces/has-svg.interface';
import { SvgChild } from './svg.child';
import { SvgDTO } from './SvgDTO';

export class SvgElement extends BaseElement implements Svg {
  isBackground = 0;

  colors: Array<Color> = [];
  strokeWidth: number;
  strokeColor: string;

  mediaUrl: string;
  borderRadius: number;

  svg: BaseSvgChild;

  constructor(params: SvgDTO) {
    super(params);
    this.mediaUrl = params.mediaUrl;
    this.isBackground = params.isBackground || 0;
    this.setSvg(new SvgChild(this));
    this.render();
  }

  render() {
    this.svg.updateSvg().then((data) => {
      this.renderElement(data.child);
    });
  }

  renderElement(child) {
    this.$el.append(child.$el);
    console.log('svg renderElement');
  }

  setSvg(svg: BaseSvgChild) {
    this.svg = svg;
  }

  updateSvg() {
    this.svg.updateSvg();
  }

  getData() {
    const baseData = super.getData();
    return {
      ...baseData,
      colors: this.colors,
      strokeWidth: this.strokeWidth,
      strokeColor: this.strokeColor,
      borderRadius: this.borderRadius,
    };
  }
}
