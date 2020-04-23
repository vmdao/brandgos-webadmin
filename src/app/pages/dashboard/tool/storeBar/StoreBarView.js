import $ from 'jquery';
import _ from 'lodash';
import Backbone from 'backbone';
import TabView from './TabView';
import TabMenuView from './TabMenuView';

const template = _.template(`<div id="tabs-panels">
</div>
<ul id="tabs-menu">
</ul>`);

const StoreBarView = Backbone.View.extend({
  id: 'zone-store-bar',
  tagName: 'div',
  events: {
    // 'click': 'onClick',
  },
});

const ghost = StoreBarView.prototype;

ghost.initialize = function ({ width, height, position, tabs, workspaceView }) {
  this.width = width || 400;
  this.height = height || 400;
  this.position = position || '#zone-right';
  this.background = '#000';
  this.tabs = tabs || [
    {
      type: 'items',
      name: 'ITEMS',
      isActive: true,
    },
    {
      type: 'uploads',
      name: 'Uploads',
      isActive: false,
    },
  ];
  this.workspaceView = workspaceView;
  return this;
};

ghost.render = function () {
  this.$el.html(template);
  this.$el.appendTo($(this.position));
  this.renderTabs();

  return this;
};

ghost.renderTabs = function () {
  this.tabs.forEach((tab) => {
    tab.isActive
      ? ((this.tabActive = 'activeTab' + tab.type),
        this.$el.addClass(this.tabActive))
      : '';

    const tabMenuView = new TabMenuView({
      model: tab,
    });
    const tabView = new TabView({
      model: tab,
    });
    this.$el.find('#tabs-panels').append(tabView.render().el);
    this.$el.find('#tabs-menu').append(tabMenuView.render().el);
  });
};

ghost.observerChangeTab = function (data) {
  this.changeTab(data.type);
};

ghost.changeTab = function (type) {
  this.$el.removeClass(this.tabActive);
  this.tabActive = 'activeTab' + type;
  this.$el.addClass(this.tabActive);
};

export default StoreBarView;
