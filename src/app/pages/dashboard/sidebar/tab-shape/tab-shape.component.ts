import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tab-shape',
  templateUrl: './tab-shape.component.html',
  styleUrls: ['./tab-shape.component.scss'],
})
export class TabShapeComponent {
  @Output()
  clickItem: EventEmitter<any> = new EventEmitter();

  shapes = [
    {
      key: '1',
      url: '/assets/resources/shapes/shape-01.svg',
      name: 'shape 01',
      width: 38,
      height: 38,
    },
    {
      key: '2',
      url: '/assets/resources/shapes/shape-02.svg',
      name: 'shape 01',
      width: 38,
      height: 38,
    },
    {
      key: '3',
      url: '/assets/resources/shapes/shape-03.svg',
      name: 'shape 01',
      width: 38,
      height: 38,
    },
    {
      key: '4',
      url: '/assets/resources/shapes/shape-04.svg',
      name: 'shape 01',
      width: 38,
      height: 38,
    },
    {
      key: '5',
      url: '/assets/resources/shapes/shape-05.svg',
      name: 'shape 01',
      width: 38,
      height: 38,
    },
    {
      key: '6',
      url: '/assets/resources/shapes/shape-06.svg',
      name: 'shape 01',
      width: 38,
      height: 38,
    },
  ];

  onClickSearch(event) {
    console.log(event);
  }

  onClickItem(item) {
    const data = {
      elementType: 'svg',
      userEdited: true,
      elementIndex: 1,
      transparency: 1,
      rotation: 0.0,
      width: item.width,
      height: item.height,
      top: 200,
      left: 250,
      style: {
        url: item.url,
        originUrl: item.url,
        thumbUrl: item.url,
        color1: '#000',
      },
    };

    this.clickItem.emit(data);
  }
}
