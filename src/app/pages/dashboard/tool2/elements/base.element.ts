import * as jQuery from 'jquery';
import { FontsizeBehavior } from './interfaces/fontsize.interface';
import { FontsizeNothingBehavior } from './behaviors/fontsize-nothing.behavior';
import { MoveBehavior } from './interfaces/move.interface';
import { RotateBehavior } from './interfaces/rotate.interface';
export abstract class BaseElement {
  $dom: any;
  elementId: number;
  elementCode: string;
  top: number;
  left: number;
  widht: number;
  height: number;
  rotate: number;
  opactiy: number;
  selected = false;
  order: number;
  scale = 1;
  fontsize: number;

  fontsizeBehavior: FontsizeBehavior;
  moveBehavior: MoveBehavior;
  rotateBehavior: RotateBehavior;

  constructor(options: any) {
    this.elementId = options.elementId;
    this.elementCode = options.elementId;
    this.top = options.top;
    this.left = options.left;
    this.widht = options.widht;
    this.height = options.height;
    this.rotate = options.rotate;
    this.opactiy = options.opactiy;

    this.$dom = jQuery(`<div></div>`);
    this.$dom.addClass('element');

    this.setFontsizeBehavior(new FontsizeNothingBehavior(this));
  }

  elementAppendTo(parent) {
    this.$dom.appendTo(parent);
  }

  elementRemove() {
    this.$dom.remove();
  }

  elementEmpty() {
    this.$dom.empty();
  }

  setRotate(rotate) {
    this.rotate = rotate;
  }

  getRotate() {
    return this.rotate;
  }

  setLeft(left) {
    this.left = left;
  }

  getLeft() {
    return this.left;
  }

  setTop(top) {
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

  setWidht(widht) {
    this.widht = widht;
  }

  getWidth() {
    return this.widht;
  }

  setHeight(height) {
    this.height = height;
  }

  getHeight() {
    return this.height;
  }

  getSize() {
    return {
      height: this.getHeight(),
      widht: this.getWidth(),
    };
  }

  getBox() {
    return {
      height: this.getHeight(),
      widht: this.getWidth(),
      left: this.getLeft(),
      top: this.getTop(),
    };
  }

  setFontsizeBehavior(fontsizeBehavior: FontsizeBehavior) {
    this.fontsizeBehavior = fontsizeBehavior;
  }

  performChangeFontsize(fontsize: number) {
    this.fontsizeBehavior.changeFontsize(fontsize);
  }

  performRotate(angle: number) {
    this.rotateBehavior.changeChangeAngle(angle);
  }

  performMove(position: { top: number; left: number }) {
    this.moveBehavior.changePosition(position);
  }
}
