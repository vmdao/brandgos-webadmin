import * as jQuery from 'jquery';

import { BaseElement } from '../abstracts/base.abstract';
import { ELEMENT_TYPE } from '../const';

export class GroupElement {
  $dom: any;

  elementId: string;
  elementType = ELEMENT_TYPE.GROUP_TEXT;

  top: number;
  left: number;

  width: number;
  height: number;

  angle: number;
  transparent: number;

  scale = 1;
  order: number;

  locked = 0;

  elements: Array<BaseElement> = [];

  background = 0;
  selected = 0;

  constructor(options: any) {
    this.elementId = options.elementId;

    this.top = options.top;
    this.left = options.left;

    this.width = options.width;
    this.height = options.height;

    this.transparent = options.transparent || 100;
    this.angle = options.angle || 0;

    this.$dom = jQuery(`<div class="element"></div>`);
    this.$dom.addClass(this.elementType);
  }

  appendTo(el) {
    this.$dom.appendTo(el);
  }

  remove() {
    this.$dom.remove();
  }

  empty() {
    this.$dom.empty();
  }

  setRotate(value: number) {
    this.angle = value;
  }

  getRotate() {
    return this.angle;
  }

  setLeft(left: number) {
    this.left = left;
  }

  getLeft() {
    return this.left;
  }

  setTop(top: number) {
    this.top = top;
  }

  getTop() {
    return this.top;
  }

  getPosition() {
    return {
      left: this.getLeft(),
      top: this.getTop(),
    };
  }

  setWidth(width: number) {
    this.width = width;
  }

  getWidth() {
    return this.width;
  }

  setHeight(height: number) {
    this.height = height;
  }

  getHeight() {
    return this.height;
  }

  getSize() {
    return {
      height: this.getHeight(),
      width: this.getWidth(),
    };
  }

  getBox() {
    return {
      height: this.getHeight(),
      width: this.getWidth(),
      left: this.getLeft(),
      top: this.getTop(),
    };
  }

  addElements(elements) {
    this.elements = this.elements.concat(elements);
  }

  removeElements(ids: Array<string>) {
    this.elements = this.elements.filter((e) => {
      return !ids.includes(e.elementId);
    });
  }
}
