export const getStringTranform = (left, top, rotate) => {
  'undefined' === typeof rotate ? 0 : rotate;
  return (
    'translate3d(' + left + 'px,' + top + 'px, 0)rotateZ(' + rotate + 'deg)'
  );
};

export const getStyleChange = (
  typeCube,
  angle,
  oldX,
  oldY,
  mouseOldX,
  mouseOldY,
  oldWidth,
  oldHeight
) => {
  let typeIdentity, sin, cos, centerOldX, centerOldY;
  angle = parseFloat(angle);
  oldX = parseFloat(oldX);
  oldY = parseFloat(oldY);
  mouseOldX = parseFloat(mouseOldX);
  mouseOldY = parseFloat(mouseOldY);
  oldWidth = parseFloat(oldWidth);
  oldHeight = parseFloat(oldHeight);

  angle *= Math.PI / 180;

  cos = Math.cos(angle);
  sin = Math.sin(angle);

  if (cos < 0) {
    typeIdentity = cos < -0.5 ? 'cos' : 'sin';
  } else {
    typeIdentity = cos > 0.5 ? 'cos' : 'sin';
  }

  centerOldX = oldX + oldWidth / 2;
  centerOldY = oldY + oldHeight / 2;

  var getStyle = function (mouseNewX, mouseNewY, elementText) {
    mouseNewX = 'undefined' === typeof mouseNewX ? 0 : mouseNewX;
    mouseNewY = 'undefined' === typeof mouseNewY ? 0 : mouseNewY;
    var newWidth = 1,
      newHeight = 1,
      deltaLengX,
      deltaLengY,
      centerNewX,
      centerNewY,
      newX,
      newY;
    newHeight = elementText ? elementText.height() : 1;

    switch (typeCube) {
      case 3:
      case 5:
        newWidth =
          typeIdentity === 'cos'
            ? (mouseNewX - mouseOldX) * cos + oldWidth
            : (mouseNewY - mouseOldY) * sin + oldWidth;
        newHeight = (newWidth / oldWidth) * oldHeight;
        break;
      case 7:
      case 1:
        newWidth =
          typeIdentity === 'cos'
            ? (mouseOldX - mouseNewX) * cos + oldWidth
            : (mouseOldY - mouseNewY) * sin + oldWidth;
        newHeight = (newWidth / oldWidth) * oldHeight;
        break;
      case 4:
        newWidth =
          typeIdentity === 'cos'
            ? (mouseNewX - mouseOldX) * cos + oldWidth
            : (mouseNewY - mouseOldY) * sin + oldWidth;
        newHeight = oldHeight;
        break;
      case 8:
        newWidth =
          typeIdentity === 'cos'
            ? (mouseOldX - mouseNewX) * cos + oldWidth
            : (mouseOldY - mouseNewY) * sin + oldWidth;
        newHeight = oldHeight;
        break;
      case 2:
        newHeight =
          typeIdentity === 'cos'
            ? (mouseOldY - mouseNewY) * cos + oldHeight
            : (mouseNewX - mouseOldX) * sin + oldHeight;
        newWidth = oldWidth;
        break;
      case 6:
        newHeight =
          typeIdentity === 'cos'
            ? (mouseNewY - mouseOldY) * cos + oldHeight
            : (mouseOldX - mouseNewX) * sin + oldHeight;
        newWidth = oldWidth;
        break;
      case 10:
        newWidth =
          typeIdentity === 'cos'
            ? (mouseNewX - mouseOldX) * cos + oldWidth
            : (mouseNewY - mouseOldY) * sin + oldWidth;
        break;
      default:
        break;
    }

    newWidth <= 1 ? (newWidth = 1) : '';
    newHeight <= 1 ? (newHeight = 1) : '';
    deltaLengX = (newWidth - oldWidth) / 2;
    deltaLengY = (newHeight - oldHeight) / 2;

    switch (typeCube) {
      case 5:
        centerNewX = centerOldX + deltaLengX * cos - deltaLengY * sin;
        centerNewY = centerOldY + deltaLengX * sin + deltaLengY * cos;
        break;
      case 3:
        centerNewX = centerOldX + deltaLengX * cos + deltaLengY * sin;
        centerNewY = centerOldY + deltaLengX * sin - deltaLengY * cos;

        break;
      case 7:
        centerNewX = centerOldX - deltaLengX * cos - deltaLengY * sin;
        centerNewY = centerOldY - deltaLengX * sin + deltaLengY * cos;
        break;
      case 1:
        centerNewX = centerOldX - deltaLengX * cos + deltaLengY * sin;
        centerNewY = centerOldY - deltaLengX * sin - deltaLengY * cos;

        break;
      case 2:
        centerNewX = centerOldX - deltaLengX * cos + deltaLengY * sin;
        centerNewY = centerOldY + deltaLengX * sin - deltaLengY * cos;
        break;
      case 6:
        centerNewX = centerOldX - deltaLengX * cos - deltaLengY * sin;
        centerNewY = centerOldY - deltaLengX * sin + deltaLengY * cos;
        break;

      case 4:
        centerNewX = centerOldX + deltaLengX * cos + deltaLengY * sin;
        centerNewY = centerOldY + deltaLengX * sin + deltaLengY * cos;
        break;
      case 8:
        centerNewX = centerOldX - deltaLengX * cos - deltaLengY * sin;
        centerNewY = centerOldY - deltaLengX * sin + deltaLengY * cos;
        break;
      case 10:
        centerNewX = centerOldX + deltaLengX * cos - deltaLengY * sin;
        centerNewY = centerOldY + deltaLengX * sin + deltaLengY * cos;
        break;
      default:
        break;
    }

    newX = centerNewX - newWidth / 2;
    newY = centerNewY - newHeight / 2;
    return {
      newWidth: newWidth,
      newHeight: newHeight,
      newX: newX,
      newY: newY,
    };
  };
  return getStyle;
};

