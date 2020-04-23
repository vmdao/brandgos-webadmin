import Backbone from 'backbone';
import Item from './Item';

const template = _.template(
  `<a><img width="<%= width %>" height="<%= height %>" src="<%= url %>"></a>`
);
const ItemView = Backbone.View.extend({
  tagName: 'li',
  className: 'grid-item',
});

const ghost = ItemView.prototype;

ghost.initialize = function ({ model }) {
  this.model = new Item(model);
  return this;
};

ghost.render = function () {
  const data = this.model.attributes.files.THUMBNAIL;
  data.width = 120;
  data.height = 60;
  this.$el.html(template(data));
  this.$el.find('img').data('item', this);
  return this;
};

ghost.onHidden = function () {
  this.$el.find('a').css('visibility', 'hidden');
};

ghost.onShow = function () {
  this.$el.find('a').css('visibility', 'unset');
};
export default ItemView;
