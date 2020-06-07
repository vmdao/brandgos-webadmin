import {
  Component,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnInit,
  AfterViewChecked,
  AfterViewInit,
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
  selector: 'app-tab-element',
  templateUrl: './tab-element.component.html',
  styleUrls: ['./tab-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabElementComponent implements OnInit, OnDestroy {
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

  types = [
    { code: 'badge', label: 'Badge' },
    { code: 'solid-shape', label: 'Solid shape' },
    { code: 'outlined-sha', label: 'Outlined shape' },
    { code: 'flame', label: 'Flame' },
  ];

  collectionSelected: CollectionModel;

  constructor(
    private store$: Store<fromApp.AppState>,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.items$ = this.store$.select(fromApp.getItemElements);
    this.loading$ = this.store$.select(fromApp.getItemElementsLoading);

    this.collections$ = this.store$.select(fromApp.getCollections);
    this.collectionsLoading$ = this.store$.select(
      fromApp.getCollectionsLoading
    );

    this.collections$.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.collectionSelected = res[0] ? res[0] : null;
      this.searchData();
      this.cd.detectChanges();
    });
    this.fetchCollections();
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  collectionChange($event) {
    this.collectionSelected = $event;
    this.searchData();
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
      filter: [`type||$eq||svg`],
    };

    if (this.q.fulltext !== '') {
      params.search = this.q.fulltext;
    }

    if (this.collectionSelected) {
      params.filter.push(`collections.id||$eq||${this.collectionSelected.id}`);
    }

    this.store$.dispatch(ItemsActions.getItemElements({ payload: params }));
  }

  fetchCollections() {
    const params: {
      page?: number;
      size?: number;
      sort?: string;
      filter?: string;
    } = {
      page: 1,
      size: 100,
      sort: `priority,DESC`,
      filter: `code||$in||badge,solid-shape,outlined-sha,flame`,
    };

    this.store$.dispatch(
      CollectionsActions.getCollections({ payload: params })
    );
  }

  onClickSearch(event) {
    console.log(event);
  }

  onClickItem(item) {
    const itemStyle = item.style;
    const workspaceWidth = 600;
    const workspaceHeight = 360;

    const maxWidth = 160;

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
