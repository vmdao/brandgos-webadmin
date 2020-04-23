import $ from 'jquery';
import ElementBase from './ElementBase';
import mockData from '../mock';
const { mediaMap } = mockData;

class ElementSvg extends ElementBase {
  constructor(data) {
    super(data);
    this.code = 'string' === typeof data.code ? data.code : null;
    var dom = this.getDom();
    this.transparency = data.transparency;
    this.rotation = data.rotation;
    this.top = data.top;
    this.left = data.left;
    this.hasCode = !0;
    dom.addClass('svg');
    this.height = data.height;
    this.width = data.width;
    var c = $('<img class="placeholder" />');
    dom.append(c);
    var bucket = mediaMap[this.code];
    getStringSvg(this, bucket.screen.url);
    this.contents = data.contents;
    this.style = {};
    data.contents.forEach(function (element) {
      $(element).data('parentElement', this);
    });

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
const ghost = ElementSvg.prototype;

ghost.createDomSvg = function (data, replaceImg) {
  const childsText = this.contents
    ? this.contents.filter(function (element) {
        return 'text' === element.typeElement;
      })
    : [];
  const childsImage = this.contents
    ? this.contents.filter(function (element) {
        return 'image' === element.typeElement;
      })
    : [];
  if (vq(data, !0)) {
    var n = wq(),
      n = xq(data, n),
      q = $(n).filter('svg');
    var childsSVG = Aq(q);
  }
  q.appendTo(this.getDom());
};

ghost.setColor1 = function (color) {
  this.style.color1 = color;
};

ghost.updateColor1 = function (color) {
  this.setColor1(color);
  this.$dom.find('fill').val(color);
};

function getStringSvg(element, url) {
  function ajaxGetStringSvg(url) {
    var ajax = $.ajax({
      url: url,
      type: 'GET',
      dataType: 'text',
    });
    ajax.done(function (data) {
      element.createDomSvg(data);
    });
  }

  ajaxGetStringSvg(url);
}

export default ElementSvg;

var aA = /^data:image\/[^,;]+;base64,/;

function vq(a, b) {
  var c;
  a: {
    try {
      c = $.parseXML(a);
    } catch (d) {
      c = null;
      break a;
    }
    c = $(c.documentElement);
  }
  return !c || (!b && bA(c)) || cA(c) ? !1 : !0;
}

function bA(a) {
  return a
    .find('*')
    .addBack()
    .toArray()
    .some(function (a) {
      return -1 === Zz.indexOf(a.localName.toLowerCase());
    });
}

function cA(a) {
  return a
    .find('*')
    .addBack()
    .toArray()
    .some(function (a) {
      a = a.attributes;
      for (var c = 0; c < a.length; c++) {
        var d = a[c].name.toLowerCase(),
          e = 'xlink:href';
        if (e === d) {
          e = a[c].value;
          e = !('#' === e.charAt(0) || aA.test(e));
        }
      }
      return !1;
    });
}

function tw(a) {
  var b = a.indexOf('\x3csvg', 0),
    c = a.slice(0, b);
  -1 === c.toUpperCase().indexOf('\x3c!DOCTYPE') &&
    (a =
      c +
      '\x3c!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"\x3e\n' +
      a.slice(b));
  return a;
}

function vw(a) {
  function b(a) {
    return (
      0 !==
      a.filter(function (a) {
        return isNaN(a);
      }).length
    );
  }

  var c = ($($.parseXML(a)).find('svg').attr('viewBox') || '').split(/\s/);
  a = c.map(function (a, b) {
    return parseFloat(c[b]);
  });
  return 4 !== a.length || b(a) ? [] : a;
}

function uw(a) {
  function b(a) {
    a = g.attr(a);
    return 'undefined' === typeof a || '' === a
      ? NaN
      : parseFloat(a.replace(/[^0-9\.]/g, ''));
  }

  var c = $('#limbo'),
    d = !1;
  0 >= c.length &&
    ((c = $('<div id="limbo"/><div/>')), $('body').append(c), (d = !0));
  var e = $($.parseXML(a)),
    g,
    h,
    k,
    l,
    m;
  if (4 !== vw(a).length) {
    g = e.find('svg');
    if (!g) throw Error('SVG with no \x3csvg\x3e!');
    h = b('x');
    k = b('y');
    l = b('width');
    m = b('height');
    var n = e.find('svg');
    c.append(n);
    n = n.get(0).getBBox();
    isNaN(h) && (h = n.x);
    isNaN(k) && (k = n.y);
    isNaN(l) && (l = n.width);
    isNaN(m) && (m = n.height);
    e.remove();
    d && c.remove();
    c = ' viewBox\x3d"' + [h, k, l, m].join(' ') + '" ';
    d = a.indexOf('\x3csvg', 0) + 4;
    return a.substring(0, d) + c + a.substring(d);
  }
  return a;
}

function pq(a, b) {
  var c = [];
  if (0 === a.find(b).length) return c;
  var d = a.parent(),
    e = a.prev(),
    g = zq(a),
    h = $('<div></div>');
  h.appendTo($('#limbo'));
  h.css('width', g.C()).css('height', g.F());
  a.appendTo(h);
  a.attr('stroke', 'transparent').attr('stroke-width', 0).forceLayout();
  var k = a.get(0).getBoundingClientRect();
  $(b, a).each(function (a, b) {
    var d = $(b).clone();
    d.attr('fill', 'transparent')
      .appendTo($(b).parents('g, svg').first())
      .forceLayout();
    var e = te(d.get(0).getBoundingClientRect());
    d.remove();
    e.translate(-k.left, -k.top);
    c.push(e);
  });
  0 < d.length
    ? 0 < e.length
      ? a.insertAfter(e)
      : a.prependTo(d)
    : a.detach();
  h.remove();
  return c;
}

function Aq(a, b) {
  var c = $(),
    d = pq(a, '.textPlaceholder'),
    e = $('.canva .textPlaceholder', a);
  d.forEach(function (a, d) {
    var k = e.eq(d),
      l = k.data() || {},
      m = $(
        [
          '\x3cdiv class\x3d"text"\x3e\x3cdiv class\x3d"inner"\x3e',
          l.placeholderText || b.format('documentSvgPlaceholderText'),
          '\x3c/div\x3e\x3c/div\x3e',
        ].join('')
      );
    m.data('textIndex', d)
      .data('placeholderElement', k)
      .data('placeholderText', l.placeholderText)
      .data('rect', a)
      .data('justification', l.justification || 'center')
      .css('text-align', l.justification || 'center')
      .data('fontSize', l.fontSize || 24)
      .css('font-size', (l.fontSize || 24) * Ab + '%')
      .data('defaultFontSize', l.fontSize || 24)
      .data('original-fill', l.fill)
      .data('is-primary-color', l.fill && Ep.equals(R(l.fill)))
      .data('is-secondary-color', l.fill && Fp.equals(R(l.fill)))
      .data('is-tertiary-color', l.fill && Gp.equals(R(l.fill)))
      .data('fill', l.fill)
      .css('color', l.fill || '')
      .data('fontName', l.fontName)
      .data('fontFamily', l.fontFamily)
      .css('font-family', l.fontFamily ? l.fontFamily : '')
      .data('bold', l.bold)
      .data('italic', l.italic)
      .data('lineSpacing', l.lineSpacing || 1.2)
      .css('line-height', l.lineSpacing || 1.2)
      .data('dynamicFontSize', l.dynamicFontSize)
      .data('dynamicHeight', l.dynamicHeight)
      .data('dynamicWidth', l.dynamicWidth);
    0 <
      k.parents().filter(function () {
        return this.classList.contains('stack');
      }).length || Oq(m);
    k = new Pq(m, 0, 0);
    m.data('designObject', k);
    c = c.add(m);
  });
  return c;
}

var Lq = 0;

function wq() {
  Lq = Lq === Math.pow(2, 53) ? 0 : Lq + 1;
  return 'CANVA' + Lq + '_';
}

function Zz() {}

function zq() {}

function te() {}

function Ab() {}

function Ep() {}

function R() {}

function Fp() {}

function Gp() {}

function Oq() {}

function Pq() {}

function xq(a, b) {
  var c = a.trim();
  c = c.replace(/SVGID_/g, b + 'SVGID_');
  c = c.replace(/font-size\s*:\s*\d+\.?\d*(?=[\s;"])/g, '$\x26px');
  c = tw(c);
  return (c = uw(c));
}
