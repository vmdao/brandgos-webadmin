import $ from 'jquery';
import Backbone from 'backbone';

function WorkspaceAngleView() {}

WorkspaceAngleView = Backbone.View.extend({
  tagName: 'div',
  id: 'angleWorkspace',
  class: 'angleWorkspace',
});
const globals = WorkspaceAngleView.prototype;

globals.initialize = function (data) {
  this.parentView = data.workspaceView;
  this.width = this.parentView.width;
  this.height = this.parentView.height;
  this.render();
};

globals.render = function (data) {
  this.$el.css({
    width: this.width,
    height: this.height,
  });
  this.html = $(
    '<div class="ghost"></div><div class="vertical align"></div><div class="vertical align"></div><div class="vertical align"></div><div class="horizontal align"></div><div class="horizontal align"></div><div class="horizontal align"></div>'
  );
  this.$el.html(this.html);
  this.$el.prependTo($('#areaWorkspace'));
  return this;
};
export default WorkspaceAngleView;
