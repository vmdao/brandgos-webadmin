import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tab-text',
  templateUrl: './tab-text.component.html',
  styleUrls: ['./tab-text.component.scss'],
})
export class TabTextComponent {
  @Output()
  clickItem: EventEmitter<any> = new EventEmitter();

  onClickSearch(event) {
    console.log(event);
  }

  onClickItem(item) {
    const dataText =
      item === 'big'
        ? {
            top: 129,
            left: 165,
            html: 'Logo Name',
            url: '/assets/cantata-one-regular.otf',
            fontFamily: 'Roboto',
            fontSize: 42,
            color: '#000000',
          }
        : {
            top: 181,
            left: 163,
            html: 'Tagline Company',
            url: '/assets/cantata-one-regular.otf',
            fontFamily: 'Roboto',
            fontSize: 28,
            color: '#000000',
          };

    const data = {
      elementType: 'svgtext',
      userEdited: true,
      elementIndex: 1,
      transparency: 1,
      rotation: 0.0,
      width: 270,
      height: 42.0,
      top: dataText.top,
      left: dataText.left,
      html: dataText.html,
      style: {
        curve: 0,
        fontSize: dataText.fontSize,
        lineHeight: 1.4,
        fontFamily: dataText.fontFamily,
        textAlign: 'left',
        color: dataText.color,
        transform: 'none',
        url: dataText.url,
      },
    };
    this.clickItem.emit(data);
  }
}
