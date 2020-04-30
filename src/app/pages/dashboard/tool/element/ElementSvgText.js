import $ from 'jquery';
import ElementBase from './ElementBase';
import { SVG } from '@svgdotjs/svg.js';
import { load, Path } from 'opentype.js';
class ElementSvgText extends ElementBase {
  constructor(data) {
    super(data);
    this.code = 'string' === typeof data.code ? data.code : null;
    var dom = this.getDom();
    this.transparency = data.transparency;
    this.rotation = data.rotation;
    this.top = data.top;
    this.left = data.left;
    this.hasCode = !0;
    dom.addClass('textsvg');
    this.height = data.height;
    this.width = data.width;
    this.contents = data.contents;
    this.style = data.style;
    this.html = data.html;
    getStringSvg(this);

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
const ghost = ElementSvgText.prototype;

ghost.createDomSvg = function (data) {
  $(data).appendTo(this.getDom());
  this.$dom.css({ width: this.width });
  this.$dom.css({ height: this.height });
};

ghost.setColor1 = function (color) {
  this.style.color1 = color;
};

ghost.updateColor1 = function (color) {
  this.setColor1(color);
  this.$dom.find('[fill]').attr('fill', color);
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
  // getStringSvg(element);
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
  const value = Math.round(letterSpacing / 1000);
  this.setLetterSpacing(value);
  this.$dom.css('letter-spacing', value + 'em');
};

ghost.setUppercase = function (uppercase) {
  this.style.uppercase = uppercase;
};

ghost.updateUppercase = function (uppercase) {
  this.setUppercase(uppercase);
  this.$dom.css('text-transform', uppercase ? 'uppercase' : 'none');
};

function getStringSvg(element) {
  const options = {
    fontSize: element.style.fontSize,
    color: element.style.color,
    fontFamily: element.style.fontFamily,
  };
  const style = element.style;

  const fonts = [
    '/assets/UV-Akashi.ttf',
    '/assets/cantata-one-regular.otf',
    '/assets/Roboto-Thin.ttf',
    '/assets/UV-Agin.ttf',
  ];
  Text2svg.load(style.url, (text2svg) => {
    const path = text2svg.toPath(element.html, options);
    const width = path.width;
    const height = path.height;
    var draw = SVG().size('100%', '100%').viewbox(0, 0, width, height);

    draw.path(path.pathData);
    draw.fill(options.color);
    element.width = width;
    element.height = height;
    element.createDomSvg(draw.svg());
  });
}

export default ElementSvgText;

function Text2svg(font) {
  this.font = font;
}

Text2svg.load = function (url, callback) {
  load(url, function (err, font) {
    if (err) {
      throw err;
    } else {
      if (callback && typeof callback === 'function') {
        callback(new Text2svg(font));
      }
    }
  });
};

Text2svg.prototype.toPathData = function (text, options) {
  options = options || {};

  var kerning = options.kerning !== false;
  var divided = options.divided === true;
  var spacing = options.spacing || 0;
  var fontSize = options.fontSize || 72;
  var fontScale = (1 / this.font.unitsPerEm) * fontSize;

  var padding = parsePadding(options);
  var strokeWidth = getMaxStrokeWidth(options);

  var ascender = this.font.ascender * fontScale;
  var descender = this.font.descender * fontScale;
  var baseline = ascender + padding.top + strokeWidth * 2;
  var x = (options.x || 0) + padding.left;
  var y = (options.y || 0) + baseline;

  // auto spacing when stroke-width > 1
  if (strokeWidth > 1 && options.autoSpacing) {
    spacing += strokeWidth;
  }

  var paths = [];
  var glyphs = this.font.stringToGlyphs(text);
  let minY = 0;
  let maxY = 0;
  let minX = 0;
  let maxX = 0;

  for (var i = 0, l = glyphs.length; i < l; i++) {
    var glyph = glyphs[i];
    var box = glyph.getBoundingBox();
    if (minY > box.y1) {
      minY = box.y1;
    }
    if (maxY < box.y2) {
      maxY = box.y2;
    }
    if (i === 0) {
      minX = box.x1;
    }
  }
  ascender = maxY * fontScale;
  descender = minY * fontScale;
  baseline = ascender;

  x = (options.x || 0) + padding.left - minX * fontScale;
  y = (options.y || 0) + baseline;

  for (var i = 0, l = glyphs.length; i < l; i++) {
    var glyph = glyphs[i];

    var path = glyph.getPath(x, y, fontSize);
    paths.push(path);

    // update x position
    if (kerning && i < l - 1) {
      var kerningValue = this.font.getKerningValue(glyph, glyphs[i + 1]);

      x += kerningValue * fontScale;
      x += spacing;
    }
    if (glyph.advanceWidth) {
      x += glyph.advanceWidth * fontScale;
    }
  }

  var width = fixToInt(x + padding.right, 3);
  var height = fixToInt(ascender - descender, 3);
  var result = {
    glyphs: glyphs,
    width: width,
    height: height,
  };

  if (divided) {
    result.pathData = paths.map(function (path) {
      return path.toPathData();
    });
  } else {
    var full = new Path();

    paths.forEach(function (path) {
      full.extend(path);
    });
    result.pathData = full.toPathData();
  }

  return result;
};

Text2svg.prototype.toPath = function (text, options) {
  options = options || {};

  var attr = options.path;
  var result = this.toPathData(text, options);
  var pathData = result.pathData;

  if (Array.isArray(pathData)) {
    result.path = pathData.map(function (data, index) {
      if (!data) {
        return '';
      }
      var attrX = options['path' + index];
      return buildElement('path', mergeAttr(attr, attrX, { d: data }));
    });
  } else {
    result.path = buildElement('path', mergeAttr(attr, { d: pathData }));
  }

  return result;
};

Text2svg.prototype.toSVG = function (text, options) {
  options = options || {};

  var content = '';
  var title = options.title || text;
  var desc = options.desc;

  if (title) {
    content += buildElement('title', null, title);
  }

  if (desc) {
    content += buildElement('desc', null, desc);
  }

  // path
  var result = this.toPath(text, options);
  var path = result.path;
  var inner = path;

  if (Array.isArray(path)) {
    if (options.grouped !== false) {
      inner = buildElement('g', options.g, path.join(''));
    } else {
      inner = path.join('');
    }
  }

  content += inner;

  var x = options.x || 0;
  var y = options.y || 0;
  var width = result.width;
  var height = result.height;

  var attr = {
    version: '1.1',
    xmlns: 'http://www.w3.org/2000/svg',
    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
    role: 'img',
    width: width,
    height: height,
    viewbox: [x, y, width, height].join(' '),
  };

  if (options.svg) {
    attr = mergeAttr(attr, options.svg);
  }

  result.svg = buildElement('svg', attr, content);

  return result;
};

// helpers
// -------

function fixToInt(val, precision) {
  precision = precision || 2;

  var rounded = Math.round(val);
  if (rounded === val) {
    return '' + rounded;
  } else {
    var fixed = val.toFixed(precision);

    rounded = Math.round(fixed);

    if (rounded === +fixed) {
      return '' + rounded;
    }

    return Math.ceil(fixed);
  }
}

function parseAttr(attr) {
  var result = '';

  if (attr) {
    for (var name in attr) {
      if (
        {}.hasOwnProperty.call(attr, name) &&
        typeof attr[name] !== 'undefined'
      ) {
        var val = attr[name];

        if (typeof val === 'undefined' || (typeof val === 'string' && !val)) {
          continue;
        }

        result += ' ' + name + '="' + val + '"';
      }
    }
  }

  return result;
}

function mergeAttr() {
  var sources = [].slice.call(arguments);
  var result = {};
  sources.forEach(function (attr) {
    if (attr) {
      for (var name in attr) {
        if ({}.hasOwnProperty.call(attr, name)) {
          result[name] = attr[name];
        }
      }
    }
  });
  return result;
}

function getMaxStrokeWidth(options) {
  var max = 1;

  if (options) {
    for (var key in options) {
      if (key.match(/path(\d+)?/)) {
        var attr = options[key];
        var width = attr['stroke-width'];
        if (width) {
          max = Math.max(max, width);
        }
      }
    }
  }

  return max;
}

function parsePadding(options) {
  var raw = options.padding;

  var padding = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  if (raw) {
    if (typeof raw === 'object') {
      padding = mergeAttr(padding, raw);
    } else {
      raw = parseFloat(raw);
      if (!isNaN(raw)) {
        padding = {
          top: raw,
          left: raw,
          right: raw,
          bottom: raw,
        };
      }
    }
  }

  padding.top = options.paddingTop || options['padding-top'] || padding.top;
  padding.left = options.paddingLeft || options['padding-left'] || padding.left;
  padding.right =
    options.paddingRight || options['padding-right'] || padding.right;
  padding.bottom =
    options.paddingBottom || options['padding-bottom'] || padding.bottom;

  return padding;
}

function buildElement(tagName, attr, content) {
  return (
    '<' +
    tagName +
    parseAttr(attr) +
    '>' +
    (content || '') +
    '</' +
    tagName +
    '>'
  );
}
