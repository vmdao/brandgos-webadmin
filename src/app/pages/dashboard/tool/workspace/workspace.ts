import * as _ from 'lodash';
import * as jQuery from 'jquery';
import { Frame } from 'scenejs';

import {
  TextSvgElement,
  SvgElement,
  SvgDrawElement,
  TextElement,
} from '../elements';
import { ToolbarMenu } from '../toolkit/toolbar/menu';
import { BaseElement } from '../elements/base.abstract';

import Selecto from 'selecto';
import Moveable from 'moveable';
import { IObject } from '@daybrush/utils';
class CusMoveable extends Moveable {
  public keepRatio: boolean;
  public target:
    | SVGElement
    | HTMLElement
    | Array<SVGElement | HTMLElement>
    | null;
  public renderDirections: string[];
  public elementGuidelines: Element[];
}

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
  CurveCommand,
  LetterSpacingCommand,
  StrokeWidthCommand,
  StrokeColorCommand,
  FlipHorizontalCommand,
  FlipVerticalCommand,
} from '../toolkit/command';

import HistoryManager from '../utils/HistoryManager';
import Debugger from '../utils/Debugger';
import EventBus from '../utils/EventBus';
import Memory from '../utils/Memory';
import KeyManager from '../KeyManager/KeyManager';
import ClipboardManager from '../utils/ClipboardManager';
import { isMacintosh } from '../utils/consts';

export class Workspace {
  $dom: any;
  $domHeading: any;
  $domBody: any;
  $domControll: any;
  $domWrapper: any;
  $domArea: any;
  $domWorkspaceExpand: any;
  $domBackground: any;
  $toolbar;

  width: number;
  height: number;

  documentId: number;
  code: string;
  name: string;
  version: string;

  order: number;
  elements: Array<BaseElement> = [];
  managerSelector: Selecto;
  managerMoveabler: CusMoveable;

  public console = new Debugger(true);
  public historyManager = new HistoryManager(this);
  public eventBus = new EventBus();
  public memory = new Memory();

  public keyManager = new KeyManager(this.console);
  public clipboardManager = new ClipboardManager(this);

  constructor(option) {
    this.documentId = option.documentId;
    this.width = option.width;
    this.height = option.height;
    this.code = option.code;
    this.version = option.version;
    this.order = option.order;

    this.$toolbar = jQuery(`#toolbar`);
    this.$dom = jQuery(`<div class="elements"></div>`);
    this.setupHotkey();
  }

  removeByIds(ids: string[], isRestore?: boolean) {
    return this.removeElements(this.getViewport().getElements(ids), isRestore);
  }

  public removeElements(
    targets: Array<HTMLElement | SVGElement>,
    isRestore?: boolean
  ) {
    const viewport = this.getViewport();
    const frameMap = this.removeFrames(targets);
    const indexesList = viewport.getSortedIndexesList(targets);
    const indexesListLength = indexesList.length;
    let scopeId = '';
    let selectedInfo: BaseElement | null = null;

    if (indexesListLength) {
      const lastInfo = viewport.getInfoByIndexes(
        indexesList[indexesListLength - 1]
      );
      const nextInfo = viewport.getNextInfo(lastInfo.id!);

      scopeId = lastInfo.scopeId!;
      selectedInfo = nextInfo;
    }
    // return;
    return viewport.removeTargets(targets).then(({ removed }) => {
      let selectedTarget =
        selectedInfo ||
        viewport.getLastChildInfo(scopeId)! ||
        viewport.getInfo(scopeId);

      this.setSelectedTargets(
        selectedTarget && selectedTarget.el ? [selectedTarget.el!] : [],
        true
      );

      this.console.log('removeTargets', removed);
      // !isRestore &&
      //   this.historyManager.addAction('removeElements', {
      //     infos: removed.map(function removeTarget(
      //       info: BaseElement
      //     ): BaseElement {
      //       return {
      //         ...info,
      //         children: info.children!.map(removeTarget),
      //         frame: frameMap[info.id!] || info.frame,
      //       };
      //     }),
      //   });
      return targets;
    });
  }

  public getViewport() {
    return this.$dom;
  }

