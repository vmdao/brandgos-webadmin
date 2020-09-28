import { ImageElement } from './image.element';
import { loadImage } from 'blueimp-load-image';
export class ImageChild {
  parent: ImageElement;

  constructor(parent: ImageElement) {
    this.parent = parent;
  }

  render() {
    return this.updateImage();
  }

  updateImage() {
    return loadImage(this.parent.mediaUrl).then((data) => {
      console.log('image', data);
    });
  }
}
