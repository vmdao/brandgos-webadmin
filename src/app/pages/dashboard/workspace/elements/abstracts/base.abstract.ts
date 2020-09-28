import * as jQuery from 'jquery';

import { ELEMENT_TYPE } from '../const';
import { ElementDTO } from './ElementDTO';

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

  selected = 0;

  constructor(params: ElementDTO) {
    this.elementId = params.elementId;
    this.elementType = params.elementType;

    this.top = params.top || 0;
    this.left = params.left || 0;

    this.width = params.width || 0;
    this.height = params.height || 0;

    this.angle = params.angle || 0;
    this.transparent = params.transparent || 100;

    this.order = params.order || 1;

    this.locked = params.locked || 0;

    this.flipHorizontal = params.flipHorizontal || 0;
    this.flipVertical = params.flipVertical || 0;

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
