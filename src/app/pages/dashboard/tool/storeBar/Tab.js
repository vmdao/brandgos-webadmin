import Backbone from 'backbone';
import Item from './Item';

const Tab = Backbone.Collection.extend({
  model: Item,
  url: 'test.json',
  parse: function (response) {
    console.log('respone', this);
    return response;
  },
});

export default Tab;
