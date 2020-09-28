export interface ImageBox {
  top: number;
  left: number;
  width: number;
  height: number;
}
export interface Image {
  isWatermark: number;
  mediaId: string;
  isBackground: number;
  imageBox: ImageBox | null;

  renderElement(child);
}
