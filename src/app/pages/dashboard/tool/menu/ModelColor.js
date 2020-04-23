import _ from 'lodash';
import $ from 'jquery';
import tinycolor from "tinycolor2";

export default class ColorModel {
    constructor(placePicker, observers = {}, colorDefault) {
        this.placePicker = $(placePicker);
        this.observers = observers;
        this.colorDefault = colorDefault || '#000';
        const color = {
            hex: this.colorDefault
        };

        this.throttle = _.throttle((fn, data, e) => {
            fn(data, e);
        }, 50);

        this.phantonColor = ['#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB',
            '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB'];

        this.onChangeCompete = this.onChangeCompete.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleChangeColor = this.handleChangeColor.bind(this);
        this.handleChangeHue = this.handleChangeHue.bind(this);
        this.handleMouseDownHue = this.handleMouseDownHue.bind(this);
        this.handleMouseDownColor = this.handleMouseDownColor.bind(this);
        this.handleClickPhantonColor = this.handleClickPhantonColor.bind(this);
        this.onChangeColor = this.onChangeColor.bind(this);
        this.onChangeHue = this.onChangeHue.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.dataColor = this.toState(color, 0);

        this.createHTML();
    }

    createHTML() {

        const saturationHtml = this.getHtmlSaturation();
        const optionHtml = this.getHtmlOption();
        this.$dom = $(`<div class="color-picker-box">
        <div class="color-picker" style="background:#fff; border-radius: 2px; box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px, rgba(0, 0, 0, 0.3) 0px 4px 8px; box-sizing: initial; width: 224px; font-family: Menlo;">
        ${saturationHtml}${optionHtml}</div></div>`);

        this.setEvent();
        this.onChangeHue(this.dataColor);
    }

    render() {
        this.$dom.appendTo(this.placePicker);
    }

    setEvent() {
        this.setEventSaturation();
        this.setEventHue();
        this.setEventPhanton();
        this.setEventInput();
    }

    closeColor() {
        this.$dom.detach();
    }

    openColor() {
        this.$dom.appendTo(this.placePicker);
    }

    setEventSaturation() {
        const saturation = this.$dom.find('.saturation-control')[0];
        saturation.addEventListener('mousedown', this.handleMouseDownColor);
    }

    setEventHue() {
        const hue = this.$dom.find('.option-hue-slider')[0];
        hue.addEventListener('mousedown', this.handleMouseDownHue);
    }

    setEventPhanton() {
        const phantonColors = this.$dom.find('.option-phanton-color');
        phantonColors.on('click', this.handleClickPhantonColor);
    }

    setEventInput() {
        const input = this.$dom.find('.option-input');
        input.on('change', this.handleChangeInput);
    }

    onChangeColor(data) {
        const isValidColor = this.simpleCheckForValidColor(data);
        if (isValidColor) {
            const colors = this.toState(data, data.h || this.dataColor.oldHue)
            this.dataColor = colors;
            this.handleChangePointer(colors);
            this.handleChangePointColor(colors);
            this.updateInput(colors);
            this.onChangeCompete(colors);
        }
    }

    onChangeHue(data) {
        const isValidColor = this.simpleCheckForValidColor(data);
        if (isValidColor) {
            const colors = this.toState(data, data.h || this.dataColor.oldHue)
            this.dataColor = colors;
            this.onChangeColor(data);
            this.handleChangeSlider(colors);
            this.handleChangePadColor(colors);
            this.updateInput(colors);
            this.onChangeCompete(colors);

        }
    }

    onChangeCompete(data) {
        typeof this.observers.onChangeCompete === 'function' && this.observers.onChangeCompete(data);
    }

    handleClickPhantonColor(e) {
        const hexColor = $(e.target).attr('data-color');
        this.onChangeHue({ hex: hexColor, source: 'hex' });
    }

    handleChangePadColor(data) {
        const saturation = this.$dom.find('.saturation-control');
        saturation.css({
            absolute: '0px 0px 0px 0px',
            background: `hsl(${data.hsl.h},100%, 50%)`,
            borderRadius: data.radius,
        })
    }

