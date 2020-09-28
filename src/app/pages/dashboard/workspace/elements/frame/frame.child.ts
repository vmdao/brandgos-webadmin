import * as loadframe from 'load-svg';
import { BaseSvgChild } from '../abstracts/base-svg-child.abstract';
import { FrameElement } from './frame.element';
export class FrameChild extends BaseSvgChild {
  parent: FrameElement;

  constructor(parent: FrameElement) {
    super(parent);
  }

  render() {
    return this.updateFrame();
  }

  updateFrame() {
    return new Promise((resolve, reject) => {
      loadframe(this.parent.mediaUrl, (err, framePath) => {
        if (err) {
          return reject(err);
        }

        this.$el.html(framePath);
        this.setColorName();
        return resolve({ status: 200, child: this });
      });
    });
  }
}
