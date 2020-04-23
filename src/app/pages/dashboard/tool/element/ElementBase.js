import $ from 'jquery';
import { getStringTranform } from '../utils';

function ElementBase(data) {
  this.$dom = $('<div class="element">');
  this.$dom.data('dataElement', this);
  this.selected = !1;
  this.transparency = data.transparency;
  this.rotation = this.height = this.width = this.top = this.left = 0;
  this.index = data.elementIndex;
  this.type = data.type || '';
  this.typeElement = data.typeElement || '';
  this.eid = new Date().getTime();
}

let ghost = ElementBase.prototype;

ghost.trigger = Backbone.Events.trigger;
ghost.listenTo = Backbone.Events.listenTo;
ghost.stopListening = Backbone.Events.stopListening;
ghost.on = Backbone.Events.on;
ghost.once = Backbone.Events.once;
ghost.off = Backbone.Events.off;

_.extend(ElementBase.prototype, Backbone.Events);

ghost = ElementBase.prototype;

ghost.render = function (domElement) {
  domElement.appendTo($('#elements'));
};

ghost.setIndex = function (index) {
  this.index = index;
};

ghost.setStyle = function (left, top, width, height, rotate) {
  this.left = left;
  this.top = top;
  this.width = width;
  this.height = height;
  this.rotation = rotate;
};

ghost.setSelected = function (selected) {
  this.selected = selected;
};

ghost.getSelected = function () {
  return this.selected;
};

ghost.getRotate = function () {
  return this.rotation;
};

ghost.setRotate = function (rotate) {
  this.rotation = rotate;
};

ghost.getWidth = function () {
  return this.width;
};

ghost.getHeight = function () {
  return this.height;
};

ghost.setWidth = function (width) {
  this.width = width;
};

ghost.setHeight = function (height) {
  this.height = height;
};

ghost.getTop = function () {
  return this.top;
};

ghost.setLeft = function (left) {
  this.left = left;
};

ghost.getLeft = function () {
  return this.left;
};

ghost.getTop = function () {
  return this.top;
};

ghost.setLeft = function (left) {
  this.left = left;
};

ghost.setTop = function (top) {
  this.top = top;
};

ghost.setPosition = function (left, top) {
  this.setTop(top);
  this.setLeft(left);
};

ghost.isMedia = function () {
  return this.hasCode;
};

ghost.getDom = function () {
  return this.$dom;
};

ghost.setWidth = function (width) {
  this.width = width;
};

ghost.setHeight = function (height) {
  this.height = height;
};

ghost.remove = function () {
  this.$dom.data('ghostElement').remove();
};

ghost.delete = function () {};

ghost.setElementIndex = function (index) {
  this.elementIndex = index;
};

ghost.setTransparency = function (opacity) {
  this.transparency = opacity;
};

ghost.updateTransparency = function (tranparency) {
  this.setTransparency(tranparency);
  this.$dom.css('opacity', tranparency);
};

ghost.updateCopy = function () {
  const dataObject = this.getData();
};

ghost.updateDelete = function () {};

ghost.updatePosition = function (left, top) {
  this.setPosition(left, top);
  this.$dom.css('transform', getStringTranform(left, top, this.rotation));
};

ghost.getData = function () {
  return _.omit(this, ['$dom']);
};

export default ElementBase;
