import { BaseSvgChild } from '../abstracts/base-svg-child.abstract';
import { BaseElement } from '../abstracts/base.abstract';
import { Color } from '../abstracts/color';
import { Frame } from '../interfaces/has-frame.interface';
import { FrameChild } from './frame.child';
import { FrameDTO } from './FrameDTO';

export class FrameElement extends BaseElement implements Frame {
  isBackground = 0;

  colors: Array<Color> = [];
  strokeWidth: number;
  strokeColor: string;

  mediaUrl: string;
  borderRadius: number;

  frame: BaseSvgChild;

  constructor(params: FrameDTO) {
    super(params);
    this.mediaUrl = params.mediaUrl;
    this.isBackground = params.isBackground || 0;
    this.setFrame(new FrameChild(this));
    this.render();
  }

  render() {
    this.frame.updateSvg().then((data) => {
      this.renderElement(data.child);
    });
  }

  renderElement(child) {
    this.$el.append(child.$el);
    console.log('frame renderElement');
  }

  setFrame(frame: BaseSvgChild) {
    this.frame = frame;
  }

  updateSvg() {
    this.frame.updateSvg();
  }

  getData() {
    const baseData = super.getData();
    return {
      ...baseData,
      colors: this.colors,
      strokeWidth: this.strokeWidth,
      strokeColor: this.strokeColor,
      borderRadius: this.borderRadius,
    };
  }
}