  public removeFrames(targets: Array<HTMLElement | SVGElement>) {
    const frameMap: IObject<any> = {};
    const moveableData = [];
    const viewport = this;

    // targets.forEach(function removeFrame(target) {
    //   const info = viewport.getInfoByElement(target)!;

    //   frameMap[info.id!] = moveableData.getFrame(target).get();
    //   moveableData.removeFrame(target);

    //   info.children!.forEach((childInfo) => {
    //     removeFrame(childInfo.el!);
    //   });
    // });

    return frameMap;
  }

  public setSelectedTargets(
    targets: Array<HTMLElement | SVGElement>,
    isRestore?: boolean
  ) {
    targets = targets.filter((target) => {
      return targets.every(
        (parnetTarget) =>
          parnetTarget === target || !parnetTarget.contains(target)
      );
    });
    // return this.promiseState({
    //   selectedTargets: targets,
    // }).then(() => {
    //   if (!isRestore) {
    //     const prevs = getIds(this.moveableData.getSelectedTargets());
    //     const nexts = getIds(targets);

    //     if (!prevs.every((prev, i) => nexts[i] === prev)) {
    //       this.historyManager.addAction('selectTargets', {
    //         prevs,
    //         nexts,
    //       });
    //     }
    //   }
    //   this.selecto.current!.setSelectedTargets(targets);
    //   this.moveableData.setSelectedTargets(targets);
    //   this.eventBus.trigger('setSelectedTargets');
    //   return targets;
    // });
  }

  setupHotkey() {
    this.keyManager.keydown(
      [isMacintosh ? 'meta' : 'ctrl', 'v'],
      () => {},
      'Paste'
    );
    this.keyManager.keydown(
      [isMacintosh ? 'meta' : 'ctrl', 'z'],
      () => {
        this.historyManager.undo();
      },
      'Undo'
    );
    this.keyManager.keydown(
      [isMacintosh ? 'meta' : 'ctrl', 'shift', 'z'],
      () => {
        this.historyManager.redo();
      },
      'Redo'
    );
  }

  changeView(zoom: number) {
    this.$domBody.css({
      width: this.width,
      height: this.height,
      transform: `scale(${zoom})`,
    });
    this.$domWrapper.css({
      width: zoom * this.width,
      height: zoom * this.height,
    });
  }

