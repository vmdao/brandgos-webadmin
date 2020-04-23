import Backbone from 'backbone';

const Item = Backbone.Model.extend({
  defaults: {
    name: 'noname',
    type: '',
    width: 0,
    height: 0,
    files: {},
  },
  parse: function (response) {
    return response;
  },
});

export default Item;
