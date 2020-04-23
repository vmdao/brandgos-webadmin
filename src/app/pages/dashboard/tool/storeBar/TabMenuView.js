const template = _.template(`<a><%= name %></a>`);

const TabMenuView = Backbone.View.extend({
  tagName: 'li',
  className: 'tabs-menu-item',
  events: {
    click: 'onClick',
  },
});

const ghost = TabMenuView.prototype;

ghost.initialize = function ({ model, observer }) {
  this.model = model || {};
  this.observer = observer;
  this.isActive = this.model.isActive || false;
  return this;
};

ghost.render = function () {
  const { type, name, isActive } = this.model;

  this.isActive ? this.$el.addClass('active') : '';
  this.$el.html(
    template({
      name,
    })
  );
  this.$el.addClass('menu' + type);
  return this;
};

ghost.onClick = function (event) {
  this.observer(this.model);
};

export default TabMenuView;
