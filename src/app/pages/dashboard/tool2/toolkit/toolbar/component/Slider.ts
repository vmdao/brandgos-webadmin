import $ from 'jquery';
import ModelBase from './ModelBase';

export default class ModelSlider extends ModelBase {
  constructor(where, observers = [], { min, max, step, valueDefault, name }) {
    super(where, observers);
    this.max = max;
    this.min = min;
    this.step = step;
    this.name = name;
    this.valueDefault = valueDefault;
    this.minAbs = Math.abs(this.min);
    this.maxAbs = Math.abs(this.max);
    this.lengthAbs = this.minAbs + this.maxAbs;
    this.createHTML();

    this.onChangeCompete = this.onChangeCompete.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.setEvent();
  }

  createHTML() {
    const html = `<li class="toolbar__item toolbar__item--slider">
        <label class="toolbar__label toolbar__label--letterSpacing">${
          this.name
        }</label>
        <div class="toolbar__sliderWrapper slider-box" style="width: 170px; height: 30px"> <div class="ant-slider" style="padding: 0; position: relative;margin: 9px 6px;height: 12px;border-radius: 5px;
        background-color: #e9e9e9;cursor: pointer;border-top: 4px solid #fff;
        border-bottom: 4px solid #fff; -webkit-transition: background-color .3s ease;transition: background-color .3s ease;">
        <div class="ant-slider-rail"></div>
        <div class="ant-slider-track" style="visibility: visible; position: absolute;left: 0;height: 4px;border-radius: 4px;
        background-color: #9fd2f6;z-index: 1;-webkit-transition: background-color .3s ease;transition: background-color .3s ease;"></div>
        <div class="ant-slider-step" style="position: absolute; width: 100%; height: 4px;background: transparent; z-index: 1;"></div>
        <div class="ant-slider-handle" style="position: absolute; margin-left: -7px;margin-top: -5px;width: 14px;height: 14px;cursor: pointer;border-radius: 50%;border: 2px solid #88c7f4;
         background-color: #fff; z-index: 2;-webkit-transition: border-color .3s ease,-webkit-transform .3s cubic-bezier(.18,.89,.32,1.28);transition: border-color .3s ease,-webkit-transform .3s cubic-bezier(.18,.89,.32,1.28);transition: border-color .3s ease,transform .3s cubic-bezier(.18,.89,.32,1.28);transition: border-color .3s ease,transform .3s cubic-bezier(.18,.89,.32,1.28),-webkit-transform .3s cubic-bezier(.18,.89,.32,1.28); left:${this.getPercentByValue(
           this.valueDefault
         )}%"></div>
        <div class="ant-slider-mark" style="position: absolute;top: 10px;left: 0;width: 100%;font-size: 12px;z-index: 3;"></div></div></div>
        <input class="toolbar__sliderValue toolbar__sliderValue--${
          this.name
        }" type="number" min="${this.min}" max="${this.max}" step="${
      this.step
    }" value="${this.valueDefault}" disabled="disabled">
        </li>`;

    this.setHTML(html);
    this.setDom($(html));
  }

  setEvent() {
    const slider = this.$dom.find('.ant-slider-handle');
    slider.on('mousedown', this.handleMouseDown);
  }

  handleChange(e, skip) {
    const container = this.$dom.find('.ant-slider-rail')[0];
    const data = container ? this.calculateChange(e, skip, container) : null;
    if (data) {
      this.onChangeCompete(data);
      this.updateSliderHandle(data);
      this.updateInput(data);
    }
  }

  onChangeCompete(data) {
    this.data = data;
    typeof this.observers.slider === 'function'
      ? this.observers.slider(this)
      : () => {};
  }

  updateSliderHandle(data) {
    this.$dom.find('.ant-slider-handle').css('left', data.percent * 100 + '%');
  }

  updateInput(data) {
    this.$dom.find('.toolbar__sliderValue').val(data.value);
  }

  handleMouseDown(e) {
    this.handleChange(e, true);
    window.addEventListener('mousemove', this.handleChange);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  getPercentByValue(value) {
    return ((value + this.minAbs) / this.lengthAbs) * 100;
  }

  getValueByPercent(percent) {
    const root = this.minAbs / this.lengthAbs;
    if (percent > root) {
      const percentNew = (percent - root) / (1 - root);
      return percentNew * this.max;
    } else {
      const percentNew = (root - percent) / root;
      return percentNew * this.min;
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

  handleMouseUp() {
    this.unbindEvent();
  }

  unbindEvent() {
    window.removeEventListener('mousemove', this.handleChange);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }
}