  render(selector: string) {
    this.renderSize();
    this.$domWrapper = jQuery(`<div class="page"></div>`);

    this.$domControll = jQuery(`<div class="page-controll"></div>`);
    this.$domHeading = jQuery(`<div class="page-heading"></div>`);
    this.$domBody = jQuery(`<div class="page-body"></div>`);

    this.$dom = jQuery(`<div class="elements"></div>`);

    this.$dom.appendTo(this.$domBody);
    this.$domHeading.appendTo(this.$domWrapper);
    this.$domBody.appendTo(this.$domWrapper);
    this.$domControll.appendTo(this.$domWrapper);

    this.$domWrapper.appendTo(selector);

    this.$domArea = jQuery(`.book-body`);

    this.updateStyle({});
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
    dataMenu2.appendTo('#toolbar');
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
      case 'svgdraw':
        return new SvgDrawElement(dataElement);
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
      container: this.$domWrapper.get(0),
      dragContainer: '.book-body',
      selectableTargets: ['.elements .element'],
      hitRate: 0,
      selectByClick: true,
      selectFromInside: false,
      toggleContinueSelect: ['shift'],
    });

    this.managerMoveabler = new Moveable(this.$domWrapper.get(0), {
      zoom: 1,
      edge: false,
      keepRatio: true,
      pinchable: true,
      roundable: true,

      draggable: true,
      resizable: true,
      rotatable: true,

      throttleDrag: 0,
      throttleResize: 1,
      throttleRotate: 0,

      snappable: true,
      snapCenter: true,
      snapHorizontal: true,
      snapVertical: true,
      snapElement: true,
      snapThreshold: 0,
      elementGuidelines: [],
    });

    this.managerMoveabler
      .on('renderStart', ({ target }) => {
        // console.log('renderStart');
      })
      .on('render', ({ target }) => {
        const frame = getFrame(target);
        target.style.cssText += frame.toCSS();
      })
      .on('renderEnd', ({ target }) => {
        updateElement(target);
      });

    this.managerMoveabler
      .on('dragStart', ({ target, set }) => {
        const frame = getFrame(target);
        const frameData = getFrameData(frame);
        const dataElement = jQuery(target).data('dataElement');
        resize(target, dataElement.width, dataElement.height);
        set([frameData.left, frameData.top]);
      })
      .on('drag', ({ target, beforeTranslate }) => {
        move(target, beforeTranslate);
      })
      .on('dragEnd', ({ target }) => {
        // console.log('dragEnd');
      });

    this.managerMoveabler.on('round', ({ target, borderRadius, ...e }) => {
      const numberborderRadius = Number(borderRadius.replace('px', ''));
      round(target, numberborderRadius);
    });

    this.managerMoveabler
      .on('rotateStart', ({ target, set }) => {
        // console.log('rotateStart');
        const frame = getFrame(target);
        const frameData = getFrameData(frame);
        const dataElement = jQuery(target).data('dataElement');
        resize(target, dataElement.width, dataElement.height);
        set(frameData.angle);
      })
      .on('rotate', ({ target, beforeRotate }) => {
        rotate(target, beforeRotate);
      })
      .on('rotateEnd', ({ target }) => {});

    const directionScale = { '-10': true, 10: true, '0-1': true, '01': true };

    this.managerMoveabler
      .on('resizeStart', ({ target, dragStart, setOrigin, direction }) => {
        if (directionScale[`${direction[0]}${direction[1]}`]) {
          this.managerMoveabler.keepRatio = false;
        } else {
          this.managerMoveabler.keepRatio = true;
        }
        setOrigin(['%', '%']);
        if (dragStart) {
          const frame = getFrame(target);
          dragStart.set([
            parseFloat(frame.get('transform', 'translateX')),
            parseFloat(frame.get('transform', 'translateY')),
          ]);
        }
      })
      .on('resize', ({ target, width, drag, height, direction }) => {
        // console.log('resize');
        if (directionScale[`${direction[0]}${direction[1]}`]) {
          scale(target, width, height);
        } else {
          resize(target, width, height);
        }
        move(target, drag.beforeTranslate);
      })
      .on('resizeEnd', () => {});

    this.managerMoveabler
      .on('renderGroupStart', ({ targets }) => {})
      .on('renderGroup', ({ targets }) => {
        targets.forEach((target) => {
          const frame = getFrame(target);
          target.style.cssText += frame.toCSS();
        });
      })
      .on('renderGroupEnd', ({ targets }) => {
        // console.log('renderGroupEnd');
        targets.forEach((target) => {
          updateElement(target);
        });
      });

    this.managerMoveabler.on('clickGroup', (e) => {
      this.managerSelector.clickTarget(e.inputEvent, e.inputTarget);
    });

    this.managerMoveabler
      .on('dragGroupStart', ({ events }) => {
        // console.log('dragGroupStart');
        events.forEach(({ target, set }) => {
          const frame = getFrame(target);
          const frameData = getFrameData(frame);
          const dataElement = jQuery(target).data('dataElement');
          resize(target, dataElement.width, dataElement.height);
          set([frameData.left, frameData.top]);
        });
      })
      .on('dragGroup', ({ events }) => {
        // console.log('dragGroup');
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
          const dataElement = jQuery(target).data('dataElement');
          resize(target, dataElement.width, dataElement.height);
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
          const dataElement = jQuery(target).data('dataElement');
          resize(target, dataElement.width, dataElement.height);
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
        // console.log('selectStart', selected);
      })
      .on('select', ({ selected }) => {
        targetsSelected = selected;
        this.managerMoveabler.target = selected;
        if (targetsSelected.length === 1) {
          this.selectedElement(jQuery(targetsSelected[0]));
        } else {
          const renderDirections = ['nw', 'ne', 'sw', 'se'];
          this.managerMoveabler.renderDirections = renderDirections;
          this.managerMoveabler.keepRatio = true;
          this.offMenuElements();
        }
      })
      .on('selectEnd', ({ isDragStart, inputEvent, selected }) => {
        const elementsGuidelines = Array.from(
          document.querySelectorAll('.elements .element')
        );
        this.managerMoveabler.elementGuidelines = elementsGuidelines;
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

    function updateElement(dom) {
      const frame = getFrame(dom);
      const frameData = getFrameData(frame);
      const dataElement = jQuery(dom).data('dataElement');
      dataElement.setAngle(frameData.angle);
      dataElement.setLeft(frameData.left);
      dataElement.setTop(frameData.top);
      dataElement.setWidth(frameData.width);
      dataElement.setHeight(frameData.height);
    }

    function move(target, translate: number[]) {
      const frame = getFrame(target);
      frame.set('transform', 'translateX', `${translate[0]}px`);
      frame.set('transform', 'translateY', `${translate[1]}px`);
    }

    function rotate(target, angle) {
      const frame = getFrame(target);
      frame.set('transform', 'rotate', `${angle}deg`);
    }

    function round(target, borderRadius) {
      const frame = getFrame(target);
      frame.set('border-radius', `${borderRadius}px`);
      const dataElement = jQuery(target).data('dataElement');
      dataElement.setBorderRadius(borderRadius);
      dataElement.updateSvg();
    }

    function resize(target, width, height) {
      const frame = getFrame(target);
      frame.set('width', `${width}px`);
      frame.set('height', `${height}px`);

      const dataElement = jQuery(target).data('dataElement');
      if (dataElement.elementType === 'svgdraw') {
        dataElement.setWidth(width);
        dataElement.setHeight(height);
        dataElement.updateSvg();
      }
    }

    function scale(target, width, height) {
      const frame = getFrame(target);
      frame.set('width', `${width}px`);
      frame.set('height', `${height}px`);
      const dataElement = jQuery(target).data('dataElement');
      dataElement.setWidth(width);
      dataElement.setHeight(height);
      dataElement.updateSvg();
    }

    function getFrame(target) {
      let frame = frameMap.get(target);
      if (!frameMap.has(target)) {
        const dataElement = jQuery(target).data('dataElement');
        const box = dataElement.getBox();
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
        frameMap.set(target, frame);
      }

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
  }

  selectedElement(elementSelected) {
    const $elementSelected = jQuery(elementSelected);
    const dataElement = $elementSelected.data('dataElement');
    const renderDirections =
      dataElement.elementType === 'svgdraw'
        ? ['n', 'nw', 'ne', 's', 'se', 'sw', 'e', 'w']
        : ['nw', 'ne', 'sw', 'se'];

    this.managerMoveabler.renderDirections = renderDirections;
    this.offMenuElementsWithout(dataElement);
  }

  createMenu(dataElement) {
    const inputCommand = new InputCommand(dataElement, this);
    const curveCommand = new CurveCommand(dataElement, this);
    const strokeColorCommand = new StrokeColorCommand(dataElement);
    const strokeWidthCommand = new StrokeWidthCommand(dataElement);
    const letterSpacingCommand = new LetterSpacingCommand(dataElement, this);
    const transparencyCommand = new TransparencyCommand(dataElement);
    const fontFamilyCommand = new FontFamilyCommand(dataElement, this);
    const fontsizeCommand = new FontsizeCommand(dataElement, this);
    const colorCommand = new ColorCommand(dataElement);
    const svgColorCommand = new SvgColorCommand(dataElement);
    const transformCommand = new TransformCommand(dataElement, this);
    const cloneComand = new CloneCommand(dataElement, this);
    const deleteCommand = new DeleteCommand(dataElement, this);

    const flipHorizontalCommand = new FlipHorizontalCommand(dataElement);
    const flipVerticalCommand = new FlipVerticalCommand(dataElement);

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
            type: 'button-input',
            icon: '',
            name: 'button-input',
            actions: [{ event: 'click', command: curveCommand }],
            children: [],
            context: {
              content: dataElement.text.curve,
              step: 10,
              max: 360,
              min: -360,
            },
          },
          {
            type: 'button-input',
            icon: '',
            name: 'button-input',
            actions: [{ event: 'click', command: letterSpacingCommand }],
            children: [],
            context: {
              content: dataElement.text.letterSpacing,
              step: 0.1,
              max: 10,
              min: -10,
            },
          },

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
            position: 'right',
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
            icon: 'delete',
            name: 'Delete',
            actions: [{ event: 'click', command: deleteCommand }],
            children: [],
            context: {},
            position: 'right',
          },
          {
            type: 'button',
            icon: 'clone',
            name: 'Clone',
            actions: [{ event: 'click', command: cloneComand }],
            children: [],
            context: {},
            position: 'right',
          },
        ];
        break;
      }
      case 'svgdraw':
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
            type: 'button-input',
            icon: '',
            name: 'button-input',
            actions: [{ event: 'click', command: strokeWidthCommand }],
            children: [],
            context: {
              content: dataElement.svg.strokeWidth,
              step: 1,
              max: 60,
              min: 0,
            },
          },
          {
            type: 'button-color',
            icon: '',
            name: 'color1',
            actions: [{ event: 'change', command: strokeColorCommand }],
            children: [],
            context: {
              strokeColor: dataElement.svg.strokeColor,
            },
          },
          {
            type: 'button',
            icon: 'delete',
            name: 'Delete',
            actions: [{ event: 'click', command: deleteCommand }],
            children: [],
            context: {},
            position: 'right',
          },
          {
            type: 'button',
            icon: 'clone',
            name: 'Clone',
            actions: [{ event: 'click', command: cloneComand }],
            children: [],
            context: {},
            position: 'right',
          },

          {
            type: 'drop-pad',
            icon: '',
            code: 'Layer',
            name: 'Layer',
            actions: [],
            children: [
              {
                type: 'button',
                icon: 'clone',
                name: 'Clone',
                actions: [{ event: 'click', command: cloneComand }],
                children: [],
                context: {},
              },
              {
                type: 'button',
                icon: 'clone',
                name: 'Clone',
                actions: [{ event: 'click', command: cloneComand }],
                children: [],
                context: {},
              },
            ],
            context: {},
            position: 'right',
          },
        ];
        break;
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
            icon: 'delete',
            name: 'Delete',
            actions: [{ event: 'click', command: deleteCommand }],
            children: [],
            context: {},
            position: 'right',
          },
          {
            type: 'button',
            icon: 'clone',
            name: 'Clone',
            actions: [{ event: 'click', command: cloneComand }],
            children: [],
            context: {},
            position: 'right',
          },

          {
            type: 'drop-pad',
            icon: '',
            code: 'Layer',
            name: 'Layer',
            actions: [],
            children: [
              {
                type: 'button',
                icon: 'clone',
                name: 'Clone',
                actions: [{ event: 'click', command: cloneComand }],
                children: [],
                context: {},
              },
              {
                type: 'button',
                icon: 'clone',
                name: 'Clone',
                actions: [{ event: 'click', command: cloneComand }],
                children: [],
                context: {},
              },
            ],
            context: {},
            position: 'right',
          },
        ];
        break;
      }
    }

    const itemsFix = [
      {
        type: 'button-toggle',
        icon: 'uppercase',
        name: 'transform',
        actions: [{ event: 'click', command: flipHorizontalCommand }],
        children: [],
        context: {
          isActive: dataElement.flipHorizontal ? true : false,
        },
        position: 'right',
      },
      {
        type: 'button-toggle',
        icon: 'uppercase',
        name: 'transform',
        actions: [{ event: 'click', command: flipVerticalCommand }],
        children: [],
        context: {
          isActive: dataElement.flipVertical ? true : false,
        },
        position: 'right',
      },
    ];

    return this.buildMenu(dataElement, [...items, ...itemsFix]);
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

