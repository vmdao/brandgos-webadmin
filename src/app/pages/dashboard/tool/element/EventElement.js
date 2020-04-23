import $ from 'jquery';
function EventElement(rootElement) {
  this.el = $(rootElement);
  this.selector = {};
  this.events = '';
}

const ghost = EventElement.prototype;
ghost.selected = function (data) {
  var seft = this,
    currenEvent = null;
  return function (event) {
    var typeEvent = event.type;
    seft.events = event.type;
    null === currenEvent && (currenEvent = typeEvent);
    return typeEvent !== currenEvent ? !0 : data.call(this, event);
  };
};

ghost.on = function (events, selector, callback) {
  var seft = this,
    seftSelector;
  'function' === typeof callback
    ? ((seftSelector = selector), (selector = callback))
    : (seftSelector = '');
  if (0 <= events.indexOf('|')) {
    var selectedElement = this.selected(selector);
    selector.selected = selectedElement;
    setEventSelected(this, events, seftSelector, selectedElement);
    getArrayEvent(events).forEach(function (event) {
      if (seftSelector) seft.el.on(event, seftSelector, selectedElement);
      else seft.el.on(event, selectedElement);
    });
  } else if (
    (setEventSelected(this, events, seftSelector, selector), seftSelector)
  ) {
    this.el.on(events, seftSelector, selector);
  } else this.el.on(events, selector);
  return this;
};

ghost.off = function (events, selector, callback) {
  var seft = this,
    seftSelector;
  'function' === typeof callback
    ? ((seftSelector = selector), (selector = callback))
    : (seftSelector = '');
  var selectedElement = this.selector[events + '_' + seftSelector];
  if (selectedElement) {
    if (selectedElement !== (selector.selected || selector)) {
      throw Error('errors');
    }
    selector.selected = null;
    solutionString(events).forEach(function (event) {
      seftSelector
        ? seft.el.off(event, seftSelector, selectedElement)
        : seft.el.off(event.selectElement);
    });
    delete this.selected[events + '_' + selector];
  }
  return this;
};

ghost.selected = function (a) {
  var b = this,
    c = null;
  return function (d) {
    var e = d.type;
    b.KR = e;
    null === c && (c = e);
    return e !== c ? !0 : a.call(this, d);
  };
};

export default EventElement;

function setEventSelected(objectEvent, events, selector, selectorSelected) {
  if (objectEvent.selector[events + '_' + selector]) {
    // throw 'errors';
    return Error('errors');
  }
  objectEvent.selector[events + '_' + selector] = selectorSelected;
}

function getArrayEvent(stringEvent) {
  return stringEvent.split('|').filter(function (stringEvent) {
    return '' !== stringEvent;
  });
}

function solutionString(str) {
  return str.split(/[|+]/).filter(function (str) {
    return '' !== str;
  });
}
