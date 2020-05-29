import { Component, NgZone, OnInit } from '@angular/core';
import tool from './tool/index.js';
import { Workspace, Border } from './tool2';

import * as mock from './tool/mock/index.js';
const { localStorages } = mock.default;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private zone: NgZone) {}

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      const border = new Border({ ...localStorages });
      const workspace = new Workspace({ ...localStorages, border: border });
      workspace.render('#areaWorkspace');
      workspace.createElements(localStorages.elements);
      // tool.init();
    });
  }
}