    handleChangePointer(e) {
        const pointer = this.$dom.find('.saturation-poiter')
        pointer.css({
            position: 'absolute',
            top: `${-(e.hsv.v * 100) + 100}%`,
            left: `${e.hsv.s * 100}%`,
            cursor: 'default',
        })
    }

    handleChangeSlider(e) {
        const slider = this.$dom.find('.option-hue-slider');
        slider.css({
            position: 'absolute',
            left: `${(e.hsl.h * 100) / 360}%`,
        })
    }

    handleChangePointColor(data) {
        this.$dom.find('.option-point-color').css('background', data.hex);
    }

    updateInput(data) {
        const input = this.$dom.find('.option-input');
        input.val(data.hex);
    }

    handleChangeInput(e) {
        const hexColor = $(e.target).val();
        this.onChangeHue({ hex: hexColor, source: 'hex' })
    }

    handleChangeColor(e, skip) {
        const saturation = this.$dom.find('.saturation-control')[0];
        this.throttle(
            this.onChangeColor,
            this.calculateChangeColor(e, skip, this.dataColor, saturation),
            e
        )
    }

    handleChangeHue(e, skip) {
        const hue = this.$dom.find('.option-hue')[0];
        const change = this.calculateChangeHue(e, skip, this.dataColor, hue);
        change && this.onChangeHue(change, e);
    }

    handleMouseDownColor(e) {
        this.handleChangeColor(e, true);
        window.addEventListener('mousemove', this.handleChangeColor);
        window.addEventListener('mouseup', this.handleMouseUp);
    }

    handleMouseDownHue(e) {
        this.handleChangeHue(e, true);
        window.addEventListener('mousemove', this.handleChangeHue);
        window.addEventListener('mouseup', this.handleMouseUp);
    }

    handleMouseUp() {
        this.unbindEventListeners()
    }

    unbindEventListeners() {
        window.removeEventListener('mousemove', this.handleChangeColor);
        window.removeEventListener('mousemove', this.handleChangeHue);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }

