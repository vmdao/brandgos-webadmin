import { Component, NgZone, OnInit, ChangeDetectorRef } from '@angular/core';
// import { Workspace } from './workspace';
import * as mock from './workspace/mock';
import { Editor } from './workspace/Editor';
import { SavedDocumentData } from './workspace/viewport/DocumentDTO';
const { localStorages } = mock.default;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  editor: Editor;
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
    const page: SavedDocumentData = {
      id: '',
      name: 'abc',
      layout: {
        id: 'string',
        name: 'string',
        type: 'string',
        width: 1000,
        height: 1000,
      },
      pages: [
        {
          elements: [{ name: 'hello', scopeId: 'viewport' }],
          index: 1,
          scopeId: 'viewport',
          width: 630,
          height: 300,
        },
        {
          elements: [{ name: 'hello', scopeId: 'viewport' }],
          index: 2,
          scopeId: 'viewport',
          width: 630,
          height: 300,
        },
        {
          elements: [{ name: 'hello', scopeId: 'viewport' }],
          index: 2,
          scopeId: 'viewport',
          width: 630,
          height: 300,
        },
      ],
    };

    this.zoomSelected = this.zooms.find((zoom) => zoom.value === 1);

    this.zone.runOutsideAngular(() => {
      this.editor = new Editor({ zoom: 1 });
      this.editor.render('#viewport-container');
      this.editor.loadData(page);
      // this.editor.createElements(localStorages.elements);
    });
    this.cd.detectChanges();
  }

  onClickItem(item) {
    // if (this.workspace) {
    //   this.workspace.createElement(item);
    // }

    this.cd.detectChanges();
  }

  onClickZoom(zoom) {
    this.zoomSelected = zoom;
    if (this.editor) {
      // this.editor.changeView(zoom.value);
    }
  }
}
