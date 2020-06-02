import { BaseElement } from '../elements/base.abstract';
import * as jQuery from 'jquery';
import { EventElement } from '../events/EventElement';
import * as _ from 'lodash';
import { ToolbarMenu } from '../toolkit/toolbar/menu';
import { TextSvgElement, SvgElement, TextElement } from '../elements';
import { Border } from './border';

import Selecto from 'selecto';
import Moveable from 'moveable';

export class Workspace {
  $dom: any;
  $domWrapper: any;
  width: number;
  height: number;

  documentId: number;
  code: string;
  name: string;
  version: string;
  order: number;
  border: Border;
  elements: Array<BaseElement> = [];

  //   trigger = new EventEmitter();
  constructor(option) {
    this.documentId = option.documentId;
    this.width = option.width;
    this.height = option.height;
    this.code = option.code;
    this.version = option.version;
    this.order = option.order;
    this.border = option.border;
    this.$domWrapper = jQuery(`<div class="workspace" id="workspace"></div>`);
    this.$dom = jQuery(`<div class="elements"></div>`);
  }

  //   setupEmiter
  render(selector: string) {
    this.renderSize();
    this.$dom = jQuery(`<div class="elements"></div>`);
    this.$dom.appendTo(this.$domWrapper);
    this.$domWrapper.appendTo(selector);
    this.updateStyle({});
    this.border.render(selector);
    this.event();
  }

  renderSize() {
    this.$dom.css({ width: this.width, height: this.height });
  }

  createElements(dataElements) {
    dataElements.forEach((dataElement) => {
      this.createElement(dataElement);
    });
  }

  createElement = function (dataElement) {
    const element = this.factoryCreateElement(dataElement);
    this.addElement(element);
  };

  factoryCreateElement(dataElement) {
    switch (dataElement.typeElement) {
      case 'image':
        return new TextSvgElement(dataElement);
      case 'text':
        return new TextElement(dataElement);
      case 'svgtext':
        return new TextSvgElement(dataElement);
      case 'svg':
        return new SvgElement(dataElement);
    }
  }

  addElement(element: BaseElement) {
    this.elements = this.elements.concat([element]);
    this.renderElement(element);
  }

  renderElement(element: BaseElement) {
    this.$dom.append(element.$dom);
  }

  buildMenu(element: BaseElement) {
    const items = [
      {
        type: 'button',
        options: {
          icon: '',
          children: [{ type: 'button', options: { icon: '' } }],
        },
      },
    ];

    const options = { where: '', type: 'toobar', dataElement: element };
    const menu = new ToolbarMenu(options);
    menu.builderMenu(items);

    return menu;
  }

