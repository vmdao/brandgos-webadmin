import $ from 'jquery';
import ElementBase from './ElementBase';

class ElementText extends ElementBase {
  constructor(data) {
    super(data);
    this.style = data.style;
    this.elementIndex = data.elementIndex;
    this.rotation = data.rotation;
    this.top = data.top;
    this.left = data.left;
    this.hasCode = !1;
    this.height = data.height;
    this.width = data.width;
    this.html = data.html;
    var innerElement = $('<div>').addClass('inner');
    innerElement.css({
      width: this.width + 'px',
      'transform-origin': 'left top 0px',
      transform: 'translateY(0em) scale(1)',
      opacity: this.transparency,
    });
    this.$dom.css({
      'font-size': this.style.fontSize + 'px',
    });
    innerElement.html(this.html);
    innerElement.appendTo(this.$dom);
    // var heightReal = innerElement.innerHeight();
    this.$dom.addClass('text').css({
      width: this.width + 'px',
      transform:
        'translate3d(' +
        this.left +
        'px,' +
        this.top +
        'px,0px)rotateZ(' +
        this.rotation +
        'deg)',
      opacity: this.tranparency,
      color: this.style.color,
      'font-family': this.style.fontFamily,
      'text-transform': this.style.uppercase ? 'uppercase' : 'none',
    });
    return this;
  }
}

const ghost = ElementText.prototype;

ghost.setHtml = function (html) {
  this.html = html;
};

ghost.setFontSize = function (fontSize) {
  this.style.fontSize = fontSize;
};

ghost.setFontFamily = function (fontFamily) {
  this.style.fontFamily = fontFamily;
};

ghost.setFontColor = function (fontColor) {
  this.style.color = fontColor;
};

ghost.updateColor = function (color) {
  this.setFontColor(color);
  this.$dom.css('color', color);
};

ghost.setFontAlign = function (align) {
  this.style.align = align;
};

ghost.updateTextAlign = function (textAlign) {
  this.setFontAlign(textAlign);
  this.$dom.css('text-align', this.style.align);
};

ghost.updateFontsize = function (fontSize) {
  this.setFontSize(fontSize);
  this.$dom.css('font-size', this.style.fontSize);
};

ghost.updateFontFamily = function (fontFamily) {
  this.setFontFamily(fontFamily);
  this.$dom.css('font-family', this.style.fontFamily);
};

ghost.setLineHeight = function (lineHeight) {
  this.style.lineHeight = lineHeight;
};

ghost.updateLineHeight = function (lineHeight) {
  this.setLineHeight(lineHeight);
  this.$dom.css('line-height', this.style.lineHeight);
};

ghost.setLetterSpacing = function (letterSpacing) {
  this.style.letterSpacing = letterSpacing;
};

ghost.updateLetterSpacing = function (letterSpacing) {
  this.setLetterSpacing(letterSpacing / 1000);
  this.$dom.css('letter-spacing', this.style.letterSpacing + 'em');
};

ghost.setUppercase = function (uppercase) {
  this.style.uppercase = uppercase;
};

ghost.updateUppercase = function (uppercase) {
  this.setUppercase(uppercase);
  this.$dom.css('text-transform', uppercase ? 'uppercase' : 'none');
};

export default ElementText;
