import * as loadsvg from 'load-svg';
import { BaseSvgChild } from '../abstracts/base-svg-child.abstract';
import { SvgElement } from './svg.element';
export class SvgChild extends BaseSvgChild {
  parent: SvgElement;

  constructor(parent: SvgElement) {
    super(parent);
  }

  render() {
    return this.updateSvg();
  }

  updateSvg() {
    return new Promise((resolve, reject) => {
      loadsvg(this.parent.mediaUrl, (err, svgPath) => {
        if (err) {
          return reject(err);
        }

        this.$el.html(svgPath);
        this.setColorName();
        return resolve({ status: 200, child: this });
      });
    });
  }
}
