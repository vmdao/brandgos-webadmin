import { Component, NgZone, OnInit, ChangeDetectorRef } from '@angular/core';
import { Workspace } from './tool';
import * as mock from './tool/mock';
const { localStorages } = mock.default;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  workspace: Workspace;
  zooms = [
    { label: '20%', value: 0.2 },
    { label: '50%', value: 0.5 },
    { label: '75%', value: 0.75 },
    { label: '100%', value: 1 },
    { label: '150%', value: 1.5 },
    { label: '200%', value: 2 },
    { label: '300%', value: 3 },
  ];
  zoomSelected: { label: string; value: number };
  constructor(private zone: NgZone, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.zoomSelected = this.zooms.find((zoom) => zoom.value === 1);

    this.zone.runOutsideAngular(() => {
      this.workspace = new Workspace({ ...localStorages });
      this.workspace.render('#pages');
      this.workspace.createElements(localStorages.elements);
    });
    this.cd.detectChanges();
  }

  onClickItem(item) {
    if (this.workspace) {
      this.workspace.createElement(item);
    }

    this.cd.detectChanges();
  }

  onClickZoom(zoom) {
    this.zoomSelected = zoom;
    if (this.workspace) {
      this.workspace.changeView(zoom.value);
    }
  }
}
