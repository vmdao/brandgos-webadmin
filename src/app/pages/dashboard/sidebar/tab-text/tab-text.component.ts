import { Component } from '@angular/core';

@Component({
  selector: 'app-tab-text',
  templateUrl: './tab-text.component.html',
  styleUrls: ['./tab-text.component.scss'],
})
export class TabTextComponent {
  shapes = [
    {
      key: '1',
      url: '/assets/resources/shapes/shape-01.svg',
      name: 'shape 01',
    },
    {
      key: '2',
      url: '/assets/resources/shapes/shape-02.svg',
      name: 'shape 01',
    },
    {
      key: '3',
      url: '/assets/resources/shapes/shape-03.svg',
      name: 'shape 01',
    },
    {
      key: '4',
      url: '/assets/resources/shapes/shape-04.svg',
      name: 'shape 01',
    },
    {
      key: '5',
      url: '/assets/resources/shapes/shape-05.svg',
      name: 'shape 01',
    },
    {
      key: '6',
      url: '/assets/resources/shapes/shape-06.svg',
      name: 'shape 01',
    },
  ];

  onClickSearch(event) {
    console.log(event);
  }

  onClickItem(item) {}
}
