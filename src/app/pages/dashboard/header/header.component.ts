import {
  Component,
  ChangeDetectorRef,
  ElementRef,
  ViewChild,
  OnInit,
  Input,
} from '@angular/core';
import { ItemsActions } from '@app/pages/@store/item';
import { Subject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '@app/pages/@store';
import { interval } from 'rxjs';
import { saveAs } from 'file-saver';
import { takeUntil } from 'rxjs/operators';
import { Editor } from '../workspace/Editor';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

  @Input()
  editor: Editor;

  renderData$: Observable<Blob>;
  renderLoading$: Observable<boolean>;
  isVisible = false;
  data: any;
  percent = 0;
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
    const work = document.getElementsByClassName('elements')[0];
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

  onClickUndo() {
    this.editor.historyManager.undo();
  }
  onClickRedo() {
    this.editor.historyManager.redo();
  }
}
