import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tab-element',
  templateUrl: './tab-element.component.html',
  styleUrls: ['./tab-element.component.scss'],
})
export class TabElementComponent {
  @Output()
  clickItem: EventEmitter<any> = new EventEmitter();

  elements = [
    {
      name: 'Triangle',
      description: '',
      type: 'shape',
      url: '/assets/resources/elements/element-01.svg',
      width: 177,
      height: 129,
    },

    {
      name: 'Circle',
      description: '',
      type: 'shape',
      url: '/assets/resources/elements/element-03.svg',
      width: 122,
      height: 150,
    },
    {
      name: 'Circle',
      description: '',
      type: 'shape',
      url: '/assets/resources/elements/element-04.svg',
      width: 87,
      height: 97,
    },
    {
      name: 'Circle',
      description: '',
      type: 'shape',
      url: '/assets/resources/elements/element-05.svg',
      width: 173,
      height: 148,
    },
    {
      name: 'Circle',
      description: '',
      type: 'shape',
      url: '/assets/resources/elements/element-06.svg',
      width: 177,
      height: 118,
    },
  ];

  types = [
    { code: 'badge', label: 'Badge' },
    { code: 'solid-shape', label: 'Solid shape' },
    { code: 'outlined-shape', label: 'Outlined shape' },
    { code: 'flame', label: 'Flame' },
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
