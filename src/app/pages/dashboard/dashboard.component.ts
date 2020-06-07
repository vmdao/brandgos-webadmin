import { Component, NgZone, OnInit, ChangeDetectorRef } from '@angular/core';
import { Workspace, Border } from './tool2';

import * as mock from './tool/mock/index.js';
const { localStorages } = mock.default;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  workspace: Workspace;

  constructor(private zone: NgZone, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      const border = new Border({ ...localStorages });
      this.workspace = new Workspace({ ...localStorages, border: border });
      this.workspace.render('#areaWorkspace');
      this.workspace.createElements(localStorages.elements);
    });
    this.cd.detectChanges();
  }

  onClickItem(item) {
    if (this.workspace) {
      console.log('onClickItem', item);
      this.workspace.createElement(item);
    }

    this.cd.detectChanges();
  }
}
