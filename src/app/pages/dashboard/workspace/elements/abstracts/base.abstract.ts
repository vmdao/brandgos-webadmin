import * as jQuery from 'jquery';

import { BaseTextChild } from './base-text-child.abstract';
import { ELEMENT_TYPE } from '../const';

export abstract class BaseElement {
  $el: any;

  elementId: string;
  elementType: ELEMENT_TYPE | string;

  top: number;
  left: number;

  width: number;
  height: number;

  angle: number;
  transparent: number;

  flipHorizontal: number;
  flipVertical: number;

  scale = 1;
  order: number;

  locked = 0;

  background = 0;
  selected = 0;

  constructor(options: any) {
    this.elementId = options.elementId;
    this.elementType = options.elementType;

    this.top = options.top || 0;
    this.left = options.left || 0;

    this.width = options.width || 0;
    this.height = options.height || 0;

    this.angle = options.angle || 0;
    this.transparent = options.transparent || 100;

    this.scale = options.scale || 1;
    this.order = options.order || 1;

    this.locked = options.locked || 0;

    this.flipHorizontal = options.flipHorizontal || 0;
    this.flipVertical = options.flipVertical || 0;

    this.$el = jQuery(`<div class="element"></div>`);

    this.updateStyle();
  }

  appendTo(parent) {
    this.$el.appendTo(parent);
  }

  remove() {
    this.$el.remove();
  }

  empty() {
    this.$el.empty();
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

  setSelected(value: boolean) {
    this.selected = value ? 1 : 0;
  }

  getSelected() {
    return this.selected;
  }

  updateSelected(value: boolean) {
    this.setSelected(value);
    value ? this.$el.addClass('selected') : this.$el.removeClass('selected');
  }

  performFlipHorizontal(value: boolean) {
    this.flipHorizontal = value ? 1 : 0;
    this.$el
      .find('.element-inner')
      .css(
        'transform',
        `scale(${this.flipHorizontal ? '-1' : '1'},${
          this.flipVertical ? '-1' : '1'
        })`
      );
  }

  performFlipVertical(value: boolean) {
    this.flipVertical = value ? 1 : 0;
    this.$el
      .find('.element-inner')
      .css(
        'transform',
        `scale(${this.flipHorizontal ? '-1' : '1'},${
          this.flipVertical ? '-1' : '1'
        })`
      );
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
    this.$el.css(styles);
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
    this.$el.css(styles);
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

    this.$el.css(styles);
  }

  updateStyle() {
    const styles = {
      width: this.width,
      height: this.height,
      opacity: this.transparent,
      transform: `translate(${this.left}px, ${this.top}px) rotate(${this.angle}deg)`,
      scale: this.scale,
    };
    this.$el.css(styles);
  }

  getData() {
    return {
      elementId: this.elementId,
      elementType: this.elementType,

      top: this.top,
      left: this.left,

      width: this.width,
      height: this.height,

      angle: this.angle,
      transparent: this.transparent,

      scale: this.scale,
      order: this.order,
    };
  }

  updateSizeByFontsize(size: { width: number; height: number }) {
    this.setWidth(size.width);
    this.setHeight(size.height);
    this.$el.css(size);
  }
}
