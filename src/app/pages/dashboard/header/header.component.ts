import {
  Component,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ItemModel, ItemsActions } from '@app/pages/@store/item';
import { Subject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '@app/pages/@store';
import { interval } from 'rxjs';
import { saveAs } from 'file-saver';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;
  renderData$: Observable<Blob>;
  renderLoading$: Observable<boolean>;
  isVisible = false;
  isVisible2 = false;
  data: any;
  percent: number = 0;
  renderLoading = true;
  private unsubscribe: Subject<void> = new Subject();
  constructor(
    private store$: Store<fromApp.AppState>,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.renderLoading$ = this.store$.select(fromApp.getRenderLoading);
    this.store$.select(fromApp.getRenderData).subscribe((res) => {
      this.data = res;
      this.unsubscribe.next();
      this.unsubscribe.complete();
      this.cd.detectChanges();
    });
    this.cd.detectChanges();
  }
  onClickRender() {
    this.isVisible = true;
    const work = document.getElementById('workspace');
    this.store$.dispatch(
      ItemsActions.render({ payload: { html: work.innerHTML } })
    );
    const secondsCounter = interval(100);
    this.percent = 0;
    secondsCounter.pipe(takeUntil(this.unsubscribe)).subscribe((n) => {
      if (this.percent < 100) {
        this.percent += 1;
      }
    });
  }

  onClickDownloadFile() {
    const blod = new Blob([this.data], { type: 'application/pdf' });
    saveAs(blod, 'Your-Logo-powered-by-Brandgos.pdf');
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  onClickRender2() {
    this.isVisible2 = true;
    const secondsCounter = interval(100);
    this.percent = 0;
    secondsCounter.pipe(takeUntil(this.unsubscribe)).subscribe((n) => {
      if (this.percent < 100) {
        this.percent += 1;
      }
    });
    const work = document.getElementById('workspace');
    console.log(work.innerHTML);
  }

  onClickDownloadFile2() {
    saveAs(this.data, 'Your-Logo-powered-by-Brandgos.png');
  }

  handleOk2(): void {
    this.isVisible2 = false;
  }

  handleCancel2(): void {
    this.isVisible2 = false;
  }
}
