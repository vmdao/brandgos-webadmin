import {
  Component,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';

import { ItemModel, ItemsActions } from '@app/pages/@store/item';
import { Subject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '@app/pages/@store';
import {
  CollectionModel,
  CollectionsActions,
} from '@app/pages/@store/collection';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tab-shape',
  templateUrl: './tab-shape.component.html',
  styleUrls: ['./tab-shape.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabShapeComponent implements OnInit, OnDestroy {
  @Output()
  clickItem: EventEmitter<any> = new EventEmitter();

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
    fulltext: '',
  };

  constructor(
    private store$: Store<fromApp.AppState>,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.items$ = this.store$.select(fromApp.getItemShapes);
    this.loading$ = this.store$.select(fromApp.getItemShapesLoading);
    this.searchData();
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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
      search?: string;
      sort?: string;
      join?: Array<string>;
      filter?: Array<string>;
    } = {
      page: this.page - 1,
      size: this.size,
      sort: `${this.sortKey},${this.sortValue}`,
      join: ['material', 'collections'],
      filter: [`type||$eq||svg`, `collections.code||$eq||shape`],
    };

    if (this.q.fulltext !== '') {
      params.search = this.q.fulltext;
    }

    this.store$.dispatch(ItemsActions.getItemShapes({ payload: params }));
  }

  onClickItem(item) {
    const itemStyle = item.style;
    const workspaceWidth = 600;
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
}
