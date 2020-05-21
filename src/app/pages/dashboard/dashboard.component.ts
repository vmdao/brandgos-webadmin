import { Component, NgZone, OnInit } from '@angular/core';
import tool from './tool/index.js';
import { Workspace } from './tool2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private zone: NgZone) {}

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      const w = new Workspace({ width: 600, height: 360 });
      w.render('#areaWorkspace');
      tool.init();
    });
  }
}
