import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Output()
  clickItem: EventEmitter<any> = new EventEmitter();
  @Output()
  clickTemplate: EventEmitter<any> = new EventEmitter();
  onClickSearch(event) {
    console.log(event);
  }

  onClickItem(item) {
    this.clickItem.emit(item);
  }

  onClickTemplate(item) {
    this.clickTemplate.emit(item);
  }
}
