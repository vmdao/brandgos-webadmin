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
  ItemModel,
  ItemsActions,
  ItemService,
  ITEM_TYPE,
} from '@app/pages/@store/item';
import { Subject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '@app/pages/@store';
import { CollectionModel } from '@app/pages/@store/collection';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColectionListComponent implements OnInit, OnDestroy, OnChanges {
  @Output()
  clickItem: EventEmitter<any> = new EventEmitter();

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
  items$: Observable<Array<ItemModel>>;
  loading$: Observable<boolean>;

  collections$: Observable<Array<CollectionModel>>;
  collectionsLoading$: Observable<boolean>;

  size = 10;
  page = 1;
  total = 0;

  sortValue: string | null = 'DESC';
  sortKey: string | null = 'priority';

  q = {
    fulltext: null,
    tag: null,
  };

  isExpand = false;

  items: Array<ItemModel> = [];

  constructor(
    private store$: Store<fromApp.AppState>,
    private cd: ChangeDetectorRef,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.loading$ = this.store$.select(fromApp.getItemIconsLoading);
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

    this.itemService.getAll(params).subscribe((res) => {
      this.items = [...res.data];
      this.cd.detectChanges();
    });
    // this.store$.dispatch(ItemsActions.getItemIcons({ payload: params }));
  }

  fetchSearch() {
    const params: {
      collectionCode?: string;
      tag?: string;
      type?: ITEM_TYPE;
      key?: string;
    } = {
      collectionCode: 'icon',
      type: ITEM_TYPE.SVG,
    };

    if (typeof this.collectionSearch === 'string') {
      params.key = this.collectionSearch;
    }

    this.itemService.search(params).subscribe((res) => {
      this.items = [...res.data];
      this.cd.detectChanges();
    });
  }

  onClickItem(item) {
    const dataShape = this.getShape(item);
    if (dataShape) {
      this.clickItem.emit(dataShape);
      return;
    }
    const itemStyle = item.style;
    const workspaceWidth = 680;
    const workspaceHeight = 360;

    const maxWidth = 140;

    const dataWidth = itemStyle.width > maxWidth ? maxWidth : itemStyle.width;
    const dataHeight = (dataWidth / itemStyle.width) * itemStyle.height;

    const dataStyle = {
      url: item.material.bucket + item.material.pathOrigin,
      originUrl: item.material.bucket + item.material.pathOrigin,
      thumbUrl: item.material.bucket + item.material.pathOrigin,
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

    this.clickItem.emit(data);
  }

  getShape(item) {
    switch (item.id) {
      case 14: {
        return this.getDataShape(item, { id: 3, border: 0, radius: 0 });
      }
      case 15: {
        return this.getDataShape(item, { id: 1, border: 4, radius: 0 });
      }
      case 16: {
        return this.getDataShape(item, { id: 1, border: 0, radius: 0 });
      }
      case 17: {
        return this.getDataShape(item, { id: 0, border: 0, radius: 0 });
      }
      case 18: {
        return this.getDataShape(item, { id: 0, border: 4, radius: 0 });
      }
      case 19: {
        return this.getDataShape(item, { id: 0, border: 0, radius: 20 });
      }
      case 20: {
        return this.getDataShape(item, { id: 0, border: 4, radius: 20 });
      }
      default: {
        return null;
      }
    }
  }

  getDataShape(item, style: { id: number; border: number; radius: number }) {
    const itemStyle = item.style;
    const workspaceWidth = 680;
    const workspaceHeight = 360;

    const shapes = ['rect', 'circle', 'line', 'triangle'];
    const shape = shapes[style.id];
    const maxWidth = 140;

    let dataWidth = itemStyle.width > maxWidth ? maxWidth : itemStyle.width;
    let dataHeight = (dataWidth / itemStyle.width) * itemStyle.height;

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
      stroke: style.border > 0 ? '#000' : '',
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
}
