import { BaseElement } from '../abstracts/base.abstract';
import { ImageChild } from './image.child';
import { SvgDTO } from './ImageDTO';
import { Image, ImageBox } from '../interfaces/has-image.interface';

export class ImageElement extends BaseElement implements Image {
  isBackground = 0;

  isWatermark: number;
  mediaId: string;
  imageBox: ImageBox | null;

  mediaUrl: string;
  borderRadius: number;

  image: ImageChild;

  constructor(params: SvgDTO) {
    super(params);
    this.mediaUrl = params.mediaUrl;

    this.isBackground = params.isBackground || 0;
    this.setImage(new ImageChild(this));
    this.render();
  }

  render() {}

  renderElement(child) {
    this.$el.append(child.$el);
    console.log('svg renderElement');
  }

  setImage(image: ImageChild) {
    this.image = image;
  }

  getData() {
    const baseData = super.getData();
    return {
      ...baseData,
      isBackground: this.isBackground,
      imageBox: this.imageBox,
      mediaUrl: this.mediaUrl,
      mediaId: this.mediaId,
      isWatermark: this.isWatermark,
    };
  }
}
