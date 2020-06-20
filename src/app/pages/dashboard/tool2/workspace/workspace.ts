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
  SvgColorCommand,
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
  $toolbar;

  width: number;
  height: number;

  documentId: number;
  code: string;
  name: string;
  version: string;

  order: number;
  border: Border;
  elements: Array<BaseElement> = [];
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

    let dataMenu2 = dataElement.$dom.data('dataMenu');
    if (!dataMenu2) {
      dataMenu2 = this.createMenu(dataElement);
      dataElement.$dom.data('dataMenu', dataMenu2);
    }
    dataMenu2.appendTo('#designtool');
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
    const frameMap = new Map();
    let targetsSelected = [];

    this.managerSelector = new Selecto({
      container: this.$dom.get(0),
      dragContainer: '#areaWorkspace',
      selectableTargets: ['.elements .element'],
      hitRate: 0,
      selectByClick: true,
      selectFromInside: false,
      toggleContinueSelect: ['shift'],
    });

    function move(target, translate: number[]) {
      const frame = getFrame(target);
      frame.set('transform', 'translateX', `${translate[0]}px`);
      frame.set('transform', 'translateY', `${translate[1]}px`);
    }

    function rotate(target, angle) {
      const frame = getFrame(target);
      frame.set('transform', 'rotate', `${angle}deg`);
    }

    function resize(target, width, height) {
      const frame = getFrame(target);
      frame.set('width', `${width}px`);
      frame.set('height', `${height}px`);
    }

    function getFrame(target) {
      const dataElement = jQuery(target).data('dataElement');
      const box = dataElement.getBox();
      let frame = frameMap.get(target);
      if (!frameMap.has(target)) {
        frame = new Frame({
          left: '0px',
          top: '0px',
          width: `${box.width}px`,
          height: `${box.height}px`,
          transform: {
            translateX: `${box.left}px`,
            translateY: `${box.top}px`,
            rotate: `${box.angle}deg`,
            scaleX: 1,
            scaleY: 1,
          },
        });
      }
      frameMap.set(target, frame);
      return frame;
    }

    function getFrameData(frame) {
      if (!frame) {
        return {
          angle: 0,
          top: 0,
          left: 0,
          width: 0,
          height: 0,
        };
      }

      const angle = frame.get('transform', 'rotate');
      const top = frame.get('transform', 'translateY');
      const left = frame.get('transform', 'translateX');
      const width = frame.get('width');
      const height = frame.get('height');

      return {
        angle: parseFloat(angle),
        top: parseFloat(top),
        left: parseFloat(left),
        width: parseFloat(width),
        height: parseFloat(height),
      };
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

    this.managerMoveabler
      .on('renderStart', ({ target }) => {
        console.log('renderStart');
      })
      .on('render', ({ target }) => {
        const frame = getFrame(target);
        target.style.cssText += frame.toCSS();
      })
      .on('renderEnd', ({ target }) => {
        console.log('renderEnd');
        const frame = getFrame(target);
        const frameData = getFrameData(frame);

        const dataElement = jQuery(target).data('dataElement');
        dataElement.setAngle(frameData.angle);
        dataElement.setLeft(frameData.left);
        dataElement.setTop(frameData.top);
        dataElement.setWidth(frameData.width);
        dataElement.setHeight(frameData.height);
      });

    this.managerMoveabler
      .on('dragStart', ({ target, set }) => {
        console.log('dragStart');
        const frame = getFrame(target);
        const frameData = getFrameData(frame);
        set([frameData.left, frameData.top]);
      })
      .on('drag', ({ target, beforeTranslate }) => {
        move(target, beforeTranslate);
      })
      .on('dragEnd', ({ target }) => {
        console.log('dragEnd');
      });

    this.managerMoveabler
      .on('rotateStart', ({ target, set }) => {
        console.log('rotateStart');
        const frame = getFrame(target);
        const frameData = getFrameData(frame);
        set(frameData.angle);
      })
      .on('rotate', ({ target, beforeRotate }) => {
        rotate(target, beforeRotate);
      })
      .on('rotateEnd', ({ target }) => {
        console.log('rotateEnd');
      });

    this.managerMoveabler
      .on('resizeStart', ({ target, dragStart, setOrigin }) => {
        console.log('resizeStart');
        setOrigin(['%', '%']);
        if (dragStart) {
          const frame = getFrame(target);
          dragStart.set([
            parseFloat(frame.get('transform', 'translateX')),
            parseFloat(frame.get('transform', 'translateY')),
          ]);
        }
      })
      .on('resize', ({ target, width, drag, height }) => {
        console.log('resize');
        resize(target, width, height);
        move(target, drag.beforeTranslate);
      })
      .on('resizeEnd', () => {
        console.log('resizeEnd');
      });

    this.managerMoveabler
      .on('renderGroupStart', ({ targets }) => {
        console.log('renderGroupStart');
      })
      .on('renderGroup', ({ targets }) => {
        console.log('renderGroup');
        targets.forEach((target) => {
          const frame = getFrame(target);
          target.style.cssText += frame.toCSS();
        });
      })
      .on('renderGroupEnd', ({ targets }) => {
        console.log('renderGroupEnd');
      });

    this.managerMoveabler.on('clickGroup', (e) => {
      this.managerSelector.clickTarget(e.inputEvent, e.inputTarget);
    });

    this.managerMoveabler
      .on('dragGroupStart', ({ events }) => {
        console.log('dragGroupStart');
        events.forEach(({ target, set }) => {
          const frame = getFrame(target);
          const frameData = getFrameData(frame);
          set([frameData.left, frameData.top]);
        });
      })
      .on('dragGroup', ({ events }) => {
        console.log('dragGroup');
        events.forEach(({ target, beforeTranslate }) => {
          move(target, beforeTranslate);
        });
      });

    this.managerMoveabler
      .on('resizeGroupStart', ({ events }) => {
        events.forEach(({ target, setOrigin, set, dragStart }, i) => {
          setOrigin(['%', '%']);
          const frame = getFrame(target);
          const frameData = getFrameData(frame);
          set([frameData.width, frameData.height]);
          if (dragStart) {
            dragStart.set([
              parseFloat(frame.get('transform', 'translateX')),
              parseFloat(frame.get('transform', 'translateY')),
            ]);
          }
        });
      })
      .on('resizeGroup', ({ events }) => {
        events.forEach(({ target, width, height, drag }, i) => {
          resize(target, width, height);
          move(target, drag.beforeTranslate);
        });
      })
      .on('resizeGroupEnd', ({ targets, isDrag, clientX, clientY }) => {
        console.log('onResizeGroupEnd', targets, isDrag);
      });

    this.managerMoveabler
      .on('rotateGroupStart', ({ events }) => {
        events.forEach(({ target, set, dragStart }) => {
          const frame = getFrame(target);
          const frameData = getFrameData(frame);
          set(frameData.angle);
          if (dragStart) {
            dragStart.set([frameData.left, frameData.top]);
          }
        });
      })
      .on('rotateGroup', ({ events, delta }) => {
        events.forEach(({ target, beforeRotate, drag }) => {
          rotate(target, beforeRotate);
          move(target, drag.beforeTranslate);
        });
      })
      .on('rotateGroupEnd', ({ targets, isDrag, clientX, clientY }) => {
        console.log('onRotateGroupEnd');
      });

    this.managerSelector
      .on('dragStart', (e) => {
        const target = e.inputEvent.target;
        if (
          this.managerMoveabler.isMoveableElement(target) ||
          targetsSelected.some((t) => t === target || t.contains(target))
        ) {
          e.stop();
        }
      })
      .on('selectStart', ({ selected }) => {
        console.log('selectStart', selected);
      })
      .on('select', ({ selected }) => {
        targetsSelected = selected;
        this.managerMoveabler.target = selected;

        if (targetsSelected.length === 1) {
          this.selectedElement(jQuery(targetsSelected[0]));
        } else {
          this.offMenuElements();
        }
      })
      .on('selectEnd', ({ isDragStart, inputEvent, selected }) => {
        console.log('selectEnd', selected);
        selected.forEach((target) => {
          getFrame(target);
        });
        if (isDragStart) {
          inputEvent.preventDefault();
          setTimeout(() => {
            this.managerMoveabler.dragStart(inputEvent);
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
    const svgColorCommand = new SvgColorCommand(dataElement);
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
            actions: [{ event: 'change', command: svgColorCommand }],
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
            actions: [{ event: 'change', command: svgColorCommand }],
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
            actions: [{ event: 'change', command: svgColorCommand }],
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
