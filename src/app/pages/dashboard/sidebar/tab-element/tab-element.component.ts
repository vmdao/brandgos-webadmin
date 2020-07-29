import {
  Component,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '@app/pages/@store';
import {
  CollectionModel,
  CollectionsActions,
} from '@app/pages/@store/collection';

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

  collectionSelected: any;

  constructor(
    private store$: Store<fromApp.AppState>,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.collections$ = this.store$.select(fromApp.getCollections);
    this.collectionsLoading$ = this.store$.select(
      fromApp.getCollectionsLoading
    );

    this.fetchCollections();
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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

  onClickItem(item) {
    this.clickItem.emit(item);
  }

  getCollectionJoinItem(item) {
    return ['material', 'collections'];
  }

  getCollectionFilterItem(item) {
    return [
      `type||$eq||svg`,
      `collections.code||$in||badge,solid-shape,outlined-sha,flame`,
      `collections.id||$eq||${item.id}`,
    ];
  }

  getCollectionJoinShape() {
    return ['material', 'collections'];
  }

  getCollectionFilterShape() {
    return [`type||$eq||svg`, `collections.code||$eq||shape`];
  }
}
