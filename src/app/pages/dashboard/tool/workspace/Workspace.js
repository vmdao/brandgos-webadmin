import ElementImage from '../element/ElementImage';
import ElementText from '../element/ElementText';
import ElementSvg from '../element/ElementSvg';
import ElementSvgText from '../element/ElementSvgText';
class Workspace {
  constructor(data) {
    this.width = this.height = 0;
    this.layout = data.layout.code;
    this.elements = [];
    this.version = data.versionIndex;
    this.name = data.name;
    this.init(data);
  }
}

_.extend(Workspace.prototype, Backbone.Events);

const ghost = Workspace.prototype;

ghost.trigger = Backbone.Events.trigger;

ghost.init = function (data) {
  this.width = data.width;
  this.height = data.height;
  this.first = data.first;
  this.callElement(data.elements);
  this.cachedMedia = [];
};

ghost.initEvent = function () {};

ghost.callElement = function (dataElements) {
  dataElements.forEach(
    (data, index) => ((data.elementIndex = index), this.createElement(data))
  );
};

ghost.createElement = function (data) {
  const element = switchElement(data);
  this.addElement(element);
};

ghost.addElement = function (element, parentSvg) {
  this.elements.push(element);
  this.trigger('element:add', element);
};

ghost.cloneElement = function (element) {
  this.elements.push(element);
  this.trigger('element:copy', element);
};

ghost.getElements = function () {
  return this.elements;
};

ghost.deleteElement = function (dataElement) {
  _.remove(this.elements, (e) => {
    return dataElement.eid === e.eid;
  });
  dataElement.getDom().remove();
};

ghost.updateLayer = function (dataElement, type) {
  const indexCurrent = _.findIndex(
    this.elements,
    (e) => e.eid === dataElement.eid
  );
  const indexMax = this.elements.length - 1;
  let indexNew = 0;
  if (type === 'back') {
    indexNew = dataElement.index - 1 < 0 ? 0 : dataElement.index - 1;
  } else {
    indexNew =
      dataElement.index + 1 > indexMax ? indexMax : dataElement.index + 1;
  }
  move(this.elements, indexCurrent, indexNew);

  this.elements[indexCurrent].setIndex(indexNew);
  this.elements[indexNew].setIndex(indexCurrent);

  this.trigger(
    'element:changelayer',
    dataElement.getDom(),
    indexCurrent,
    indexNew
  );
};

function switchElement(data) {
  switch (data.elementType) {
    case 'image':
      return new ElementImage(data);
    case 'text':
      return new ElementText(data);
    case 'svgtext':
      return new ElementSvgText(data);
    case 'svg':
      return new ElementSvg(data);
    default:
      return;
  }
}

function move(array, fromIndex, toIndex) {
  array.splice(toIndex, 0, array.splice(fromIndex, 1)[0]);
}
export default Workspace;
