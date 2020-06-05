import { BaseElement } from '../elements/base.abstract';
import * as _ from 'lodash';
import * as jQuery from 'jquery';
import { Border } from './border';

import { TextSvgElement, SvgElement, TextElement } from '../elements';
import { ToolbarMenu } from '../toolkit/toolbar/menu';

import Selecto from 'selecto';
import Moveable from 'moveable';
import {
  ColorCommand,
  CloneCommand,
  TransformCommand,
  DeleteCommand,
  FontFamilyCommand,
  FontsizeCommand,
} from '../toolkit/command';
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
  $toolbar;
  managerSelector: Selecto;
  managerMoveabler: Moveable;

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
    this.$toolbar = jQuery(`#designtool`);
  }

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

  offMenuElements() {
    this.elements.forEach((dataElement) => {
      const dataMenu = dataElement.$dom.data('dataMenu');
      if (dataMenu) {
        dataMenu.detach();
      }
    });

    this.$toolbar.removeClass('menu--active');
  }

  offMenuElementsWithout(dataElement) {
    this.elements
      .filter((e) => {
        if (e !== dataElement) {
          return true;
        }
        return false;
      })
      .forEach((e) => {
        const dataMenu = e.$dom.data('dataMenu');
        if (dataMenu) {
          dataMenu.detach();
        }
      });

    let dataMenu = dataElement.$dom.data('dataMenu');
    if (!dataMenu) {
      dataMenu = this.createMenu(dataElement);
      dataElement.$dom.data('dataMenu', dataMenu);
    }
    dataMenu.appendTo('#designtool');
    this.$toolbar.addClass('menu--active');
  }

  factoryCreateElement(dataElement) {
    switch (dataElement.elementType) {
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

  addElement(dataElement: BaseElement) {
    this.elements = this.elements.concat([dataElement]);
    this.renderElement(dataElement);
  }

  deleteElement(dataElement: BaseElement) {
    this.elements = this.elements.filter((e) => e !== dataElement);
    this.renderDestroyElement(dataElement);

    // hardcore remove movebaler
    this.managerMoveabler.target = null;
  }

  renderDestroyElement(element: BaseElement) {
    element.$dom.remove();
  }

  renderElement(element: BaseElement) {
    this.$dom.append(element.$dom);
  }

  buildMenu(dataElement: BaseElement) {
    const fontFamilyCommand = new FontFamilyCommand(dataElement, this);
    const fontsizeCommand = new FontsizeCommand(dataElement, this);
    const colorCommand = new ColorCommand(dataElement);
    const transformCommand = new TransformCommand(dataElement, this);
    const cloneComand = new CloneCommand(dataElement, this);
    const deleteCommand = new DeleteCommand(dataElement, this);

    const fonts = [
      '/assets/UV-Akashi.ttf',
      '/assets/cantata-one-regular.otf',
      '/assets/Roboto-Thin.ttf',
      '/assets/UV-Agin.ttf',
    ];

    const items = [
      {
        type: 'dropdown',
        icon: '',
        name: 'Font Family',
        code: 'fontFamily',
        actions: [{ event: 'click', command: fontFamilyCommand }],
        children: [],
        context: {
          list: [
            {
              label: 'Aileron Bold',
              width: 138,
              height: 35,
              url: '/assets/UV-Agin.ttf',
              thumbUrl:
                'https://static.canva.com/static/images/fonts/Aileron.png',
            },
            {
              label: 'Aileron Thin',
              width: 90,
              height: 35,
              url: '/assets/cantata-one-regular.otf',
              thumbUrl:
                'https://static.canva.com/static/images/fonts/Aileron-Thin.png',
            },
            {
              label: 'Aileron Bold',
              width: 138,
              height: 35,
              url: '/assets/UV-Agin.ttf',
              thumbUrl:
                'https://static.canva.com/static/images/fonts/Aileron.png',
            },
            {
              label: 'Aileron Thin',
              width: 90,
              height: 35,
              url: '/assets/cantata-one-regular.otf',
              thumbUrl:
                'https://static.canva.com/static/images/fonts/Aileron-Thin.png',
            },
          ],
        },
      },
      {
        type: 'dropdown',
        icon: '',
        name: 'FontSize',
        code: 'fontSize',
        actions: [{ event: 'click', command: fontsizeCommand }],
        children: [],
        context: {
          list: [
            {
              label: '30px',
              value: 30,
            },
            {
              label: '40px',
              value: 40,
            },
            {
              label: '50px',
              value: 50,
            },
            {
              label: '60px',
              value: 60,
            },
          ],
        },
      },
      {
        type: 'button-toggle',
        icon: 'uppercase',
        name: 'transform',
        actions: [{ event: 'click', command: transformCommand }],
        children: [],
        context: {
          isActive: dataElement.text.transform === 'uppercase' ? true : false,
        },
      },
      {
        type: 'drop-pad',
        icon: 'transparency',
        code: 'transparency',
        name: 'transparency',
        actions: [],
        children: [
          {
            type: 'slider-one',
            icon: 'slider',
            name: 'slider',
            actions: [{ event: 'change', command: transformCommand }],
            context: {
              min: 0,
              max: 200,
              step: 1,
              valueDefault: 100,
            },
          },
        ],
        context: {},
      },

      {
        type: 'button-color',
        icon: '',
        name: 'color',
        actions: [{ event: 'change', command: colorCommand }],
        children: [],
        context: {
          color: dataElement.text.color,
        },
      },
      {
        type: 'button',
        icon: '',
        name: 'Clone',
        actions: [{ event: 'click', command: cloneComand }],
        children: [],
        context: {},
      },
      {
        type: 'button',
        icon: 'delete',
        name: 'Delete',
        actions: [{ event: 'click', command: deleteCommand }],
        children: [],
        context: {},
      },
    ];

    const options = { where: '', type: 'toobar', dataElement };
    const menu = new ToolbarMenu(options);
    menu.render();
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
    this.managerSelector = new Selecto({
      container: this.$dom.get(0),
      dragContainer: '.elements',
      selectableTargets: ['.elements .element'],
      hitRate: 0,
      selectByClick: true,
      selectFromInside: false,
      toggleContinueSelect: ['shift'],
    });

    this.managerMoveabler = new Moveable(this.$dom.get(0), {
      draggable: true,
      resizable: true,
      throttleResize: 0,
      keepRatio: true,
      rotatable: true,
    });

    this.managerMoveabler
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

    this.managerMoveabler
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

    this.managerMoveabler.on('resize', ({ target, width, height, dist }) => {
      target.style.width = width + 'px';
      target.style.height = height + 'px';
    });

    this.managerMoveabler.on('clickGroup', (e) => {
      this.managerSelector.clickTarget(e.inputEvent, e.inputTarget);
    });

    this.managerMoveabler
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

    this.managerMoveabler
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

    this.managerMoveabler
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
          const frame = frameMap.get(ev.target);
          frame.rotate = ev.beforeRotate;
          // get drag event
          frame.translate = ev.drag.beforeTranslate;
          ev.target.style.transform =
            `translate(${ev.drag.beforeTranslate[0]}px, ${ev.drag.beforeTranslate[1]}px) ` +
            `rotate(${ev.beforeRotate}deg)`;
        });
      })
      .on('rotateGroupEnd', ({ targets, isDrag, clientX, clientY }) => {
        console.log('onRotateGroupEnd', targets, isDrag);
      });

    this.managerSelector
      .on('dragStart', (e) => {
        const target = e.inputEvent.target;
        if (
          this.managerMoveabler.isMoveableElement(target) ||
          targets.some((t) => t === target || t.contains(target))
        ) {
          e.stop();
        }
      })
      .on('selectStart', (e) => {})
      .on('select', ({ selected }) => {
        targets = selected;
        this.managerMoveabler.target = targets;

        if (targets.length == 1) {
          this.selectedElement(jQuery(targets[0]));
        } else {
          this.offMenuElements();
        }
      })
      .on('selectEnd', (e) => {
        if (e.isDragStart) {
          e.inputEvent.preventDefault();

          setTimeout(() => {
            this.managerMoveabler.dragStart(e.inputEvent);
          });
        }
      });
  }

  selectedElement(elementSelected) {
    const $elementSelected = jQuery(elementSelected);
    const dataElement = $elementSelected.data('dataElement');
    this.offMenuElementsWithout(dataElement);
  }

  createMenu(dataElement) {
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
    //       listenertransform: setEventChangetransform,
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
    //       listenertransform: setEventChangetransform,
    //       listenerCopy: setEventChangeCopy,
    //       listenerDelete: setEventChangeDelete,
    //     },
    //     dataElement
    //   );
    // }
    // return menu;
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
