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
import { CollectionModel } from '@app/pages/@store/collection';

@Component({
  selector: 'app-tab-template',
  templateUrl: './tab-template.component.html',
  styleUrls: ['./tab-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabTemplateComponent implements OnInit, OnDestroy {
  @Output()
  clickItem: EventEmitter<any> = new EventEmitter();

  private unsubscribe$: Subject<void> = new Subject();
  loading$: Observable<boolean>;

  collections$: Observable<Array<CollectionModel>>;
  collectionsLoading$: Observable<boolean>;

  size = 10;
  page = 1;
  total = 0;

  sortValue: string | null = 'DESC';
  sortKey: string | null = 'priority';

  fulltext: string;
  q = {
    fulltext: null,
    tag: null,
  };

  categories = [
    { label: 'Fashion', value: 'Fashion' },
    { label: 'Cafe', value: 'Cafe' },
    { label: 'Computer', value: 'Computer' },
  ];

  styles = [
    { label: 'Bold', value: 'Bold' },
    { label: 'Colorful', value: 'Colorful' },
    { label: 'Vintage', value: 'Vintage' },
  ];

  category = 'Cafe';
  style = 'Colorful';

  constructor(
    private store$: Store<fromApp.AppState>,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loading$ = this.store$.select(fromApp.getItemIconsLoading);
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onClickItem(item) {
    this.clickItem.emit(item);
  }

  onClickSearch() {
    this.q.tag = null;
    this.fulltext = this.q.fulltext;
  }

  getCollectionJoinItem(item) {
    return ['material', 'collections'];
  }

  getCollectionFilterItem(item) {
    return [`type||$eq||svg`, `collections.code||$eq||icon`];
  }
}