export const getStyleElementObject = (left, top, width, height, rotate) => {
  return {
    width: width + 'px',
    height: height + 'px',
    transform: getStringTranform(left, top, rotate),
  };
};

export const getAngle = (a, b, c, d) => {
  var e = 0;
  a === c
    ? (e = b > d ? 1.5 * Math.PI : 0.5 * Math.PI)
    : ((e = Math.atan((d - b) / (c - a))),
      a < c ? d < b && (e = 2 * Math.PI + e) : (e = Math.PI + e),
      isNaN(e) && (e = 0));
  return getRealAngle((180 * e) / Math.PI);
};

export const getRealAngle = (a) => {
  a %= 360;
  0 > a && (a += 360);
  return a;
};

export const clearnCssString = (a) => {
  a = a.target;
  'SPAN' === a.tagName &&
    (a.style.removeProperty('font-size'),
    a.style.removeProperty('background-color'),
    a.style.removeProperty('line-height'),
    a.style.removeProperty('letter-spacing'));
};

/* function util*/

/* Get New(width, height, x, y ) by rotate vs rasie width, height*/

// function Op(a) {
//     var b = a.attr("style"), c, d;
//     (c = b.match(/translate(3d)?\((-?[.\d]+)[^-.\d]+(-?[.\d]+)/)) ? (d = parseFloat(c[2]),
//         c = parseFloat(c[3])) : (d = parseFloat(a.css("left")),
//             c = parseFloat(a.css("top")));
//     var e = b.match(/width: ([.\d]+)/)
//         , g = b.match(/height: ([.\d]+)/)
//         , b = e ? parseFloat(e[1]) : a.width();
//     a = g ? parseFloat(g[1]) : a.height();
//     return new M(d, c, b, a)
// }

// function M() {

// }

// get String Rotate
// function $i(a) {
//     var b = a.Qc || 0
//         , c = a.Rc || 0
//         , d = void 0 === a.nf ? 1 : a.nf
//         , e = void 0 === a.gg ? 1 : a.gg
//         , g = a.rotateX || 0
//         , h = a.rotateY || 0;
//     a = a.rotateZ || 0;
//     var k = "translate3d(" + b + "px," + c + "px,0px)";

//     if (1 != d || 1 != e)
//         k += " scale(" + d + "," + e + ") ";
//     0 != g && (k += " rotateX(" + g + "deg)");
//     0 != h && (k += " rotateY(" + h + "deg)");
//     0 != a && (k += " rotateZ(" + a + "deg)");
//     return k
// }

// function PB(a) {
//     a = window.getComputedStyle(a);
//     return a.getPropertyValue("transform") || a.getPropertyValue("-webkit-transform")
// }

// function preSolutionString(preString) {
//     return preString.replace(/\n/gi, '<br>');
// }
