import { Component } from '@angular/core';

@Component({
  selector: 'app-tab-element',
  templateUrl: './tab-element.component.html',
  styleUrls: ['./tab-element.component.scss'],
})
export class TabElementComponent {
  elements = [
    {
      name: 'Triangle',
      description: '',
      type: 'shape',
      url: '/assets/resources/elements/element-01.svg',
      option: {
        type: 'svg',
        svg: '/assets/resources/elements/element-01.svg',
        width: 177,
        height: 129,
        name: 'New shape',
      },
    },

    {
      name: 'Circle',
      description: '',
      type: 'shape',
      url: '/assets/resources/elements/element-03.svg',
      option: {
        type: 'svg',
        svg: '/assets/resources/elements/element-03.svg',
        width: 122,
        height: 150,
        name: 'New shape',
      },
    },
    {
      name: 'Circle',
      description: '',
      type: 'shape',
      url: '/assets/resources/elements/element-04.svg',
      option: {
        type: 'svg',
        svg: '/assets/resources/elements/element-04.svg',
        width: 87,
        height: 97,
        name: 'New shape',
      },
    },
    {
      name: 'Circle',
      description: '',
      type: 'shape',
      url: '/assets/resources/elements/element-05.svg',
      option: {
        type: 'svg',
        svg: '/assets/resources/elements/element-05.svg',
        width: 173,
        height: 148,
        name: 'New shape',
      },
    },
    {
      name: 'Circle',
      description: '',
      type: 'shape',
      url: '/assets/resources/elements/element-06.svg',
      option: {
        type: 'svg',
        svg: '/assets/resources/elements/element-06.svg',
        width: 177,
        height: 118,
        name: 'New shape',
      },
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

  onClickItem(item) {}
}
