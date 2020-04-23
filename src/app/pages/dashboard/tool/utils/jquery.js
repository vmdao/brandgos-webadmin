import $ from 'jquery';

$.fn.clickOutsideThisElement = function (callback) {
  return this.each(function () {
    var self = this;
    var handleEventClickMenu = function (e) {
      if (!$(e.target).closest(self).length) {
        callback.call(self, e);
        $(document).off('click', handleEventClickMenu);
      }
    };
    $(document).on('click', handleEventClickMenu);
  });
};

function handleEventClickMenu() {}

export default $;