    getHtmlSaturation() {
        return `<div class="saturation-container" style="width: 100%; padding-bottom: 55%; position: relative; border-radius: 2px 2px 0px 0px; overflow: hidden;">
            <div class="saturation-control" style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; background: rgb(0, 102, 255);">
                <div style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; background: linear-gradient(to right, rgb(255, 255, 255), rgba(255, 255, 255, 0));">
                    <div style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; background: linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0));"></div>
                    <div  class="saturation-poiter" style="position: absolute; top: 100%; left: 0%; cursor: default;">
                        <div style="width: 12px; height: 12px; border-radius: 6px; box-shadow: rgb(255, 255, 255) 0px 0px 0px 1px inset; transform: translate(-6px, -6px);"></div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    getHtmlOption() {
        const phantonColorHtml = this.phantonColor.reduce((html, next) => {
            return html + `<span><div style="width: 24px; height: 24px;"><div class="option-phanton-color" data-color="${next}" style="background: ${next}; height: 100%; width: 100%; cursor: pointer;"></div></div></span>`;
        }, '');
        return `<div style="padding: 16px 16px 12px; position: relative">
            <div class="flexbox-fix" style="display: flex;">
                <div style="width: 22px;">
                    <div style="margin-top: 0px; width: 10px; height: 10px; border-radius: 8px; position: relative; overflow: hidden;">
                        <div class="option-point-color" style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; border-radius: 8px; box-shadow: rgba(0, 0, 0, 0.0980392) 0px 0px 0px 1px inset; background: rgb(0, 0, 0); z-index: 2;"></div>
                    </div>
                </div>
                <div style="-webkit-box-flex: 1; flex: 1 1 0%;">
                    <div style="height: 10px; position: relative; margin-bottom: 0px;">
                        <div class="option-hue" style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; background: linear-gradient(to right, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 17%, rgb(0, 255, 0) 33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 67%, rgb(255, 0, 255) 83%, rgb(255, 0, 0) 100%);">
                            <div style="margin: 0px 2px; position: relative; height: 100%;">
                                <div class="option-hue-slider" style="position: absolute; left: 60.1796%;">
                                    <div style="width: 12px; height: 12px; border-radius: 6px; transform: translate(-6px, -1px); background-color: rgb(248, 248, 248); box-shadow: rgba(0, 0, 0, 0.368627) 0px 1px 4px 0px;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flexbox-fix" style="padding-top: 16px; display: flex;">
                <div class="flexbox-fix" style="-webkit-box-flex: 1; flex: 1 1 0%; display: flex; margin-left: -6px;">
                    <div style="padding-left: 6px; width: 100%;">
                        <div style="position: relative;"><input class="option-input" value="#000000" style="font-size: 11px; color: rgb(51, 51, 51); width: 100%; border-radius: 2px; border: none; box-shadow: rgb(218, 218, 218) 0px 0px 0px 1px inset; height: 21px; text-align: center;">
                        </div>
                    </div>
                </div>
            </div>
            <div class="flexbox-fix" style="padding-top: 16px; display: flex; flex-wrap: wrap;">
                ${phantonColorHtml}
            </div>
        </div>`;
    }

    simpleCheckForValidColor(data) {
        const keysToCheck = ['r', 'g', 'b', 'a', 'h', 's', 'a', 'v']
        let checked = 0
        let passed = 0
        _.each(keysToCheck, (letter) => {
            if (data[letter]) {
                checked++
                if (!isNaN(data[letter])) {
                    passed++
                }
            }
        })
        return (checked === passed) ? data : false
    }

    toState(data, oldHue) {
        const color = data.hex ? tinycolor(data.hex) : tinycolor(data)
        const hsl = color.toHsl()
        const hsv = color.toHsv()
        if (hsl.s === 0) {
            hsl.h = oldHue || 0
            hsv.h = oldHue || 0
        }

        return {
            hsl,
            hex: `#${color.toHex()}`,
            rgb: color.toRgb(),
            hsv,
            oldHue: data.h || oldHue || hsl.h,
            source: data.source,
        }
    }

    isValidHex(hex) {
        return tinycolor(hex).isValid()
    }

    calculateChangeColor(e, skip, data, container) {
        !skip && e.preventDefault()
        const containerWidth = container.clientWidth
        const containerHeight = container.clientHeight
        const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX
        const y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY
        let left = x - (container.getBoundingClientRect().left + window.pageXOffset)
        let top = y - (container.getBoundingClientRect().top + window.pageYOffset)

        if (left < 0) {
            left = 0
        } else if (left > containerWidth) {
            left = containerWidth
        } else if (top < 0) {
            top = 0
        } else if (top > containerHeight) {
            top = containerHeight
        }

        const saturation = left * 100 / containerWidth
        const bright = -(top * 100 / containerHeight) + 100

        return {
            h: data.hsl.h,
            s: saturation,
            v: bright,
            a: data.hsl.a,
            source: 'rgb',
        }
    }

    calculateChangeHue(e, skip, props, container) {
        !skip && e.preventDefault()
        const containerWidth = container.clientWidth
        const containerHeight = container.clientHeight
        const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX
        const y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY
        const left = x - (container.getBoundingClientRect().left + window.pageXOffset)
        const top = y - (container.getBoundingClientRect().top + window.pageYOffset)

        if (props.direction === 'vertical') {
            let h
            if (top < 0) {
                h = 359
            } else if (top > containerHeight) {
                h = 0
            } else {
                const percent = -(top * 100 / containerHeight) + 100
                h = (360 * percent / 100)
            }

            if (props.hsl.h !== h) {
                return {
                    h,
                    s: props.hsl.s,
                    l: props.hsl.l,
                    a: props.hsl.a,
                    source: 'rgb',
                }
            }
        } else {
            let h
            if (left < 0) {
                h = 0
            } else if (left > containerWidth) {
                h = 359
            } else {
                const percent = left * 100 / containerWidth
                h = (360 * percent / 100)
            }

            if (props.hsl.h !== h) {
                return {
                    h,
                    s: props.hsl.s,
                    l: props.hsl.l,
                    a: props.hsl.a,
                    source: 'rgb',
                }
            }
        }
        return null
    }
}