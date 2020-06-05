import { Component, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-tab-icon',
  templateUrl: './tab-icon.component.html',
  styleUrls: ['./tab-icon.component.scss'],
})
export class TabIconComponent {
  @Output()
  clickItem: EventEmitter<any> = new EventEmitter();

  icons = [
    {
      name: 'Triangle',
      type: 'shape',
      url: '/assets/resources/icons/icon-01.svg',
      width: 50,
      height: 59,
    },
    {
      name: 'Rectangle',
      description: '',
      type: 'shape',
      url: '/assets/resources/icons/icon-02.svg',
      width: 50,
      height: 59,
    },
    {
      name: 'Circle',
      description: '',
      type: 'shape',
      url: '/assets/resources/icons/icon-03.svg',
      width: 50,
      height: 59,
    },
    {
      name: 'Circle',
      description: '',
      type: 'shape',
      url: '/assets/resources/icons/icon-04.svg',
      width: 50,
      height: 59,
    },
    {
      name: 'Circle',
      description: '',
      type: 'shape',
      url: '/assets/resources/icons/icon-05.svg',
      width: 50,
      height: 59,
    },
    {
      name: 'Circle',
      description: '',
      type: 'shape',
      url: '/assets/resources/icons/icon-06.svg',
      width: 50,
      height: 59,
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
