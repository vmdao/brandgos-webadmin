import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  OnChanges
} from '@angular/core';
// import { CartModel } from '@app/pages/@store/cart';
import { AuthenticationService } from '@app/auth/services';
import { CartModel } from '@app/pages/@store/cart';

@Component({
  selector: 'app-header-task',
  templateUrl: './m-task.component.html',
  styleUrls: ['./m-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MHeaderTaskComponent implements OnChanges {
  @Input() notifications: Array<CartModel> = [];
  @Input() counter = 0;
  loading = true;
  userType = '';
  constructor(
    private cdr: ChangeDetectorRef,
    public authService: AuthenticationService
  ) {}

  ngOnChanges() {
    this.userType = this.authService.currentUserType;
    this.cdr.detectChanges();
  }

  change() {
    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges();
    }, 500);
  }
}
