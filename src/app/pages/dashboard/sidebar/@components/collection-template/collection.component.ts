import {
  Component,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import {
  FILE_QUANLITY,
  TemplateModel,
  TemplateService,
  TEMPLATE_CONTENT_TYPE,
} from '@app/pages/@store/template';
import { Subject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '@app/pages/@store';
import { CollectionModel } from '@app/pages/@store/collection';

@Component({
  selector: 'app-collection-template-list',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColectionTemplateListComponent
  implements OnInit, OnDestroy, OnChanges {
  @Output()
  clickTemplate: EventEmitter<any> = new EventEmitter();

  @Input()
  isQuery = false;

  @Input()
  collectionJoin: Array<string> = [];

  @Input()
  collectionFilter: Array<string> = [];

  @Input()
  collectionSearch: string;

  @Input()
  collectionName = '';

  private unsubscribe$: Subject<void> = new Subject();
  templates$: Observable<Array<TemplateModel>>;
  loading$: Observable<boolean>;

  collections$: Observable<Array<CollectionModel>>;
  collectionsLoading$: Observable<boolean>;

  size = 10;
  page = 1;
  total = 0;

  sortValue: string | null = 'DESC';
  sortKey: string | null = 'id';

  q = {
    fulltext: null,
    tag: null,
  };

  isExpand = false;

  templates: Array<TemplateModel> = [];

  constructor(
    private store$: Store<fromApp.AppState>,
    private cd: ChangeDetectorRef,
    private templateService: TemplateService
  ) {}

  ngOnInit(): void {
    this.loading$ = this.store$.select(fromApp.getTemplateIconsLoading);
    if (this.collectionSearch) {
      this.fetchSearch();
    } else {
      this.searchData();
    }
    this.cd.detectChanges();
  }

  ngOnChanges(change: SimpleChanges) {
    if (this.collectionSearch) {
      this.fetchSearch();
    } else {
      this.searchData();
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onClickMore() {
    this.isExpand = !this.isExpand;
  }

  searchData(reset = false): void {
    if (reset) {
      this.page = 1;
    }
    this.fetchData();
  }

  fetchData() {
    const params: {
      page?: number;
      size?: number;
      key?: string;
      sort?: string;
      join?: Array<string>;
      filter?: Array<string>;
    } = {
      page: this.page - 1,
      size: this.size,
      sort: `${this.sortKey},${this.sortValue}`,
      join: this.collectionJoin,
      filter: this.collectionFilter,
    };

    if (typeof this.collectionSearch === 'string') {
      params.key = this.collectionSearch;
    }

    this.templateService.getAll(params).subscribe((res) => {
      this.templates = [...res.data];
      this.cd.detectChanges();
    });
    // this.store$.dispatch(TemplatesActions.getTemplateIcons({ payload: params }));
  }

  fetchSearch() {
    const params: {
      collectionCode?: string;
      tag?: string;
      key?: string;
    } = {
      collectionCode: 'icon',
    };

    if (typeof this.collectionSearch === 'string') {
      params.key = this.collectionSearch;
    }

    this.templateService.search(params).subscribe((res) => {
      this.templates = [...res.data];
      this.cd.detectChanges();
    });
  }

  onClickTemplate(template) {
    const fileLayout = template.files.find((f) => {
      return f.quanlity === FILE_QUANLITY.ORIGIN;
    });
    this.templateService.getTemplateData(fileLayout.url).subscribe((data) => {
      this.clickTemplate.emit(data);
    });
    this.cd.detectChanges();
  }

  onClickTemplate2(template) {
    const dataShape = this.getShape(template);

    if (dataShape) {
      this.clickTemplate.emit(dataShape);
      return;
    }
    const templateStyle = template.style;
    const workspaceWidth = 680;
    const workspaceHeight = 360;

    const maxWidth = 140;

    const dataWidth =
      templateStyle.width > maxWidth ? maxWidth : templateStyle.width;
    const dataHeight = (dataWidth / templateStyle.width) * templateStyle.height;

    const dataStyle = {
      url: template.material.bucket + template.material.pathOrigin,
      originUrl: template.material.bucket + template.material.pathOrigin,
      thumbUrl: template.material.bucket + template.material.pathOrigin,
      color1: '#000',
    };

    const dataLeft = (workspaceWidth - dataWidth) / 2;
    const dataTop = (workspaceHeight - dataHeight) / 2;

    const data = {
      elementType: 'svg',
      userEdited: true,
      elementIndex: 1,
      transparency: 1,
      rotation: 0.0,
      width: dataWidth,
      height: dataHeight,
      top: dataTop,
      left: dataLeft,
      style: dataStyle,
    };

    this.clickTemplate.emit(data);
  }

  getShape(template) {
    switch (template.id) {
      case 14: {
        return this.getDataShape(template, { id: 3, border: 0, radius: 0 });
      }
      case 15: {
        return this.getDataShape(template, { id: 1, border: 4, radius: 0 });
      }
      case 16: {
        return this.getDataShape(template, { id: 1, border: 0, radius: 0 });
      }
      case 17: {
        return this.getDataShape(template, { id: 0, border: 0, radius: 0 });
      }
      case 18: {
        return this.getDataShape(template, { id: 0, border: 4, radius: 0 });
      }
      case 19: {
        return this.getDataShape(template, { id: 0, border: 0, radius: 20 });
      }
      case 20: {
        return this.getDataShape(template, { id: 0, border: 4, radius: 20 });
      }
      default: {
        return null;
      }
    }
  }

  getDataShape(
    template,
    style: { id: number; border: number; radius: number }
  ) {
    const templateStyle = template.style;
    const workspaceWidth = 680;
    const workspaceHeight = 360;

    const shapes = ['rect', 'circle', 'line', 'triangle'];
    const shape = shapes[style.id];
    const maxWidth = 140;

    let dataWidth =
      templateStyle.width > maxWidth ? maxWidth : templateStyle.width;
    let dataHeight = (dataWidth / templateStyle.width) * templateStyle.height;

    if (shape === 'line') {
      dataWidth = 139;
      dataHeight = 10;
    }

    const dataStyle = {
      url: '',
      originUrl: '',
      thumbUrl: '',
      color1: style.border > 0 ? '#fff' : '#000',
      shape,
      strokeColor: style.border > 0 ? '#000' : '',
      strokeWidth: style.border,
      borderRadius: style.radius,
    };

    const dataLeft = (workspaceWidth - dataWidth) / 2;
    const dataTop = (workspaceHeight - dataHeight) / 2;

    const data = {
      elementType: 'svgdraw',
      userEdited: true,
      elementIndex: 1,
      transparency: 1,
      rotation: 0.0,
      width: dataWidth,
      height: dataHeight,
      top: dataTop,
      left: dataLeft,
      style: dataStyle,
    };

    return data;
  }

  getFileUrl(files) {
    const file = files.find((f) => f.quanlity === FILE_QUANLITY.SCREEN);
    return (file && file.url) || '';
  }
}
