import { models, exporter } from 'makerjs';
import { BaseSvgChild } from '../abstracts/base-svg-child.abstract';
import { SVG } from '@svgdotjs/svg.js';
import { SvgDrawElement } from './svgdraw.element';

export class SvgDrawChild extends BaseSvgChild {
  constructor(parent: SvgDrawElement) {
    super(parent);
  }

  render() {
    this.updateSvg();
    this.parent.renderElement(this);
  }

  updateSvg2() {
    let shapeModel;
    const { width, height, borderRadius, strokeWidth, shape } = this
      .parent as SvgDrawElement;

    const draw = SVG().size(width, height);
    const group = draw.group();

    group.stroke({
      color: 'red',
      width: strokeWidth,
    });

    switch (shape) {
      case 'rect':
        shapeModel = draw.rect(width - strokeWidth, height - strokeWidth);
        break;
      case 'circle':
        shapeModel = draw
          .ellipse(width - strokeWidth, height - strokeWidth)
          .stroke({
            color: 'red',
            width: strokeWidth,
          });
        break;
    }

    shapeModel.radius(borderRadius, borderRadius);
    group.add(shapeModel);

    const svgHtml = draw.svg();
    let widthViewbox = width;
    let heightViewbox = height;

    if (shape === 'circle' && width !== height) {
      const viewBoxData = getViewBoxData(svgHtml);
      if (viewBoxData) {
        widthViewbox = viewBoxData.width;
        heightViewbox = viewBoxData.height;
      }
    }

    const svgHtmlWithViewBox = fixViewBoxWithsStrokeWidth(
      svgHtml,
      widthViewbox,
      heightViewbox,
      strokeWidth
    );

    this.$el.html(svgHtmlWithViewBox);
    this.setColorName();
  }

  updateSvg() {
    const { shape } = this.parent as SvgDrawElement;
    let svgHtml = '';

    switch (shape) {
      case 'triangle':
        svgHtml = this.genarateSvgByMakerJs();
        break;
      case 'line':
        svgHtml = this.genarateSvgByHtml();
        break;
      case 'rect':
        svgHtml = this.genarateSvgByHtml();
        break;
      case 'circle':
        svgHtml = this.genarateSvgByHtml();
        break;
    }
    this.$el.html(svgHtml);
    this.setColorName();
  }

  genarateSvgByMakerJs() {
    let shapeModel;

    const { width, height, strokeWidth, shape, strokeColor } = this
      .parent as SvgDrawElement;

    switch (shape) {
      case 'triangle':
        const haftWidth = width / 2;
        const haftHeight = height / 2;
        shapeModel = new models.ConnectTheDots(true, [
          [haftWidth * -1, haftHeight * -1],
          [haftWidth, haftHeight * -1],
          [0, haftHeight],
        ]);
        break;
    }

    const options: {
      svgAttrs?: any;
      fill?: string;
      stroke?: string;
      strokeWidth?: string;
      accuracy?: number;
      annotate?: boolean;
      viewBox?: boolean;
      scalingStroke?: boolean;
      useSvgPathOnly?: boolean;
      fontSize: string;
    } = {
      svgAttrs: {
        width: '100%',
        height: '100%',
      },
      fontSize: '14px',
      useSvgPathOnly: true,
      stroke: strokeColor,
      strokeWidth: `${strokeWidth}px`,
      accuracy: 0.0001,
      annotate: false,
      viewBox: true,
      scalingStroke: true,
    };

    const svgHtml = exporter.toSVG(shapeModel, { ...options, units: 'px' });

    let widthViewbox = width;
    let heightViewbox = height;

    if (shape === 'circle' && width !== height) {
      const viewBoxData = getViewBoxData(svgHtml);
      if (viewBoxData) {
        widthViewbox = viewBoxData.width;
        heightViewbox = viewBoxData.height;
      }
    }

    const svgHtmlWithViewBox = fixViewBoxWithsStrokeWidth(
      svgHtml,
      widthViewbox,
      heightViewbox,
      strokeWidth
    );

    return svgHtmlWithViewBox;
  }

  genarateSvgBySvgJs() {
    let shapeModel;
    const { width, height, borderRadius, strokeWidth, shape } = this
      .parent as SvgDrawElement;
    const draw = SVG()
      .viewbox(-strokeWidth / 2, -strokeWidth / 2, width, height)
      .size('100%', '100%');
    const group = draw.group();

    switch (shape) {
      case 'rect':
        shapeModel = draw.rect(width - strokeWidth, height - strokeWidth);
        shapeModel.radius(borderRadius, borderRadius);

        break;
      case 'circle':
        shapeModel = draw.ellipse(width - strokeWidth, height - strokeWidth);
        break;
    }

    group.add(shapeModel);

    group.stroke({
      color: 'red',
      width: strokeWidth,
    });

    const svgHtml = draw.svg();
    return svgHtml;
  }

  genarateSvgByHtml() {
    const {
      width,
      height,
      borderRadius,
      strokeColor,
      strokeWidth,
      shape,
      colors,
    } = this.parent as SvgDrawElement;
    const draw = document.createElement('div');

    draw.style.width = `${width}px`;
    draw.style.height = `${height}px`;
    draw.style.boxSizing = 'border-box';
    draw.className = 'color-1';

    switch (shape) {
      case 'rect':
        draw.style.borderRadius = `${borderRadius}px`;

        break;
      case 'circle':
        draw.style.borderRadius = `50%`;
        break;
    }

    draw.style.borderWidth = `${strokeWidth}px`;
    draw.style.borderColor = strokeColor;
    draw.style.borderStyle = `solid`;

    const color1 = colors[0] || { color: '#000' };

    draw.style.backgroundColor = color1.color;

    const svgHtml = draw.outerHTML;
    return svgHtml;
  }
}

function fixViewBoxWithsStrokeWidth(svgHtml, width, height, strokeWidth) {
  return `<svg viewBox="${(strokeWidth / 2) * -1} ${
    (strokeWidth / 2) * -1
  } ${width} ${height}">${svgHtml}</svg>`;
}

function getViewBoxData(svgHtml) {
  const viewBoxString = (/viewBox="([^"]+)"/.exec(svgHtml) || '')[1];
  if (typeof viewBoxString !== 'string') {
    return null;
  }

  const data = viewBoxString.split(' ');

  if (data.length === 0) {
    return null;
  }

  return {
    top: data[0],
    left: data[1],
    width: Number(data[2]),
    height: Number(data[3]),
  };
}
