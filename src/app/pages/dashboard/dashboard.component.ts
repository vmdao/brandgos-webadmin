import { Component, NgZone, OnInit } from '@angular/core';
import tool from './tool/index.js';
import { Workspace } from './tool2';

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
      const w = new Workspace(localStorages);
      w.render('#areaWorkspace');
      w.createElements(localStorages.elements);
      // tool.init();
    });
  }
}
