import $ from 'jquery';
import Backbone from 'backbone';

const WorkspaceView = Backbone.View.extend({
  tagName: 'div',
  className: 'workspace',
  id: 'workspace',
  events: {
    // 'dragenter': 'onDragEnter'
  },
});

const ghost = WorkspaceView.prototype;

ghost.initialize = function (data) {
  this.model = data.model || {};
  this.width = this.model.width;
  this.height = this.model.height;
  this.background = !1;
  this.name = this.model.name;
  this.listenTo(this.model, {
    'element:add': this.renderElement,
    'element:copy': this.elementCopy,
    'element:changelayer': this.elementChangeLayer,
  });
  this.first = data.model.first;
  this.render();
  if (this.first === 1) this.renderNewIdeas();
};

ghost.render = function () {
  this.$el.css({
    width: this.width,
    height: this.height,
  });
  this.$el.html("<div id='elements'></div>");
  this.$el.appendTo($('#areaWorkspace'));
  return this;
};

ghost.renderNewIdeas = function () {
  this.model.elements.forEach(this.renderElement, this);
};

ghost.getModel = function () {
  return this.model;
};

ghost.renderElement = function (element) {
  var domElement = element.getDom();

  domElement.appendTo(this.$el.children('#elements'));

  if (domElement.hasClass('text')) {
    domElement
      .data('dataElement')
      .setHeight(domElement.children('.inner').height());
    domElement.css('height', domElement.children('.inner').height());
  }
};

ghost.elementCopy = function (dataElement) {
  const data = dataElement.getData();
  data.left = 0;
  data.top = 0;

  if (dataElement.left < 0) {
    data.left = 50;
  } else if (this.width - dataElement.left < 60) {
    data.left = this.width - 75;
  } else {
    data.left = dataElement.left + 50;
  }

  if (dataElement.top < 0) {
    data.top = 50;
  } else if (this.height - dataElement.top < 60) {
    data.top = this.height - 75;
  } else {
    data.top = dataElement.top + 50;
  }

  this.model.createElement(data);
};

ghost.elementChangeLayer = function (elementCurrent, indexCurrent, indexNew) {
  if (indexCurrent < indexNew) {
    $(elementCurrent).insertAfter($(`.element:eq(${indexNew})`));
  } else {
    $(elementCurrent).insertBefore($(`.element:eq(${indexNew})`));
  }
};
export default WorkspaceView;
