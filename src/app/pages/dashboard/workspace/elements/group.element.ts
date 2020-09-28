import * as jQuery from 'jquery';

import { MoveBehavior } from './interfaces/move.interface';
import { RotateBehavior } from './interfaces/rotate.interface';
import { TextChild } from './text.child';
import { SvgChild } from './svg.child';

export abstract class BaseElement {
  $dom: any;

  elementId: number;
  elementType: string;

  top: number;
  left: number;

  width: number;
  height: number;

  angle: number;
  opactiy: number;

  order: number;
  background = false;

  text: TextChild;
  svg: SvgChild;

  moveBehavior: MoveBehavior;
  rotateBehavior: RotateBehavior;

  scale = 1;
  selected = 0;

  constructor(options: any) {
    this.elementId = options.elementId;

    this.top = options.top;
    this.left = options.left;

    this.width = options.width;
    this.height = options.height;

    this.opactiy = options.opactiy || 100;
    this.angle = options.angle || 0;

    this.$dom = jQuery(`<div></div>`);
    this.$dom.addClass('element group');
  }

  appendTo(parent) {
    this.$dom.appendTo(parent);
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
