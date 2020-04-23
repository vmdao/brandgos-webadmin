const AngelView = Backbone.View.extend({
  tagName: 'div',
  className: 'cloneDragDrop',
  events: {},
});

const ghost = AngelView.prototype;

ghost.initialize = function ({ model, position }) {
  this.model = model;
  this.position = position;
  this.render();
};

ghost.render = function () {
  this.$el.css('display', 'none');
  this.$el.appendTo(this.position);
  return this;
};

ghost.createInner = function (data) {
  this.scale = this.scaleOrigin = 86 / data.width;

  const deltaX = data.pageX - data.x;
  const deltaY = data.pageY - data.y;

  this.mounseXOnItem = deltaX / this.scaleOrigin;
  this.mounseYOnItem = deltaY / this.scaleOrigin;

  this.positionX = data.pageX;
  this.positionY = data.pageY;

  this.left = data.pageX;
  this.top = data.pageY;
  this.width = data.width;
  this.height = data.height;

  const template = _.template(
    `<div class="innerAngel" style="width:<%= width %>;height:<%= height %>"><img src="<%= url%>"></div>`
  );
  this.$el.html(template(data));
};

ghost.updatePosition = function (x, y) {
  this.scale = this.getScaleByWay(x);
  this.left = x - this.mounseXOnItem * this.scale;
  this.top = y - this.mounseYOnItem * this.scale;
  this.$el.css({
    left: this.left,
    top: this.top,
    transformOrigin: 'left top 0px',
    transform: 'scale(' + this.scale + ')',
  });
};

ghost.checkIntersect = function (rect) {
  const rectAngle = this.getRect();
  return intersectRect(rectAngle, rect);
};

ghost.getRect = function () {
  return {
    left: this.left,
    top: this.top,
    right: this.left + this.width * this.scale,
    bottom: this.top + this.height * this.scale,
  };
};

ghost.getPositionIntersect = function (rect) {
  if (this.getRect()) {
    return {
      left: this.left - rect.left,
      top: this.top - rect.top,
      scale: this.scale,
      width: this.width,
      height: this.height,
    };
  }
};

ghost.getScaleByWay = function (x) {
  let delta = this.positionX - x;
  let ratio = ((1 - this.scaleOrigin) / 300) * delta;
  ratio = ratio < 0 ? 0 : ratio;
  let scale = this.scaleOrigin + ratio;
  scale = scale > 1 ? 1 : scale;
  return scale;
};

function intersectRect(r1, r2) {
  return !(
    r2.left > r1.right ||
    r2.right < r1.left ||
    r2.top > r1.bottom ||
    r2.bottom < r1.top
  );
}

export default AngelView;
