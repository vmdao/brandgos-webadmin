import * as jQuery from 'jquery';

export class Border {
  $dom: any;
  $domWrapper: any;
  width: number;
  height: number;
  html =
    // tslint:disable-next-line: max-line-length
    '<div class="border"><div class="vertical align"></div><div class="vertical align"></div><div class="vertical align"></div><div class="horizontal align"></div><div class="horizontal align"></div><div class="horizontal align"></div></div>';

  constructor(option) {
    this.width = option.width;
    this.height = option.height;
    this.$domWrapper = jQuery(
      `<div class="angleWorkspace" id="angleWorkspace"></div>`
    );
  }

  render(selector: string) {
    this.$dom = jQuery(`${this.html}`);
    this.$dom.appendTo(this.$domWrapper);
    this.$domWrapper.appendTo(selector);
    this.updateStyle({});
  }

  updateStyle(values) {
    const styles = {
      ...{
        width: this.width,
        height: this.height,
      },
      ...values,
    };
    this.$dom.css(styles);
  }
}
