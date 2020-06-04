import * as jQuery from 'jquery';

export class SvgChild {
  $dom: any;

  background: false;
  color1: string;
  color2: string;
  color3: string;

  width: number;
  height: number;

  mediaId: string;
  mediaCode: string;
  originUrl: string;
  originThumb: string;

  constructor(options: any) {
    this.background = options.background;
    this.color1 = options.color1;
    this.color2 = options.color2;
    this.color3 = options.color3;
    this.originUrl = options.originUrl;
    this.originThumb = options.originThumb;

    this.$dom = jQuery(`<div></div>`);
    this.$dom.addClass('element-inner');
  }
}
