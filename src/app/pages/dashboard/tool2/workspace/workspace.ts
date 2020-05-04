import { BaseElement } from '../elements/base.abstract';
import * as jQuery from 'jquery';
import { EventElement } from '../events/EventElement';
import * as _ from 'lodash';
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
  elements: Array<BaseElement> = [];

  //   trigger = new EventEmitter();
  constructor(option) {
    this.documentId = option.documentId;
    this.width = option.width;
    this.height = option.height;
    this.code = option.code;
    this.version = option.version;
    this.order = option.order;
    this.$domWrapper = jQuery(`<div class="workspace" id="workspace"></div>`);
    this.$dom = jQuery(`<div class="elements"></div>`);
  }

  //   setupEmiter
  render(selector: string) {
    this.renderSize();
    this.$dom = jQuery(`<div class="elements"></div>`);
    this.$dom.appendTo(this.$domWrapper);
    this.$domWrapper.appendTo(selector);
  }

  renderSize() {
    this.$dom.css({ width: this.width, height: this.height });
  }

  renderElements() {
    this.$dom.css({ width: this.width, height: this.height });
  }

  addElement(element: BaseElement) {
    this.elements = this.elements.concat([element]);
  }

  renderElement(element: BaseElement) {
    this.$dom.append(element.$dom);
  }

  event() {
    new EventElement('#workspace')
      .on('mousedown', '.element:not(.focused)', elementMouseDown)
      .on('touchstart', '.element:not(.focused)', elementMouseDown);
  }
}

function elementMouseDown(eventMousedown) {
  const eventDocument = new EventElement(jQuery(document));

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

  if (3 === eventMousedown.which || eventMousedown.ctrlKey) {
    return !0;
  }

  const eventTarget = jQuery(eventMousedown.target);
  // isParentGroup = eventTarget.parents(".group"),
  // isElement = eventTarget.is(".element"),
  // isGroup = eventTarget.is(".group"),
  const isText = eventTarget.is('.text');

  const elementSelect = isText ? eventTarget.closest('.element') : jQuery(this);
  const ghostElement = jQuery(eventMousedown.currentTarget).hasClass(
    'selectedBound'
  )
    ? jQuery(eventMousedown.currentTarget)
    : !1;

  const dataElement = elementSelect.data('dataElement');

  const menuElement = dataElement.getDom().data('menuElement');
  // bounding = elementSelect.get(0).getBoundingClientRect(),
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
  const rotateStart = dataElement.getRotate();

  elementSelect.data('startX', startX);
  elementSelect.data('startY', startY);
  if (menuElement) {
    menuElement.hideSubmenu();
  }

  if (!dataElement.getSelected()) {
    checkElementSelected(eventMousedown);
  }

  // eventDocument
  //   .on('mousemove|touchmove', setEventMouseMove)
  //   .on('mouseup|touchend', setEventMouseUp);
  return !1;
}

function checkElementSelected(event) {
  // if (unSelected(event) && workspaceModel) {
  //   workspaceModel.getElements().forEach(removeElementSelected);
  // }
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

const getStringTranform = (left, top, rotate) => {
  return (
    'translate3d(' + left + 'px,' + top + 'px, 0)rotateZ(' + rotate + 'deg)'
  );
};

function createSelectedElement(element) {
  let ghostElement = element.data('ghostElement');
  let menuElement = element.data('menuElement');
  const dataElement = element.data('dataElement');
  const angleWorkspace = jQuery('#angleWorkspace');
  if (dataElement.selected) {
    return;
  }

  element.addClass('selected');

  if (!ghostElement) {
    ghostElement = jQuery(
      // tslint:disable-next-line: max-line-length
      `<div class="selectedBound handleCircle"><div class="ghostElement"></div><a class="cube tl"></a><a class="cube t"></a><a class="cube tr"></a><a class="cube r"></a><a class="cube br"></a><a class="cube b"></a><a class="cube bl"></a><a class="cube l"></a><a class="rotate" title="Rotate"></a></div>`
    );
  }

  element.data('ghostElement', ghostElement);
  if (element.hasClass('text')) {
    ghostElement.addClass('text');
  }

  ghostElement.data('element', element).appendTo(angleWorkspace);

  if (element.hasClass('text')) {
    jQuery('.cube.tl, .cube.t, .cube.tr, .cube.bl, .cube.b, .cube.br').css(
      'display',
      'none'
    );

    element.addClass('selected focused');
    element.children('.inner').attr('contenteditable', 'true');
    element.on('paste', onPaste);
    element.appendTo(angleWorkspace);
    if (!menuElement) {
      menuElement = createMenu('text', dataElement);
    }

    element.data('menuElement', menuElement);
  } else if (element.hasClass('image')) {
    jQuery('.cube.l, .cube.t, .cube.r, .cube.b').css('display', 'none');
    if (!menuElement) {
      menuElement = createMenu('image', dataElement);
    }
  } else if (element.hasClass('svg')) {
    jQuery('.cube.l, .cube.t, .cube.r, .cube.b').css('display', 'none');
    if (!menuElement) {
      menuElement = createMenu('svg', dataElement);
    }
  } else if (element.hasClass('textsvg')) {
    jQuery('.cube.l, .cube.t, .cube.r, .cube.b').css('display', 'none');
    if (!menuElement) {
      menuElement = createMenu('textsvg', dataElement);
    }
  }

  element.data('menuElement', menuElement);
  menuElement.render();

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

function createMenu(type, dataElement) {
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
