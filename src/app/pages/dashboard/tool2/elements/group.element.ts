import * as jQuery from 'jquery';

import { MoveBehavior } from './interfaces/move.interface';
import { RotateBehavior } from './interfaces/rotate.interface';
import { TextChild } from './text.child';
import { SvgChild } from './svg.child';

export abstract class BaseElement {
  $dom: any;
  elementId: number;
  elementCode: string;
  elementType: string;

  top: number;
  left: number;

  widht: number;
  height: number;

  angle: number;

  opactiy: number;
  order: number;
  scale = 1;
  background = false;

  selected = false;

  text: TextChild;
  svg: SvgChild;

  moveBehavior: MoveBehavior;
  rotateBehavior: RotateBehavior;

  constructor(options: any) {
    this.elementId = options.elementId;
    this.elementCode = options.elementId;
    this.top = options.top;
    this.left = options.left;
    this.widht = options.widht;
    this.height = options.height;
    this.angle = options.rotate;
    this.opactiy = options.opactiy;

    this.$dom = jQuery(`<div></div>`);
    this.$dom.addClass('element');
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

  setWidht(widht: number) {
    this.widht = widht;
  }

  getWidth() {
    return this.widht;
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

  setText(text: TextChild) {
    this.text = text;
  }

  setSvg(svg: SvgChild) {
    this.svg = svg;
  }

  performRotate(angle: number) {
    this.rotateBehavior.changeChangeAngle(angle);
  }

  performMove(position: { top: number; left: number }) {
    this.moveBehavior.changePosition(position);
  }

  setMoveBehavior(moveBehavior: MoveBehavior) {
    this.moveBehavior = moveBehavior;
  }

  setRotateBehavior(rotateBehavior: RotateBehavior) {
    this.rotateBehavior = rotateBehavior;
  }
}
