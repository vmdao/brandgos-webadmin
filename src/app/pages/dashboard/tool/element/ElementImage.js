import $ from 'jquery';
import ElementBase from './ElementBase';
import mockData from '../mock';
const { mediaMap } = mockData;

class ElementImage extends ElementBase {
  constructor(data) {
    super(data);
    this.code = 'string' === typeof data.code ? data.code : null;
    var dom = this.getDom();
    this.transparency = data.transparency;
    this.rotation = data.rotation;
    this.top = data.top;
    this.left = data.left;
    this.hasCode = !0;
    dom.addClass('image');
    var innerElement = $('<div>').addClass('inner');
    innerElement.append($('<img>'));
    innerElement.appendTo(dom);
    var bucket = mediaMap[this.code];
    this.setUrlImgMedia(bucket.screen.url);
    this.height = data.height;
    this.width = data.width;

    this.$dom.css({
      width: this.width + 'px',
      height: this.height + 'px',
      transform:
        'translate3d(' +
        this.left +
        'px,' +
        this.top +
        'px,' +
        '0px)rotateZ(' +
        this.rotation +
        'deg)',
      contenteditable: false,
      opacity: this.transparency,
    });
    return this;
  }
}
const ghost = ElementImage.prototype;

ghost.setUrlImgMedia = function (url) {
  var img = this.getDom().find('img');
  img.attr('src', url);
};

export default ElementImage;
