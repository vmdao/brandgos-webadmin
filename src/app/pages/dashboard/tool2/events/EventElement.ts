import $ from 'jquery';

export class EventElement {
  el: any;
  selector = {};
  events = '';
  constructor(container) {
    this.el = $(container);
    this.selector = {};
    this.events = '';
  }

  selected(data) {
    let currenEvent = null;
    return (event) => {
      const typeEvent = event.type;
      this.events = event.type;
      // tslint:disable-next-line: no-unused-expression
      null === currenEvent && (currenEvent = typeEvent);
      return typeEvent !== currenEvent ? !0 : data.call(this, event);
    };
  }

  on(events, selector?: any, callback?: any) {
    let seftSelector;
    'function' === typeof callback
      ? ((seftSelector = selector), (selector = callback))
      : (seftSelector = '');

    if (0 <= events.indexOf('|')) {
      const selectedElement = this.selected(selector);
      selector.selected = selectedElement;
      setEventSelected(this, events, seftSelector, selectedElement);
      getArrayEvent(events).forEach((event) => {
        if (seftSelector) {
          this.el.on(event, seftSelector, selectedElement);
        } else {
          this.el.on(event, selectedElement);
        }
      });
    } else if (
      (setEventSelected(this, events, seftSelector, selector), seftSelector)
    ) {
      this.el.on(events, seftSelector, selector);
    } else {
      this.el.on(events, selector);
    }
    return this;
  }

  off(events, selector, callback?) {
    let seftSelector = '';

    if ('function' === typeof callback) {
      seftSelector = selector;
      selector = callback;
    }
    
    const selectedElement = this.selector[events + '_' + seftSelector];

    if (selectedElement) {
      // if (selectedElement !== (selector.selected || selector)) {
      //   throw Error('errors');
      // }

      selector.selected = null;
      solutionString(events).forEach((event) => {
        seftSelector
          ? this.el.off(event, seftSelector, selectedElement)
          : this.el.off(event.selectElement);
      });

      delete this.selected[events + '_' + selector];
    }
    return this;
  }
}

function setEventSelected(objectEvent, events, selector, selectorSelected) {
  if (objectEvent.selector[events + '_' + selector]) {
    return Error('errors');
  }
  objectEvent.selector[events + '_' + selector] = selectorSelected;
}

function getArrayEvent(stringEvent) {
  return stringEvent.split('|').filter((event) => {
    return '' !== event;
  });
}

function solutionString(str) {
  return str.split(/[|+]/).filter((str2) => {
    return '' !== str2;
  });
}