  event() {
    // new EventElement('#zone-left')
    //   .on(
    //     'mousedown',
    //     '.element:not(.focused)',
    //     this.elementMouseDown.bind(this)
    //   )
    //   .on(
    //     'touchstart',
    //     '.element:not(.focused)',
    //     this.elementMouseDown.bind(this)
    //   );
    // new EventElement('#zone-left')
    //   .on(
    //     'mousedown',
    //     '.selectedBound .rotate',
    //     this.rotateMouseDown.bind(this)
    //   )
    //   .on(
    //     'touchstart',
    //     '.selectedBound .rotate ',
    //     this.rotateMouseDown.bind(this)
    //   );
    const frameMap = new Map();
    let targets = [];
    const selecto = new Selecto({
      container: this.$dom.get(0),
      dragContainer: '.elements',
      selectableTargets: ['.elements .element'],
      hitRate: 0,
      selectByClick: true,
      selectFromInside: false,
      toggleContinueSelect: ['shift'],
    });

    const moveable = new Moveable(this.$dom.get(0), {
      draggable: true,
      resizable: true,
      throttleResize: 0,
      keepRatio: true,
      rotatable: true,
    });

    moveable
      .on('dragStart', ({ target, set }) => {
        const dataElement = jQuery(target).data('dataElement');
        if (!frameMap.has(target)) {
          const position = dataElement.getPosition();
          const angle = dataElement.getAngle();
          frameMap.set(target, {
            translate: [position.left, position.top],
            rotate: angle,
          });
        }

        const frame = frameMap.get(target);
        set(frame.translate);
      })
      .on('drag', ({ target, beforeTranslate }) => {
        const frame = frameMap.get(target);
        frame.translate = beforeTranslate;
        target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]}px) rotate(${frame.rotate}deg)`;
      })
      .on('dragEnd', ({ target }) => {
        const dataElement = jQuery(target).data('dataElement');
        const frame = frameMap.get(target);
        dataElement.setLeft(frame.translate[0]);
        dataElement.setTop(frame.translate[1]);
      });

    moveable
      .on('rotateStart', ({ target, set }) => {
        const dataElement = jQuery(target).data('dataElement');
        if (!frameMap.has(target)) {
          const position = dataElement.getPosition();
          const angle = dataElement.getAngle();
          frameMap.set(target, {
            translate: [position.left, position.top],
            rotate: angle,
          });
        }
      })
      .on('rotate', ({ target, delta }) => {
        const frame = frameMap.get(target);
        frame.rotate += delta;
        target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]}px) rotate(${frame.rotate}deg)`;
      })
      .on('rotateEnd', ({ target }) => {
        const dataElement = jQuery(target).data('dataElement');
        const frame = frameMap.get(target);
        dataElement.setAngle(frame.rotate);
      });

    moveable.on('resize', ({ target, width, height, dist }) => {
      target.style.width = width + 'px';
      target.style.height = height + 'px';
    });

    moveable.on('clickGroup', (e) => {
      selecto.clickTarget(e.inputEvent, e.inputTarget);
    });

    moveable
      .on('dragGroupStart', ({ events }) => {
        events.forEach(({ target, set }) => {
          if (!frameMap.has(target)) {
            const dataElement = jQuery(target).data('dataElement');
            const position = dataElement.getPosition();
            const angle = dataElement.getAngle();
            frameMap.set(target, {
              translate: [position.left, position.top],
              rotate: angle,
            });
          }
          const frame = frameMap.get(target);
          set(frame.translate);
        });
      })
      .on('dragGroup', ({ events }) => {
        events.forEach(({ target, beforeTranslate }) => {
          const dataElement = jQuery(target).data('dataElement');
          const frame = frameMap.get(target);
          frame.translate = beforeTranslate;
          dataElement.setLeft(frame.translate[0]);
          dataElement.setTop(frame.translate[1]);

          target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]}px) rotate(${frame.rotate}deg)`;
        });
      });

    moveable
      .on('resizeGroupStart', ({ events }) => {
        events.forEach((ev, i) => {
          const frame = frames[i];
          // Set origin if transform-orgin use %.
          ev.setOrigin(['%', '%']);

          // If cssSize and offsetSize are different, set cssSize.
          const style = window.getComputedStyle(ev.target);
          const cssWidth = parseFloat(style.width);
          const cssHeight = parseFloat(style.height);
          ev.set([cssWidth, cssHeight]);

          // // If a drag event has already occurred, there is no dragStart.
          // ev.dragStart && ev.dragStart.set(frame.translate);
        });
      })
      .on('resizeGroup', ({ events }) => {
        events.forEach(({ target, width, height, drag }, i) => {
          const frame = frames[i];

          target.style.width = `${width}px`;
          target.style.height = `${height}px`;
          // get drag event
          // frame.translate = drag.beforeTranslate;
          target.style.transform = `translate(${drag.beforeTranslate[0]}px, ${drag.beforeTranslate[1]}px)`;
        });
      })
      .on('resizeGroupEnd', ({ targets, isDrag, clientX, clientY }) => {
        console.log('onResizeGroupEnd', targets, isDrag);
      });

    moveable
      .on('rotateGroupStart', ({ events }) => {
        events.forEach(({ target, set }) => {
          if (!frameMap.has(target)) {
            const dataElement = jQuery(target).data('dataElement');
            const position = dataElement.getPosition();
            const angle = dataElement.getAngle();
            frameMap.set(target, {
              translate: [position.left, position.top],
              rotate: angle,
            });
          }
          const frame = frameMap.get(target);
          set(frame.rotate);
        });
      })
      .on('rotateGroup', ({ events, delta }) => {
        events.forEach((ev) => {
          // const left = drag.beforeDist[0];
          // const top = drag.beforeDist[1];
          // const deg = beforeDist;
          // console.log('left', left, top, deg, 'beforeRotate', beforeRotate);
          // const frame = frameMap.get(target);
          // frame.rotate = beforeRotate;
          // target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]}px) rotate(${frame.rotate}deg)`;
          // console.log(ev);
          // const left = ev.drag.beforeDist[0];
          // const top = ev.drag.beforeDist[1];
          // const deg = ev.beforeDist;

          const frame = frameMap.get(ev.target);
          frame.rotate = ev.beforeRotate;
          // get drag event
          frame.translate = ev.drag.beforeTranslate;
          ev.target.style.transform =
            `translate(${ev.drag.beforeTranslate[0]}px, ${ev.drag.beforeTranslate[1]}px) ` +
            `rotate(${ev.beforeRotate}deg)`;
        });

        // events.forEach(({ target, beforeRotate, drag }, i) => {
        //   const frame = frames[i];

        //   // frame.rotate = beforeRotate;

        //   // get drag event
        //   // frame.translate = drag.beforeTranslate;
        //   target.style.transform =
        //     `translate(${drag.beforeTranslate[0]}px, ${drag.beforeTranslate[1]}px) ` +
        //     `rotate(${beforeRotate}deg)`;
        // });
      })
      .on('rotateGroupEnd', ({ targets, isDrag, clientX, clientY }) => {
        console.log('onRotateGroupEnd', targets, isDrag);
      });

    selecto
      .on('dragStart', (e) => {
        const target = e.inputEvent.target;
        if (
          moveable.isMoveableElement(target) ||
          targets.some((t) => t === target || t.contains(target))
        ) {
          e.stop();
        }
      })
      .on('select', (e) => {
        targets = e.selected;
        moveable.target = targets;
      })
      .on('selectEnd', (e) => {
        if (e.isDragStart) {
          e.inputEvent.preventDefault();

          setTimeout(() => {
            moveable.dragStart(e.inputEvent);
          });
        }
      });
  }

  rotateMouseDown(event) {
    if (3 === event.which || event.ctrlKey) return !0;
    const cube = jQuery(event.currentTarget);
    cube.addClass('on');

    let ghostElement = cube.parents('.selectedBound');
    let dataElement = ghostElement.data('dataElement');
    const elementSelect = dataElement.$dom;
    let elementOffset = elementSelect.offset();
    let matrixX = elementOffset.left + dataElement.getWidth() / 2;
    let matrixY = elementOffset.top + dataElement.getHeight() / 2;

    let mouseX =
      void 0 !== event.clientX
        ? event.clientX
        : event.originalEvent.touches[0].client;
    let mouseY =
      void 0 !== event.clientY
        ? event.clientY
        : event.originalEvent.touches[0].clientY;
    let rotateMouseStart = getAngle(matrixX, matrixY, mouseX, mouseY);
    let angleNew = 0;

    let rotateStart = dataElement.getRotate();
    elementSelect.data('rotateStart', rotateStart);

    const eventDocument = new EventElement(jQuery(document));
    eventDocument
      .on('mousemove|touchmove', setEventMouseMove.bind(this))
      .on('mouseup|touchend', setEventMouseUp.bind(this));
    console.log('setEventMouseMove');
    function setEventMouseMove(event) {
      console.log('setEventMouseMove');
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
        var value = getStringTranform(0, 0, angleNew);
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
    return !1;
  }
  elementMouseDown(eventMousedown) {
    const eventDocument = new EventElement(jQuery(document));
    if (3 === eventMousedown.which || eventMousedown.ctrlKey) {
      return true;
    }

    const eventTarget = jQuery(eventMousedown.currentTarget);
    const elementSelect = eventTarget;

    const dataElement = elementSelect.data('dataElement');
    const ghostElement = elementSelect.data('dataBoxer');

    const startX = dataElement.getLeft();
    const startY = dataElement.getTop();
    const mouseStartX =
      void 0 !== eventMousedown.clientX
        ? eventMousedown.clientX
        : eventMousedown.originalEvent.touches[0].clientX;

    const mouseStartY =
      void 0 !== eventMousedown.clientY
        ? eventMousedown.clientY
        : eventMousedown.originalEvent.touches[0].clientY;

    let mouseX = 0;
    let mouseY = 0;
    let currentTop = 0;
    let currentLeft = 0;

    elementSelect.data('startX', startX);
    elementSelect.data('startY', startY);

    const menuElement = dataElement.$dom.data('menuElement');
    if (menuElement) {
      menuElement.hideSubmenu();
    }

    if (!dataElement.getSelected()) {
      this.checkElementSelected(eventMousedown);
    }

    eventDocument
      .on('mousemove|touchmove', setEventMouseMove.bind(this))
      .on('mouseup|touchend', setEventMouseUp.bind(this));

    function setEventMouseMove(event) {
      let deltaX = 0;
      let deltaY = 0;

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
      const rotateStart = dataElement.getAngle();
      const style = {
        transform: getStringTranform(currentLeft, currentTop, rotateStart),
      };
      if (dataElement.getSelected() && ghostElement) {
        ghostElement.css(style);
      }
      elementSelect.css(style);
      return !1;
    }

    function setEventMouseUp(event) {
      eventDocument
        .off('mousemove|touchmove', setEventMouseMove.bind(this))
        .off('mouseup|touchend', setEventMouseUp.bind(this));

      if (currentLeft === mouseX && mouseY === currentTop) {
        if (!dataElement.getSelected()) {
          this.createSelectedElement(elementSelect);
          dataElement.updateSelected(true);
        }
      } else {
        dataElement.performMove({ left: currentLeft, top: currentTop });
      }
    }
    return !1;
  }

  checkElementSelected(event) {
    // if (unSelected(event) && workspaceModel) {
    //   workspaceModel.getElements().forEach(removeElementSelected);
    // }
  }

  createSelectedElement(element) {
    let ghostElement = element.data('ghostElement');
    let menuElement = element.data('menuElement');
    const dataElement = element.data('dataElement');

    if (dataElement.getSelected()) {
      return;
    }

    dataElement.updateSelected(true);

    if (!ghostElement) {
      ghostElement = jQuery(
        // tslint:disable-next-line: max-line-length
        `<div class="selectedBound handleCircle"><div class="ghostElement"></div><a class="cube tl"></a><a class="cube t"></a><a class="cube tr"></a><a class="cube r"></a><a class="cube br"></a><a class="cube b"></a><a class="cube bl"></a><a class="cube l"></a><a class="rotate" title="Rotate"></a></div>`
      );
      element.data('dataBoxer', ghostElement);
    }

    if (element.hasClass('text')) {
      ghostElement.addClass('text');
    }

    ghostElement.data('dataElement', dataElement).appendTo(this.border.$dom);

    if (element.hasClass('text')) {
      jQuery('.cube.tl, .cube.t, .cube.tr, .cube.bl, .cube.b, .cube.br').css(
        'display',
        'none'
      );

      element.addClass('focused');
      element.children('.inner').attr('contenteditable', 'true');
      element.on('paste', onPaste);

      if (!menuElement) {
        menuElement = this.createMenu('text', dataElement);
      }

      element.data('menuElement', menuElement);
    } else if (element.hasClass('image')) {
      jQuery('.cube.l, .cube.t, .cube.r, .cube.b').css('display', 'none');
      if (!menuElement) {
        menuElement = this.createMenu('image', dataElement);
      }
    } else if (element.hasClass('svg')) {
      jQuery('.cube.l, .cube.t, .cube.r, .cube.b').css('display', 'none');
      if (!menuElement) {
        menuElement = this.createMenu('svg', dataElement);
      }
    } else if (element.hasClass('textsvg')) {
      jQuery('.cube.l, .cube.t, .cube.r, .cube.b').css('display', 'none');
      if (!menuElement) {
        menuElement = this.createMenu('textsvg', dataElement);
      }
    }

    if (menuElement) {
      element.data('menuElement', menuElement);
      menuElement.render();
    }

    ghostElement.css({
      width: dataElement.getWidth(),
      height: dataElement.getHeight(),
      top: dataElement.getTop(),
      left: dataElement.getLeft(),
      transform: getStringTranform(0, 0, dataElement.getAngle()),
    });
  }

  createMenu(type, dataElement) {
    return this.buildMenu(dataElement);
    // let menu = null;
    // if (type === 'text') {
    //   menu = new Menu(
    //     '#designtool',
    //     'text',
    //     {
    //       listenerFontFamily: setEventChangeFontFamily,
    //       listenerFontSize: setEventChangeFontSize,
    //       listenerTextAlign: setEventChangeTextAlign,
    //       listenerLayer: setEventChangeLayer,
    //       listenerTextSpacing: {
    //         listenerLineHeight: setEventChangeLineHeight,
    //         listenerLetterSpacing: setEventChangeLetterSpacing,
    //       },
    //       listenerTranparency: setEventChangeTransparency,
    //       listenerColor1: setEventChangeFontColor,
    //       listenerUppercase: setEventChangeUppercase,
    //       listenerCopy: setEventChangeCopy,
    //       listenerDelete: setEventChangeDelete,
    //     },
    //     dataElement
    //   );
    // } else if (type === 'image') {
    //   menu = new Menu(
    //     '#designtool',
    //     'image',
    //     {
    //       listenerLayer: setEventChangeLayer,
    //       listenerTranparency: setEventChangeTransparency,
    //       listenerCopy: setEventChangeCopy,
    //       listenerDelete: setEventChangeDelete,
    //     },
    //     dataElement
    //   );
    // } else if (type === 'svg') {
    //   menu = new Menu(
    //     '#designtool',
    //     'svg',
    //     {
    //       listenerLayer: setEventChangeLayer,
    //       listenerTranparency: setEventChangeTransparency,
    //       listenerColor1: setEventChangeColor1,
    //       listenerColor2: setEventChangeColor2,
    //       listenerColor3: setEventChangeColor3,
    //       listenerCopy: setEventChangeCopy,
    //       listenerDelete: setEventChangeDelete,
    //     },
    //     dataElement
    //   );
    // } else if (type === 'textsvg') {
    //   menu = new Menu(
    //     '#designtool',
    //     'textsvg',
    //     {
    //       listenerFontFamily: setEventChangeFontFamily,
    //       listenerFontSize: setEventChangeFontSize,
    //       listenerLayer: setEventChangeLayer,
    //       listenerTextSpacing: {
    //         listenerLineHeight: setEventChangeLineHeight,
    //         listenerLetterSpacing: setEventChangeLetterSpacing,
    //       },
    //       listenerTranparency: setEventChangeTransparency,
    //       listenerColor1: setEventChangeColor1,
    //       listenerUppercase: setEventChangeUppercase,
    //       listenerCopy: setEventChangeCopy,
    //       listenerDelete: setEventChangeDelete,
    //     },
    //     dataElement
    //   );
    // }
    // return menu;
  }

  unSelected(event) {
    return (
      event.currentTarget.id !== 'zone-left' ||
      (event.currentTarget.id === 'zone-left' &&
        (event.target.id === 'areaWorkspace' ||
          event.target.id === 'elements' ||
          event.target.id === 'zone-left'))
    );
  }

  removeElementSelected(element) {
    if (element.getDom().hasClass('selected')) {
      const menuElement = element.getDom().data('menuElement');
      element.setSelected(!1);
      element.getDom().removeClass('selected');
      if (element.getDom().hasClass('text')) {
        element.getDom().removeClass('focused');
        element.getDom().insertAfter(jQuery('.element:eq(3)'));
        element.getDom().children('.inner').attr('contenteditable', false);
      }
      element.remove();
      if (menuElement.$dom) {
        menuElement.detach();
      }
    }
  }

  updateStyle(values) {
    const styles = {
      ...{
        width: this.width,
        height: this.height,
      },
      ...values,
    };
    this.$dom.css(styles);
  }
}

/*  */
function onPaste(a) {
  if (document.queryCommandSupported('ms-pasteContentOnly')) {
    document.execCommand('ms-pasteContentOnly');
  } else if (
    document.queryCommandSupported('insertHTML') &&
    a.originalEvent.clipboardData
  ) {
    let b = a.originalEvent.clipboardData.getData('text/plain');
    b = _.escape(b)
      .replace(/\r?\n/g, '\x3cbr\x3e')
      .replace(/ {2}/g, ' \x26nbsp;');
    document.execCommand('insertHTML', !1, b);
  } else {
    throw Error('Beware! Unsupported browser. Sneaking around.');
  }
  a.preventDefault();
}

function getStringTranform(left, top, rotate) {
  return (
    'translate3d(' + left + 'px,' + top + 'px, 0)rotateZ(' + rotate + 'deg)'
  );
}

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
