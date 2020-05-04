import * as jQuery from 'jquery';

export abstract class ModelBase {
  container: string;
  html: string;
  $dom;

  isShow = true;
  isActive = true;
  isDetach = false;

  render(container) {
    this.container = container;
    jQuery(this.container).append(this.$dom());
  }

  getHTML() {
    return this.html;
  }

  setHTML(html) {
    this.html = html;
    return this;
  }

  setDisable() {}

  setEnable() {}

  setShow() {}

  setHide() {}

  setDestroy() {}

  setDetach() {}
}
