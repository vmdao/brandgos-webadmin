import { BaseMenuItemUI } from '../../basebar/ui.asbtract';
import * as jQuery from 'jquery';
export class SliderOneUI extends BaseMenuItemUI {
  minAbs = 0;
  maxAbs = 0;
  lengthAbs = 0;
  constructor(options) {
    super(options);
    this.minAbs = Math.abs(this.context.min);
    this.maxAbs = Math.abs(this.context.max);
    this.lengthAbs = this.minAbs + this.maxAbs;

    this.htmlWrapper = `<li class="toolbar__item toolbar__item--slider
    ${this.code ? 'toolbar__item--' + this.code : ''}">
    </li>`;
    const percent = this.getPercentByValue(this.context.valueDefault);
    const htmlSlider = `<div class="aant-slider">
    <div class="aant-slider-rail"></div> 
    <div class="aant-slider-track"></div>
    <div class="aant-slider-step"></div>
    <div class="aant-slider-handle" style="left: ${percent}%"></div>
    <div class="aant-slider-mark"></div>
    </div>`;
    const htmlInput = `<input class="toolbar__sliderValue toolbar__sliderValue--${this.code}" type="number" min="${this.context.min}" max="${this.context.max}" step="${this.context.step}" value="${this.context.valueDefault}" disabled>`;
    this.html = `<div class="toolbar__sliderWrapper slider-box"><label class="toolbar__label toolbar__label--letterSpacing">${this.contentName}</label>${htmlSlider}${htmlInput}</div>`;
  }

  render() {
    this.$dom = jQuery(this.html);
    this.$domWrapper = jQuery(this.htmlWrapper);
    this.$domWrapper.append(this.$dom);
    this.setEvent();
    return this;
  }

  update() {
    // this.context.isActive
    //   ? this.$domWrapper.addClass('toolbar__item--active')
    //   : this.$domWrapper.removeClass('toolbar__item--active');
  }

  setEvent() {
    this.$dom
      .find('.aant-slider-handle')
      .on('mousedown', this.handleMouseDown.bind(this));
  }

  onChangeCompete(data) {
    const action = this.actions.find((a) => a.event === 'change');
    if (action) {
      action.command.execute(data.value);
    }
  }

  updateSliderHandle(data) {
    this.$dom.find('.aant-slider-handle').css('left', data.percent * 100 + '%');
  }

  updateInput(data: { value: number; percent: number }) {
    this.$dom.find('.toolbar__sliderValue').val(data.value.toFixed(0));
  }

  handleMouseDown(e) {
    const handleChange = (e) => {
      const container = this.$dom.find('.aant-slider-rail')[0];
      const data = container ? this.calculateChange(e, true, container) : null;
      if (data) {
        this.onChangeCompete(data);
        this.updateSliderHandle(data);
        this.updateInput(data);
      }
    };

    handleChange(e);

    const mouseup = () => {
      window.removeEventListener('mousemove', handleChange, true);
      window.removeEventListener('mouseup', mouseup, true);
    };

    window.addEventListener('mousemove', handleChange, true);
    window.addEventListener('mouseup', mouseup, true);
  }

  getPercentByValue(value) {
    return ((value + this.minAbs) / this.lengthAbs) * 100;
  }

  getValueByPercent(percent) {
    const root = this.minAbs / this.lengthAbs;

    if (percent > root) {
      const percentNew = (percent - root) / (1 - root);
      return percentNew * this.context.max;
    } else {
      if (root === 0) {
        return 0;
      }
      const percentNew = (root - percent) / root;
      return percentNew * this.context.min;
    }
  }

  calculateChange(e, skip, container) {
    !skip && e.preventDefault();

    const containerWidth = container.clientWidth;
    if (containerWidth <= 0) return;

    const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX;

    let left =
      x - (container.getBoundingClientRect().left + window.pageXOffset);
    if (left >= containerWidth) left = containerWidth;
    if (left <= 0) left = 0;

    const percent = left / containerWidth;
    const value = this.getValueByPercent(percent);
    return { percent, value };
  }
}
