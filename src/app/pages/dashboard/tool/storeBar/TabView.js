import Tab from './Tab';
import ItemView from './ItemView';
import mockData from '../mock';

const TabView = Backbone.View.extend({
  tagName: 'ul',
  className: 'tabs-panel',
});

const ghost = TabView.prototype;

ghost.initialize = function ({ model, observer }) {
  this.model = new Tab(model);
  this.observer = observer;
  this.type = model.type || '';

  this.listenTo(this.model, 'change', this.test);

  this.model.on('add', this.addOne, this);
  return this;
};

ghost.render = function () {
  this.$el.addClass('tab' + this.type);
  this.createItem();
  return this;
};
ghost.createItem = function () {
  mockData.storeItem.forEach((item) => {
    this.addItem(item);
  });
};
ghost.addItem = function (data) {
  const itemView = new ItemView({
    model: data,
    observer: this.observer,
  });

  this.$el.append(itemView.render().el);
};

export default TabView;
