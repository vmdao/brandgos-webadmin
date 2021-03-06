import * as jQuery from 'jquery';

import { MoveBehavior } from './interfaces/move.interface';
import { RotateBehavior } from './interfaces/rotate.interface';

import { BaseTextChild } from './base-text-child.abstract';
import { BaseSvgChild } from './base-svg-child.abstract';

export abstract class BaseElement {
  $dom: any;
  elementId: number;
  elementCode: string;
  elementType: string;

  top: number;
  left: number;

  width: number;
  height: number;

  angle: number;

  transparent: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
  order: number;
  scale = 1;
  background = false;

  borderRadius?: number;
  strokeWidth?: number;

  selected = false;

  text: BaseTextChild;
  svg: BaseSvgChild;

  moveBehavior: MoveBehavior;
  rotateBehavior: RotateBehavior;

  constructor(options: any) {
    this.elementId = options.elementId;
    this.elementCode = options.elementId;
    this.elementType = options.elementType;

    this.top = options.top || 0;
    this.left = options.left || 0;
    this.width = options.width || 0;
    this.height = options.height || 0;
    this.angle = options.angle || 0;
    this.scale = options.scale || 1;
    this.order = options.order;

    this.flipHorizontal = options.flipHorizontal || false;
    this.flipVertical = options.flipVertical || false;

    this.transparent = options.transparent || 1;

    this.$dom = jQuery(`<div class="element"></div>`);
    this.$dom.addClass(this.elementType);
    this.$dom.data('dataElement', this);

    this.updateStyle();
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
      angle: this.getAngle(),
    };
  }

  setText(text: BaseTextChild) {
    this.text = text;
  }

  setSvg(svg: BaseSvgChild) {
    this.svg = svg;
  }

  setSelected(value: boolean) {
    this.selected = value;
  }

  getSelected() {
    return this.selected;
  }

  updateSelected(value: boolean) {
    this.setSelected(value);
    value ? this.$dom.addClass('selected') : this.$dom.removeClass('selected');
  }

  performFlipHorizontal(value: boolean) {
    this.flipHorizontal = value;
    this.$dom
      .find('.element-inner')
      .css(
        'transform',
        `scale(${this.flipHorizontal ? '-1' : '1'},${
          this.flipVertical ? '-1' : '1'
        })`
      );
  }

  performFlipVertical(value: boolean) {
    this.flipVertical = value;
    this.$dom
      .find('.element-inner')
      .css(
        'transform',
        `scale(${this.flipHorizontal ? '-1' : '1'},${
          this.flipVertical ? '-1' : '1'
        })`
      );
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

  setTransparent(value: number) {
    this.transparent = value;
    return this;
  }

  getTransparent() {
    return this.transparent;
  }

  updateTransparency(value) {
    this.setTransparent(value);
    const styles = {
      opacity: this.transparent,
    };
    this.$dom.css(styles);
  }

  setScale(value: number) {
    this.scale = value;
    return this;
  }

  getScale() {
    return this.scale;
  }

  updateScale(value) {
    this.setScale(value);
    const styles = {
      scale: this.scale,
    };
    this.$dom.css(styles);
  }

  setAngle(value: number) {
    this.angle = value;
    return this;
  }

  getAngle() {
    return this.angle;
  }

  updateAngle(value) {
    this.setAngle(value);
    const styles = {
      translate: `translate(${this.top}px, ${this.left}px) rotate(${this.angle}deg)`,
    };

    this.$dom.css(styles);
  }

  updateStyle() {
    const styles = {
      width: this.width,
      height: this.height,
      opacity: this.transparent,
      transform: `translate(${this.left}px, ${this.top}px) rotate(${this.angle}deg)`,
      scale: this.scale,
    };
    this.$dom.css(styles);
  }

  getData() {
    return {
      elementType: this.elementType,
      elementIndex: this.order,
      transparent: this.transparent,
      rotation: this.angle,
      width: this.width,
      height: this.height,
      top: this.top,
      left: this.left,
      scale: this.scale,
    };
  }

  updateSizeByFontsize(size: { width: number; height: number }) {
    this.setWidth(size.width);
    this.setHeight(size.height);
    this.$dom.css(size);
  }
}
