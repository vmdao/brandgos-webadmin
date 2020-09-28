import * as loadsvg from 'load-svg';
import { BaseElement } from '../abstracts/base.abstract';
import { BaseSvgChild } from '../abstracts/base-svg-child.abstract';
export class SvgChild extends BaseSvgChild {
  mediaId: string;
  mediaCode: string;

  originUrl: string;
  originThumb: string;
  parent: BaseElement;

  constructor(options: any, parent) {
    super(options, parent);
    if (options.style) {
      this.originUrl = options.style.originUrl;
      this.originThumb = options.style.originThumb;
    }

    this.render();
  }

  render() {
    this.updateSvg();
  }

  updateSvg() {
    loadsvg(this.originUrl, (err, svgPath) => {
      this.$dom.html(svgPath);
      this.elementAppendTo(this.parent.$dom);
      this.setColorName();
    });
  }

  getData() {
    return {
      color1: this.color1,
      color2: this.color2,
      color3: this.color3,
      strokeColor: this.strokeColor,
      strokeWidth: this.strokeWidth,
      originUrl: this.originUrl,
      originThumb: this.originThumb,
    };
  }
}
