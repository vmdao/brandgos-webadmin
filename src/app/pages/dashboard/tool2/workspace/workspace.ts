import { BaseElement } from '../elements/base.abstract';
import * as _ from 'lodash';
import * as jQuery from 'jquery';
import { Border } from './border';
import { Frame } from 'scenejs';
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
  TransparencyCommand,
  InputCommand,
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

  createElement(dataElement) {
    console.log('data', dataElement);
    const element = this.factoryCreateElement(dataElement);
    this.addElement(element);
  }

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

  buildMenu(dataElement: BaseElement, items) {
    const options = { where: '', type: 'toolbar', dataElement };
    const menu = new ToolbarMenu(options);
    menu.render();
    menu.builderMenu(items);
    return menu;
  }

  event() {
    const frame = new Frame({
      left: '0px',
      top: '0px',
      width: '0',
      height: '0',
      transform: {
        translateX: `0`,
        translateY: `0`,
        rotate: '0deg',
        scaleX: 1,
        scaleY: 1,
      },
    });
    const frameMap = new Map();
    let targets = [];
    this.managerSelector = new Selecto({
      container: this.$dom.get(0),
      dragContainer: '#areaWorkspace',
      selectableTargets: ['.elements .element'],
      hitRate: 0,
      selectByClick: true,
      selectFromInside: false,
      toggleContinueSelect: ['shift'],
    });

    function move(translate: number[]) {
      frame.set('transform', 'translateX', `${translate[0]}px`);
      frame.set('transform', 'translateY', `${translate[1]}px`);
    }

    this.managerMoveabler = new Moveable(this.$dom.get(0), {
      draggable: true,
      resizable: true,
      throttleResize: 0,
      keepRatio: true,
      rotatable: true,
      snapThreshold: 0,
      throttleRotate: 0,

      snapCenter: false,
      snappable: false,
      verticalGuidelines: [100, 200, 300],
      horizontalGuidelines: [0, 100, 200],
    });

    this.managerMoveabler.on('render', ({ target }) => {
      target.style.cssText += frame.toCSS();
    });

    this.managerMoveabler.on('renderEnd', ({ target }) => {});
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
          console.log('dragStart', position);
        }
        const frame = frameMap.get(target);
        console.log(frame.translate);
        set(frame.translate);
      })
      .on('drag', ({ target, beforeTranslate }) => {
        move(beforeTranslate);
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

    this.managerMoveabler.on('resizeStart', ({ target }) => {
      console.log('resizeStart');
    });

    this.managerMoveabler.on('resize', ({ width, drag, height }) => {
      console.log('resize');
      frame.set('width', `${width}px`);
      frame.set('height', `${height}px`);
      move(drag.beforeTranslate);
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
        events.forEach(({ target, beforeRotate, drag }) => {
          const frame = frameMap.get(target);
          frame.rotate = beforeRotate;
          // get drag event
          frame.translate = drag.beforeTranslate;
          target.style.transform =
            `translate(${drag.beforeTranslate[0]}px, ${drag.beforeTranslate[1]}px) ` +
            `rotate(${beforeRotate}deg)`;
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
    const inputCommand = new InputCommand(dataElement, this);
    const transparencyCommand = new TransparencyCommand(dataElement);
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

    let items = [];

    switch (dataElement.elementType) {
      case 'svgtext': {
        items = [
          {
            type: 'input',
            icon: '',
            name: 'input',
            actions: [{ event: 'keyup', command: inputCommand }],
            children: [],
            context: {
              content: dataElement.text.html,
            },
          },
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
              isActive:
                dataElement.text.transform === 'uppercase' ? true : false,
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
                name: 'Transprency',
                actions: [{ event: 'change', command: transparencyCommand }],
                context: {
                  min: 0,
                  max: 100,
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
        break;
      }
      case 'svg': {
        items = [
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
                name: 'Transprency',
                actions: [{ event: 'change', command: transparencyCommand }],
                context: {
                  min: 0,
                  max: 100,
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
            name: 'color1',
            actions: [{ event: 'change', command: colorCommand }],
            children: [],
            context: {
              color1: dataElement.svg.color1,
              color2: dataElement.svg.color2,
              color3: dataElement.svg.color3,
            },
          },
          {
            type: 'button-color',
            icon: '',
            name: 'color2',
            actions: [{ event: 'change', command: colorCommand }],
            children: [],
            context: {
              color1: dataElement.svg.color1,
              color2: dataElement.svg.color2,
              color3: dataElement.svg.color3,
            },
          },
          {
            type: 'button-color',
            icon: '',
            name: 'color3',
            actions: [{ event: 'change', command: colorCommand }],
            children: [],
            context: {
              color1: dataElement.svg.color1,
              color2: dataElement.svg.color2,
              color3: dataElement.svg.color3,
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
        break;
      }
    }

    return this.buildMenu(dataElement, items);
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
