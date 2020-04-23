import { Component } from '@angular/core';

@Component({
  selector: 'app-tab-icon',
  templateUrl: './tab-icon.component.html',
  styleUrls: ['./tab-icon.component.scss'],
})
export class TabIconComponent {
  icons = [
    {
      name: 'Triangle',
      type: 'shape',
      url: '/assets/resources/icons/icon-01.svg',
      option: {
        type: 'svg',
        svg: '/assets/resources/icons/icon-01.svg',
        width: 50,
        height: 59,
        name: 'New shape',
      },
    },
    {
      name: 'Rectangle',
      description: '',
      type: 'shape',
      icon: {
        prefix: 'fas',
        name: 'stop',
      },
      url: '/assets/resources/icons/icon-02.svg',
      option: {
        type: 'svg',
        svg: '/assets/resources/icons/icon-02.svg',
        width: 50,
        height: 59,
        name: 'New shape',
      },
    },
    {
      name: 'Circle',
      description: '',
      type: 'shape',
      url: '/assets/resources/icons/icon-03.svg',
      option: {
        type: 'svg',
        svg: '/assets/resources/icons/icon-03.svg',
        width: 50,
        height: 59,
        name: 'New shape',
      },
    },
    {
      name: 'Circle',
      description: '',
      type: 'shape',
      url: '/assets/resources/icons/icon-04.svg',
      option: {
        type: 'svg',
        svg: '/assets/resources/icons/icon-04.svg',
        width: 50,
        height: 59,
        name: 'New shape',
      },
    },
    {
      name: 'Circle',
      description: '',
      type: 'shape',
      url: '/assets/resources/icons/icon-05.svg',
      option: {
        type: 'svg',
        svg: '/assets/resources/icons/icon-05.svg',
        width: 50,
        height: 59,
        name: 'New shape',
      },
    },
    {
      name: 'Circle',
      description: '',
      type: 'shape',
      url: '/assets/resources/icons/icon-06.svg',
      option: {
        type: 'svg',
        svg: '/assets/resources/icons/icon-06.svg',
        width: 50,
        height: 59,
        name: 'New shape',
      },
    },
  ];

  onClickSearch(event) {
    console.log(event);
  }

  onClickItem(item) {}
}
