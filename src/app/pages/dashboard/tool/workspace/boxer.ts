import * as jQuery from 'jquery';

export class Boxer {
  $dom: any;
  $domWrapper: any;
  width: number;
  height: number;

  top: number;
  left: number;
  scale: number;
  angle: number;

  tlShow = true;
  trShow = true;
  tShow = true;
  rShow = true;
  brShow = true;
  bShow = true;
  blShow = true;
  lShow = true;
  rotateShow = true;
  html = '';

  constructor(option) {
    this.width = option.width;
    this.height = option.height;
    this.$domWrapper = jQuery(
      `<div class="angleWorkspace" id="angleWorkspace"></div>`
    );
  }

  render(selector: string) {
    this.builderHtml();
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
        top: this.top,
        left: this.left,
        scale: this.scale,
      },
      ...values,
    };
    this.$dom.css(styles);
  }

  builderHtml() {
    this.html = `<div class="selectedBound handleCircle">
    <div class="ghostElement"></div>
        ${this.tlShow ? '<a class="cube tl"></a>' : ''}
        ${this.tShow ? '<a class="cube t"></a>' : ''}
        ${this.trShow ? '<a class="cube tr"></a>' : ''}
        ${this.rShow ? '<a class="cube r"></a>' : ''}
        ${this.brShow ? '<a class="cube br"></a>' : ''}
        ${this.blShow ? '<a class="cube bl"></a>' : ''}
        ${this.lShow ? '<a class="cube l"></a>' : ''}
        ${this.rotateShow ? '<a class="rotate" title="Rotate"></a>' : ''}
    </div>
    `;
  }
}