function undoCreateElements(
  { infos, prevSelected }: IObject<any>,
  editor: Workspace
) {
  const res = editor.removeByIds(
    infos.map((info: BaseElement) => info.elementId),
    true
  );

  if (prevSelected) {
    res.then(() => {
      editor.setSelectedTargets(
        editor.getViewport().getElements(prevSelected),
        true
      );
    });
  }
}
function restoreElements({ infos }: IObject<any>, editor: Workspace) {
  // editor.appendJSXs(
  //   infos.map((info: BaseElement) => ({
  //     ...info,
  //   })),
  //   true
  // );
}
function undoSelectTargets({ prevs, nexts }: IObject<any>, editor: Workspace) {
  // editor.setSelectedTargets(editor.viewport.current!.getElements(prevs), true);
}
function redoSelectTargets({ prevs, nexts }: IObject<any>, editor: Workspace) {
  // editor.setSelectedTargets(editor.viewport.current!.getElements(nexts), true);
}
function undoChangeText({ prev, next, id }: IObject<any>, editor: Workspace) {
  const info = editor.getViewport().getInfo(id)!;
  info.innerText = prev;
  info.el!.innerText = prev;
}
function redoChangeText({ prev, next, id }: IObject<any>, editor: Workspace) {
  const info = editor.getViewport().getInfo(id)!;
  info.innerText = next;
  info.el!.innerText = next;
}
