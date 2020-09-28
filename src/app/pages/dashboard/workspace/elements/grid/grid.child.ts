import * as loadsvg from 'load-svg';
import { BaseHtmlChild } from '../abstracts/base-html-child.abstract';
import { Html } from '../interfaces/has-html.interface';
export class GridChild extends BaseHtmlChild {
  mediaId: string;
  mediaCode: string;

  originUrl: string;
  originThumb: string;
  parent: Html;

  constructor(parent: Html) {
    super(parent);
    this.render();
  }

  render() {
    this.updateSvg();
  }

  updateSvg() {
    loadsvg(this.originUrl, (err, svgPath) => {
      this.$el.html(svgPath);
      this.parent.renderElement(this);
      this.setColorName();
    });
  }
}
