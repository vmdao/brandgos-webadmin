import { Component, NgZone, OnInit, ChangeDetectorRef } from '@angular/core';
import { ItemService } from '../@store/item';
import { Editor } from './workspace/Editor';
import { SavedDocumentData } from './workspace/viewport/dto/DocumentDTO';

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

  materials = [];
  materialsData = [];
  zoomSelected: { label: string; value: number };
  constructor(
    private zone: NgZone,
    private cd: ChangeDetectorRef,
    private materialSerivce: ItemService
  ) {}

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
          elements: [
            {
              name: 'hello',
              scopeId: 'viewport',
              frame: {
                elementType: 'svg',
                width: 200,
                height: 200,
                top: 100,
                left: 200,
                style: {
                  color1: '#000',
                  originUrl: 'http://brandgos-api.dizen.vn/upload/icon-03.svg',
                },
              },
            },
            {
              name: 'hello',
              scopeId: 'viewport',
              frame: {
                elementType: 'svg',
                width: 200,
                height: 200,
                top: 100,
                left: 200,
                style: {
                  color1: '#000',
                  originUrl: 'http://brandgos-api.dizen.vn/upload/icon-03.svg',
                },
              },
            },
            {
              name: 'hello',
              scopeId: 'viewport',
              frame: {
                elementType: 'svg',
                width: 200,
                height: 200,
                top: 100,
                left: 200,
                style: {
                  color1: '#000',
                  originUrl: 'http://brandgos-api.dizen.vn/upload/icon-03.svg',
                },
              },
            },
            {
              name: 'hello',
              scopeId: 'viewport',
              frame: {
                elementType: 'svg',
                width: 200,
                height: 200,
                top: 100,
                left: 200,
                style: {
                  color1: '#000',
                  originUrl: 'http://brandgos-api.dizen.vn/upload/icon-03.svg',
                },
              },
            },
            {
              name: 'hello',
              scopeId: 'viewport',
              frame: {
                elementType: 'svg',
                width: 200,
                height: 200,
                top: 100,
                left: 200,
                style: {
                  color1: '#000',
                  originUrl: 'http://brandgos-api.dizen.vn/upload/icon-03.svg',
                },
              },
            },
            {
              name: 'hello',
              scopeId: 'viewport',
              frame: {
                elementType: 'svg',
                width: 200,
                height: 200,
                top: 100,
                left: 200,
                style: {
                  color1: '#000',
                  originUrl: 'http://brandgos-api.dizen.vn/upload/icon-03.svg',
                },
              },
            },
            {
              name: 'hello',
              scopeId: 'viewport',
              frame: {
                elementType: 'svg',
                width: 200,
                height: 200,
                top: 100,
                left: 200,
                style: {
                  color1: '#000',
                  originUrl: 'http://brandgos-api.dizen.vn/upload/icon-03.svg',
                },
              },
            },
            {
              name: 'hello',
              scopeId: 'viewport',
              frame: {
                elementType: 'svg',
                width: 200,
                height: 200,
                top: 100,
                left: 200,
                style: {
                  color1: '#000',
                  originUrl: 'http://brandgos-api.dizen.vn/upload/icon-03.svg',
                },
              },
            },
            {
              name: 'hello',
              scopeId: 'viewport',
              frame: {
                elementType: 'svg',
                width: 200,
                height: 200,
                top: 100,
                left: 200,
                style: {
                  color1: '#000',
                  originUrl: 'http://brandgos-api.dizen.vn/upload/icon-03.svg',
                },
              },
            },
            {
              name: 'hello',
              scopeId: 'viewport',
              frame: {
                elementType: 'svg',
                width: 115,
                height: 115,
                top: 60,
                left: 60,
                style: {
                  color1: '#000',
                  originUrl: 'http://brandgos-api.dizen.vn/upload/icon-03.svg',
                },
              },
            },
          ],
          index: 1,
          scopeId: 'viewport',
          width: 630,
          height: 300,
        },
        {
          elements: [
            {
              name: 'hello',
              scopeId: 'viewport',
              frame: {
                elementType: 'svg',
                width: 200,
                height: 200,
                top: 100,
                left: 200,
                style: {
                  color1: '#000',
                  originUrl: 'http://brandgos-api.dizen.vn/upload/icon-03.svg',
                },
              },
            },
          ],
          index: 2,
          scopeId: 'viewport',
          width: 630,
          height: 300,
        },
        {
          elements: [],
          index: 2,
          scopeId: 'viewport',
          width: 630,
          height: 300,
        },
        {
          elements: [
            {
              name: 'hello',
              scopeId: 'viewport',
              frame: {
                elementType: 'svg',
                width: 200,
                height: 200,
                top: 100,
                left: 200,
                style: {
                  color1: '#000',
                  originUrl: 'http://brandgos-api.dizen.vn/upload/icon-03.svg',
                },
              },
            },
            {
              name: 'hello',
              scopeId: 'viewport',
              frame: {
                elementType: 'svg',
                width: 115,
                height: 115,
                top: 60,
                left: 60,
                style: {
                  color1: '#000',
                  originUrl: 'http://brandgos-api.dizen.vn/upload/icon-03.svg',
                },
              },
            },
          ],
          index: 1,
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
      // this.editor.loadData(page);
      // this.editor.createElements(localStorages.elements);
    });

    this.cd.detectChanges();
  }

  onClickItem(item) {
    if (this.editor) {
      console.log('item', item);
      this.editor.addElement(item);
    }
  }

  onClickTemplate(template) {
    console.log(template);
    const { materials } = template;
    const materialNotExist = materials.filter((m) => {
      return !this.materials.find((ma) => m.id !== ma.id);
    });
    this.materials = [...this.materials, ...materialNotExist];
    this.loadMaterials(materialNotExist).subscribe((res) => {
      this.materialsData = [...this.materialsData, ...res.data];
      this.editor.updateMaterialStore(this.materialsData);
      this.editor.loadData(template);
    });
  }

  loadMaterials(materialNotExist) {
    return this.materialSerivce.getAll({});
  }

  onClickZoom(zoom) {
    this.zoomSelected = zoom;
    if (this.editor) {
      this.editor.viewport.changeView(zoom.value);
    }
  }
}
