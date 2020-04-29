import * as $ from 'jquery';
import _ from 'lodash';
import FontLoader from 'webfontloader';

import WorkspaceView from './workspace/WorkspaceView';
import Workspace from './workspace/Workspace';

import WorkspaceAngelView from './workspaceAngel/WorkspaceAngelView';
import WorkspaceAngel from './workspaceAngel/WorkspaceAngel';
import EventElement from './element/EventElement';

import Menu from './menu';
import StoreBarView from './storeBar';
import AngelView from './angel';
import mockData from './mock';
import {
  getStringTranform,
  getStyleChange,
  getAngle,
  getStyleElementObject,
  clearnCssString,
} from './utils';
var { localStorages } = mockData;
import Editor from './menu/editor';
var url = 'http://api.uplevo.com:8080';
var cacheFonts = [];
let globals;

export default {
  init() {
    var angelView = new AngelView({ position: '#content' });
    angelView.render();

    var workspaceModel = new Workspace(localStorages);

    var workspaceView = new WorkspaceView({ model: workspaceModel });

    var workspaceAngel = new WorkspaceAngel({ workspace: workspaceModel });

    var workspaceAngelView = new WorkspaceAngelView({
      model: workspaceAngel,
      workspaceView: workspaceView,
    });

    // var storeBarView = new StoreBarView({ angel: angelView, workspaceView });

    // storeBarView.render();

    initEvent();
    new Editor('#designtool');

    function initEvent() {
      $('#angleWorkspace')
        .on('keydown', '.element.text.focused', onInputElementKeyDown)
        .on('input', '.element.text.focused', onInputContentElement)
        .on('change', '.element.text.focused', onSetHeightBox);
      $('#zone-left').on(
        'DOMNodeInserted',
        '.element.text.focused',
        clearnCssString
      );
      $('#zone-left').on('mousedown', checkElementSelected);
      // (new EventElement("#workspace").on("mousedown", ".element", beforKeyUp).on("touchstart", ".element", beforKeyUp));
      new EventElement('#zone-left')
        .on('click', '.element.focused', focusedMouseDown)
        .on('mousedown', '.element.focused', focusedMouseDown)
        .on('touchstart', '.element.focused', focusedMouseDown)
        .on('mousedown', '.element:not(.focused)', elementMouseDown)
        .on('touchstart', '.element:not(.focused)', elementMouseDown);

      //(new EventElement("#left"));
      new EventElement('#zone-right').on(
        'mousedown',
        '.item',
        elementItemMouseDown
      );
      new EventElement('#zone-left')
        .on('mousedown', '.selectedBound', ghostElementMouseDown)
        .on('touchstart', '.selectedBound', ghostElementMouseDown);
      new EventElement('#zone-left')
        .on('mousedown', '.selectedBound .cube', cubeMouseDown)
        .on('touchstart', '.selectedBound .cube', cubeMouseDown);
      new EventElement('#zone-left')
        .on('mousedown', '.selectedBound .rotate', rotateMouseDown)
        .on('touchstart', '.selectedBound .rotate ', rotateMouseDown);
    }

    function checkElementSelected(event) {
      if (unSelected(event)) {
        workspaceModel &&
          workspaceModel.getElements().forEach(removeElementSelected);
      }
    }

    function unSelected(event) {
      return (
        event.currentTarget.id !== 'zone-left' ||
        (event.currentTarget.id === 'zone-left' &&
          (event.target.id === 'areaWorkspace' ||
            event.target.id === 'elements' ||
            event.target.id === 'zone-left'))
      );
    }

    function removeElementSelected(element) {
      if (element.getDom().hasClass('selected')) {
        var menuElement = element.getDom().data('menuElement');
        element.setSelected(!1);
        element.getDom().removeClass('selected');
        if (element.getDom().hasClass('text')) {
          element.getDom().removeClass('focused');
          element.getDom().insertAfter($('.element:eq(3)'));
          element.getDom().children('.inner').attr('contenteditable', false);
        }
        element.remove();
        menuElement.$dom ? menuElement.detach() : 1;
      }
    }

    function beforKeyUp(event) {
      return !0;
    }

    function elementItemMouseDown(event) {
      function setEventMouseMove(event) {
        var deltaX = 0,
          deltaY = 0;

        mouseX =
          void 0 !== event.clientX
            ? event.clientX
            : event.originalEvent.touches[0].clientX;
        mouseY =
          void 0 !== event.clientY
            ? event.clientY
            : event.originalEvent.touches[0].clientY;

        deltaX = mouseX - mouseStartX;
        deltaY = mouseY - mouseStartY;

        currentLeft = startX + deltaX;
        currentTop = startY + deltaY;

        angelView.updatePosition(mouseX, mouseY);
        return !1;
      }

      function setEventMouseUp(event) {
        console.log(1234);
        eventDocument
          .off('mousemove|touchmove', setEventMouseMove)
          .off('mouseup|touchend', setEventMouseUp);
        if (currentLeft === mouseX && mouseY === currentTop) {
          var data = {
            code: '-JTDmx5Qdl1',
            type: 'UplevoImage',
            typeElement: 'image',
            userEdited: true,
            elementIndex: 0,
            transparency: 1,
            rotation: 0.0,
            width: 852 / 3,
            height: 441 / 3,
            top: 500 / 2,
            left: 200 / 2,
            mediaId: null,
            pathFile: 'photo2.png',
            imageBox: {
              left: 0.0,
              top: 0.0,
              width: 0.0,
              height: 0.0,
            },
            imageFillter: {
              name: null,
            },
            background: false,
          };

          workspaceView.model.createElement(data);
        }
        var rect = workspaceView.el.getBoundingClientRect();
        if (angelView.checkIntersect(rect)) {
          var position = angelView.getPositionIntersect(rect);
          var data = {
            code: '-JTDmx5Qdl1',
            type: 'UplevoImage',
            typeElement: 'image',
            userEdited: true,
            elementIndex: 0,
            transparency: 1,
            rotation: 0.0,
            width: position.width * position.scale,
            height: position.height * position.scale,
            top: position.top,
            left: position.left,
            mediaId: null,
            pathFile: 'photo2.png',
            imageBox: {
              left: 0.0,
              top: 0.0,
              width: 0.0,
              height: 0.0,
            },
            imageFillter: {
              name: null,
            },
            background: false,
          };
          workspaceView.model.createElement(data);
        }

        angelView.$el.css('display', 'none');
        elementTarget.css('visibility', '');
      }

      if (3 === event.which || event.ctrlKey) return !0;

      var elementTarget = $(event.target);
      elementTarget.css('visibility', 'hidden');
      var dataElement = elementTarget.data('item');
      var data = dataElement.files.SCREEN;

      var mouseStartX =
          void 0 !== event.clientX
            ? event.clientX
            : event.originalEvent.touches[0].clientX,
        mouseStartY =
          void 0 !== event.clientY
            ? event.clientY
            : event.originalEvent.touches[0].clientY,
        mouseX = 0,
        mouseY = 0,
        startX = 0,
        startY = 0,
        currentTop = 0,
        currentLeft = 0;

      data.pageX = mouseStartX;
      data.pageY = mouseStartY;
      data.x = event.target.x;
      data.y = event.target.y;
      angelView.createInner(data);
      angelView.$el.css('display', 'block');
      var eventDocument = new EventElement($(document));
      eventDocument
        .on('mousemove|touchmove', setEventMouseMove)
        .on('mouseup|touchend', setEventMouseUp);
      return !1;
    }

    function elementMouseDown(event) {
      function setEventMouseMove(event) {
        var deltaX = 0,
          deltaY = 0;

        mouseX =
          void 0 !== event.clientX
            ? event.clientX
            : event.originalEvent.touches[0].clientX;
        mouseY =
          void 0 !== event.clientY
            ? event.clientY
            : event.originalEvent.touches[0].clientY;

        deltaX = mouseX - mouseStartX;
        deltaY = mouseY - mouseStartY;

        currentLeft = startX + deltaX;
        currentTop = startY + deltaY;

        if (dataElement.getSelected() && ghostElement) {
          ghostElement.css(
            'transform',
            getStringTranform(currentLeft, currentTop, rotateStart)
          );
        }

        elementSelect.css(
          'transform',
          getStringTranform(currentLeft, currentTop, rotateStart)
        );

        return !1;
      }

      function setEventMouseUp(event) {
        eventDocument
          .off('mousemove|touchmove', setEventMouseMove)
          .off('mouseup|touchend', setEventMouseUp);
        if (currentLeft === mouseX && mouseY === currentTop) {
          if (!dataElement.getSelected()) {
            createSelectedElement(elementSelect);
            dataElement.setSelected(!0);
          }
        } else {
          dataElement.setPosition(currentLeft, currentTop);
        }
      }

      if (3 === event.which || event.ctrlKey) return !0;

      var eventTarget = $(event.target),
        // isParentGroup = eventTarget.parents(".group"),
        // isElement = eventTarget.is(".element"),
        // isGroup = eventTarget.is(".group"),
        isText = eventTarget.is('.text'),
        elementSelect = isText ? eventTarget.closest('.element') : $(this),
        ghostElement = $(event.currentTarget).hasClass('selectedBound')
          ? $(event.currentTarget)
          : !1;

      var dataElement = elementSelect.data('dataElement'),
        menuElement = dataElement.getDom().data('menuElement'),
        // bounding = elementSelect.get(0).getBoundingClientRect(),
        startX = dataElement.getLeft(),
        startY = dataElement.getTop(),
        mouseStartX =
          void 0 !== event.clientX
            ? event.clientX
            : event.originalEvent.touches[0].clientX,
        mouseStartY =
          void 0 !== event.clientY
            ? event.clientY
            : event.originalEvent.touches[0].clientY,
        mouseX = 0,
        mouseY = 0,
        currentTop = 0,
        currentLeft = 0,
        rotateStart = dataElement.getRotate();

      elementSelect.data('startX', startX);
      elementSelect.data('startY', startY);
      menuElement && menuElement.hideSubmenu();
      dataElement.getSelected() ? '' : checkElementSelected(event);

      var eventDocument = new EventElement($(document));
      eventDocument
        .on('mousemove|touchmove', setEventMouseMove)
        .on('mouseup|touchend', setEventMouseUp);
      return !1;
    }

    function ghostElementMouseDown(event) {
      var element = $(this).data('element');
      var dataElement = element.data('dataElement');
      if (dataElement) {
        $(this).css('visibility', 'hidden');
        var innerElement = document.elementFromPoint(
            void 0 !== event.clientX
              ? event.clientX
              : event.originalEvent.touches[0].clientX,
            void 0 !== event.clientY
              ? event.clientY
              : event.originalEvent.touches[0].clientY
          ),
          boundElement = $(innerElement).closest('.element').get(0);
        boundElement
          ? ((event.target = innerElement), (element = boundElement))
          : ((element = element.get(0)), (event.target = element));
        $(this).css('visibility', '');
      } else {
        return false;
      }
      elementMouseDown.call(element, event);
    }

    function cubeMouseDown(event) {
      // lang -60.5352deg
      function getTypeCube(cube) {
        return cube.hasClass('tl')
          ? 1
          : cube.hasClass('t')
          ? 2
          : cube.hasClass('tr')
          ? 3
          : cube.hasClass('r')
          ? 4
          : cube.hasClass('br')
          ? 5
          : cube.hasClass('b')
          ? 6
          : cube.hasClass('bl')
          ? 7
          : cube.hasClass('l')
          ? 8
          : 0;
      }

      function setEventMouseMove(event) {
        var styleChangeNew;
        mouseX =
          void 0 !== event.clientX
            ? event.clientX
            : event.originalEvent.touches[0].clientX;
        mouseY =
          void 0 !== event.clientY
            ? event.clientY
            : event.originalEvent.touches[0].clientY;

        isText
          ? (styleChangeNew = styleChange(mouseX, mouseY, elementSelect))
          : (styleChangeNew = styleChange(mouseX, mouseY));
        if (dataElement.getSelected() && ghostElement) {
          if (isText) {
            elementSelect.trigger('change');
          }
          var value = getStyleElementObject(
            styleChangeNew.newX,
            styleChangeNew.newY,
            styleChangeNew.newWidth,
            styleChangeNew.newHeight,
            rotate
          );
          ghostElement.css(value);
          elementSelect.css(value);
          if (isText) {
            elementSelect
              .children('.inner')
              .css('width', styleChangeNew.newWidth);
          }
        }

        dataElement.setStyle(
          styleChangeNew.newX,
          styleChangeNew.newY,
          styleChangeNew.newWidth,
          styleChangeNew.newHeight,
          rotate
        );
        return !1;
      }

      function setEventMouseUp(event) {
        eventDocument
          .off('mousemove|touchmove', setEventMouseMove)
          .off('mouseup|touchend', setEventMouseUp);
        if (!isText) {
          return;
        }
        var newSize = getLimitWidthBox(elementSelect);
        dataElement.setWidth(newSize.width);
        dataElement.setHeight(newSize.height);
      }

      function getLimitWidthBox(elementSelect) {
        var inner = $(elementSelect).children('.inner');
        var minWidth = inner.width();
        inner.css('display', 'inline');
        if (minWidth < inner.width()) {
          elementSelect.width(inner.width());
        }
        inner.css('display', '');
        inner.width(elementSelect.width());
        elementSelect.height(inner.height());
        ghostElement.css({
          width: elementSelect.width(),
          height: elementSelect.height(),
        });
        return {
          width: inner.width(),
          height: inner.height(),
        };
      }

      if (3 === event.which || event.ctrlKey) return !0;
      var cube = $(this);
      cube.addClass('on');
      var ghostElement = cube.parents('.selectedBound'),
        elementSelect = ghostElement.data('element'),
        dataElement = elementSelect.data('dataElement'),
        mouseStartX =
          void 0 !== event.clientX
            ? event.clientX
            : event.originalEvent.touches[0].clientX,
        mouseStartY =
          void 0 !== event.clientY
            ? event.clientY
            : event.originalEvent.touches[0].clientY,
        mouseX = 0,
        mouseY = 0,
        // ratioSizeElement = dataElement.getWidth() / dataElement.getHeight(),
        rotate = dataElement.getRotate(),
        isText = $(elementSelect).hasClass('text'),
        typeCube = getTypeCube(cube),
        styleChange = getStyleChange(
          typeCube,
          rotate,
          dataElement.getLeft(),
          dataElement.getTop(),
          mouseStartX,
          mouseStartY,
          dataElement.getWidth(),
          dataElement.getHeight()
        );

      var eventDocument = new EventElement($(document));
      eventDocument
        .on('mousemove|touchmove', setEventMouseMove)
        .on('mouseup|touchend', setEventMouseUp);
      return !1;
    }

    function rotateMouseDown(event) {
      function setEventMouseMove(event) {
        mouseX =
          void 0 !== event.clientX
            ? event.clientX
            : event.originalEvent.touches[0].clientX;
        mouseY =
          void 0 !== event.clientY
            ? event.clientY
            : event.originalEvent.touches[0].clientY;

        angleNew =
          rotateStart +
          getAngle(matrixX, matrixY, mouseX, mouseY) -
          rotateMouseStart;

        var angleModulo = angleNew % 45;
        0 > angleModulo && (angleModulo += 45);

        var angleTrend = angleNew > rotateStart,
          angleQuaterX = angleTrend && 42 < angleModulo;
        // angleQuaterY = 3 > angleModulo || 42 < angleModulo;
        angleTrend = !angleTrend && 3 > angleModulo;
        angleQuaterX
          ? (angleNew = angleNew + 45 - angleModulo)
          : angleTrend && (angleNew -= angleModulo);

        if (dataElement.getSelected() && ghostElement) {
          var value = getStringTranform(startX, startY, angleNew);
          ghostElement.css('transform', value);
          elementSelect.css('transform', value);
        }
        dataElement.setRotate(angleNew);
        return !1;
      }

      function setEventMouseUp(event) {
        setCusorType();
        eventDocument
          .off('mousemove|touchmove', setEventMouseMove)
          .off('mouseup|touchend', setEventMouseUp);
      }

      function setCusorType() {
        var cusorType =
          (angleNew >= -23 && angleNew < 25) ||
          (angleNew >= 337 && angleNew <= 359)
            ? 'otega0'
            : angleNew >= 25 && angleNew < 67
            ? 'otega1'
            : angleNew >= 67 && angleNew < 113
            ? 'otega2'
            : angleNew >= 113 && angleNew < 158
            ? 'otega3'
            : angleNew >= 158 && angleNew < 203
            ? 'otega4'
            : (angleNew >= 203 && angleNew < 247) ||
              (angleNew <= -113 && angleNew > -157)
            ? 'otega5'
            : (angleNew >= 247 && angleNew < 292) ||
              (angleNew <= -68 && angleNew > -113)
            ? 'otega6'
            : 'otega7';

        [0, 1, 2, 3, 4, 5, 6, 7].forEach((number) => {
          ghostElement.removeClass('otega' + number);
        });

        ghostElement.addClass(cusorType);
      }

      if (3 === event.which || event.ctrlKey) return !0;
      var cube = $(this);
      cube.addClass('on');
      var ghostElement = cube.parents('.selectedBound'),
        elementSelect = ghostElement.data('element'),
        dataElement = elementSelect.data('dataElement'),
        elementOffset = elementSelect.offset(),
        matrixX = elementOffset.left + dataElement.getWidth() / 2,
        matrixY = elementOffset.top + dataElement.getHeight() / 2,
        startX = dataElement.getLeft(),
        startY = dataElement.getTop(),
        mouseX =
          void 0 !== event.clientX
            ? event.clientX
            : event.originalEvent.touches[0].clientX,
        mouseY =
          void 0 !== event.clientY
            ? event.clientY
            : event.originalEvent.touches[0].clientY,
        rotateMouseStart = getAngle(matrixX, matrixY, mouseX, mouseY),
        angleNew = 0,
        rotateStart = dataElement.getRotate();

      elementSelect.data('rotateStart', rotateStart);

      var eventDocument = new EventElement($(document));
      eventDocument
        .on('mousemove|touchmove', setEventMouseMove)
        .on('mouseup|touchend', setEventMouseUp);
      return !1;
    }

    function focusedMouseDown(event) {
      event.stopPropagation();
    }

    function onPaste(a) {
      if (document.queryCommandSupported('ms-pasteContentOnly'))
        document.execCommand('ms-pasteContentOnly');
      else if (
        document.queryCommandSupported('insertHTML') &&
        a.originalEvent.clipboardData
      ) {
        var b = a.originalEvent.clipboardData.getData('text/plain');
        b = _.escape(b)
          .replace(/\r?\n/g, '\x3cbr\x3e')
          .replace(/ {2}/g, ' \x26nbsp;');
        document.execCommand('insertHTML', !1, b);
      } else throw Error('Beware! Unsupported browser. Sneaking around.');
      a.preventDefault();
    }

    function onInputContentElement(event) {
      var element = $(this),
        dataElement = element.data('dataElement');
      dataElement.setHtml(element.children('.inner').html());
      element.trigger('change');
    }

    function onInputElementKeyDown(event) {
      (function (event) {
        if (
          13 !== event.keyCode ||
          !document.queryCommandSupported('insertLineBreak') ||
          event.ctrlKey ||
          event.metaKey
        )
          return !1;
        if (event.shiftKey || event.altKey) return !0;
        if (
          document.queryCommandState('insertUnorderedList') ||
          document.queryCommandState('insertOrderedList')
        )
          return !1;
        event = document.queryCommandValue('formatBlock');
        return '' !== event && 'div' !== event && 'p' !== event ? !1 : !0;
      })(event) &&
        (document.execCommand('insertLineBreak', !1, null),
        event.preventDefault());
    }

    function onSetHeightBox(event) {
      var seft = $(this),
        inner = seft.children('.inner'),
        ghostElement = seft.data('ghostElement'),
        dataElement = seft.data('dataElement'),
        rotate = dataElement.getRotate(),
        oldWidth = dataElement.getWidth(),
        oldHeight = dataElement.getHeight(),
        oldX = dataElement.getLeft(),
        oldY = dataElement.getTop(),
        centerOldX = oldX + oldWidth / 2,
        centerOldY = oldY + oldHeight / 2,
        newWidth = inner.width(),
        newHeight = inner.height(),
        angle = (rotate * Math.PI) / 180,
        cos = Math.cos(angle),
        sin = Math.sin(angle);

      var newPosition = getStyle(newWidth, newHeight);

      dataElement.setStyle(
        newPosition.newX,
        newPosition.newY,
        newWidth,
        newHeight,
        rotate
      );

      var value = getStringTranform(newPosition.newX, newPosition.newY, rotate);
      ghostElement.css({
        height: newHeight,
        transform: value,
      });

      seft.css({
        height: newHeight,
        transform: value,
      });

      function getStyle(newWidth, newHeight) {
        let deltaLengX, deltaLengY, centerNewX, centerNewY, newX, newY;

        deltaLengX = (newWidth - oldWidth) / 2;
        deltaLengY = (newHeight - oldHeight) / 2;

        centerNewX = centerOldX - deltaLengX * cos - deltaLengY * sin;
        centerNewY = centerOldY - deltaLengX * sin + deltaLengY * cos;

        newX = centerNewX - newWidth / 2;
        newY = centerNewY - newHeight / 2;
        return {
          newX: newX,
          newY: newY,
        };
      }
    }

    function createSelectedElement(element) {
      var ghostElement = element.data('ghostElement'),
        menuElement = element.data('menuElement'),
        dataElement = element.data('dataElement'),
        angleWorkspace = $('#angleWorkspace');
      if (dataElement.selected) return;
      element.addClass('selected');

      ghostElement ||
        ((ghostElement = $(
          '<div class="selectedBound handleCircle"><div class="ghostElement"></div><a class="cube tl"></a><a class="cube t"></a><a class="cube tr"></a><a class="cube r"></a><a class="cube br"></a><a class="cube b"></a><a class="cube bl"></a><a class="cube l"></a><a class="rotate" title="Rotate"></a></div>'
        )),
        element.data('ghostElement', ghostElement),
        element.hasClass('text') && ghostElement.addClass('text'));

      ghostElement.data('element', element).appendTo(angleWorkspace);

      if (element.hasClass('text')) {
        $('.cube.tl, .cube.t, .cube.tr, .cube.bl, .cube.b, .cube.br').css(
          'display',
          'none'
        );
        element.addClass('selected focused');
        element.children('.inner').attr('contenteditable', 'true');
        element.on('paste', onPaste);
        element.appendTo(angleWorkspace);
        menuElement ||
          ((menuElement = createMenu('text', dataElement)),
          element.data('menuElement', menuElement));
        menuElement.render();
      } else if (element.hasClass('image')) {
        $('.cube.l, .cube.t, .cube.r, .cube.b').css('display', 'none');
        menuElement ||
          ((menuElement = createMenu('image', dataElement)),
          element.data('menuElement', menuElement));
        menuElement.render();
      } else if (element.hasClass('svg')) {
        $('.cube.l, .cube.t, .cube.r, .cube.b').css('display', 'none');
        menuElement ||
          ((menuElement = createMenu('svg', dataElement)),
          element.data('menuElement', menuElement));
        menuElement.render();
      } else if (element.hasClass('textsvg')) {
        $('.cube.l, .cube.t, .cube.r, .cube.b').css('display', 'none');
        menuElement ||
          ((menuElement = createMenu('textsvg', dataElement)),
          element.data('menuElement', menuElement));
        menuElement.render();
      }

      ghostElement.css({
        width: dataElement.getWidth(),
        height: dataElement.getHeight(),
        transform: getStringTranform(
          dataElement.getLeft(),
          dataElement.getTop(),
          dataElement.getRotate()
        ),
      });
    }

    function createMenu(type, dataElement) {
      let menu = null;
      if (type === 'text') {
        menu = new Menu(
          '#designtool',
          'text',
          {
            listenerFontFamily: setEventChangeFontFamily,
            listenerFontSize: setEventChangeFontSize,
            listenerTextAlign: setEventChangeTextAlign,
            listenerLayer: setEventChangeLayer,
            listenerTextSpacing: {
              listenerLineHeight: setEventChangeLineHeight,
              listenerLetterSpacing: setEventChangeLetterSpacing,
            },
            listenerTranparency: setEventChangeTransparency,
            listenerColor1: setEventChangeFontColor,
            listenerUppercase: setEventChangeUppercase,
            listenerCopy: setEventChangeCopy,
            listenerDelete: setEventChangeDelete,
          },
          dataElement
        );
      } else if (type === 'image') {
        menu = new Menu(
          '#designtool',
          'image',
          {
            listenerLayer: setEventChangeLayer,
            listenerTranparency: setEventChangeTransparency,
            listenerCopy: setEventChangeCopy,
            listenerDelete: setEventChangeDelete,
          },
          dataElement
        );
      } else if (type === 'svg') {
        menu = new Menu(
          '#designtool',
          'svg',
          {
            listenerLayer: setEventChangeLayer,
            listenerTranparency: setEventChangeTransparency,
            listenerColor1: setEventChangeColor1,
            listenerColor2: setEventChangeColor2,
            listenerColor3: setEventChangeColor3,
            listenerCopy: setEventChangeCopy,
            listenerDelete: setEventChangeDelete,
          },
          dataElement
        );
      } else if (type === 'textsvg') {
        menu = new Menu(
          '#designtool',
          'textsvg',
          {
            listenerFontFamily: setEventChangeFontFamily,
            listenerFontSize: setEventChangeFontSize,
            listenerTextAlign: setEventChangeTextAlign,
            listenerLayer: setEventChangeLayer,
            listenerTextSpacing: {
              listenerLineHeight: setEventChangeLineHeight,
              listenerLetterSpacing: setEventChangeLetterSpacing,
            },
            listenerTranparency: setEventChangeTransparency,
            listenerColor1: setEventChangeColor1,
            listenerUppercase: setEventChangeUppercase,
            listenerCopy: setEventChangeCopy,
            listenerDelete: setEventChangeDelete,
          },
          dataElement
        );
      }

      return menu;
    }

    function loadFonts(data) {
      var fontLoad = _.find(cacheFonts, function (font) {
        return font.url === data.url;
      });

      if (typeof fontLoad === 'undefined') {
        FontLoader.load({
          custom: {
            urls: [data.url],
          },
        });
        return cacheFonts.push(data);
      }
    }

    function setEventChangeFontFamily(dataElement, data) {
      loadFonts(data.data);
      dataElement.updateFontFamily(data.data.family);
      dataElement.getDom().trigger('change');
    }

    function setEventChangeFontSize(dataElement, data) {
      dataElement.updateFontsize(data.data);
      dataElement.getDom().trigger('change');
    }

    function setEventChangeTextAlign(dataElement, data) {
      dataElement.updateTextAlign(data.name);
    }

    function setEventChangeFontColor(dataElement, data) {
      dataElement.updateColor(data.hex);
    }

    function setEventChangeColor1(dataElement, data) {
      dataElement.updateColor1(data.hex);
    }

    function setEventChangeColor2(dataElement, data) {
      dataElement.updateColor1(data.hex);
    }

    function setEventChangeColor3(dataElement, data) {
      dataElement.updateColor1(data.hex);
    }

    function setEventChangeLayer(dataElement, data) {
      workspaceModel.updateLayer(dataElement, data.code);
    }

    function setEventChangeTransparency(dataElement, data) {
      dataElement.updateTransparency(data.data.percent);
    }

    function setEventChangeLineHeight(dataElement, data) {
      dataElement.updateLineHeight(data.data.value);
      dataElement.getDom().trigger('change');
    }

    function setEventChangeLetterSpacing(dataElement, data) {
      dataElement.updateLetterSpacing(data.data.value);
      dataElement.getDom().trigger('change');
    }

    function setEventChangeUppercase(dataElement, data) {
      dataElement.updateUppercase(data.isActive);
      dataElement.getDom().trigger('change');
    }

    function setEventChangeCopy(dataElement, data) {
      forceMousedown();
      workspaceModel.cloneElement(dataElement);
    }

    function setEventChangeDelete(dataElement, data) {
      forceMousedown();
      workspaceModel.deleteElement(dataElement);
    }

    function forceMousedown() {
      $('#zone-left').trigger('mousedown');
    }
  },
};
