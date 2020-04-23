import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/@core/services';
import { AuthenticationService } from '@app/auth/services';
import { Router } from '@angular/router';

import {
  CartService,
  CartModel,
  GetCartsProgessing,
  GetAgencyCartsProgessing
} from '@app/pages/@store/cart';
import * as fromBussiness from '@app/pages/@store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BrandService } from '@app/layouts/layout.service';
// import { OneSignalService } from 'ngx-onesignal-plus';

@Component({
  selector: 'app-layout-default-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class LayoutDefaultHeaderComponent implements OnInit {
  user: any;
  userType: string;
  counter = 0;
  notifications: Array<CartModel> = [];

  cartsProcessing$: Observable<CartModel[]>;
  constructor(
    public settings: SettingService,
    public authService: AuthenticationService,
    public cartService: CartService,
    private store$: Store<fromBussiness.AppState>,
    // public readonly onesignal: OneSignalService,
    private router: Router,
    public pro: BrandService
  ) {
    // (window as any).ngxOnesignal = onesignal;
  }

  ngOnInit() {
    this.user = this.authService.currentUserValue;
    this.userType = this.authService.currentUserType;
    this.setupNotification();

    if (this.userType === 'ROLE_ADMIN') {
      this.fetchAdminNotifications();
    }

    if (this.userType === 'ROLE_AGENCY') {
      this.fetchAgencyNotifications();
      this.cartsProcessing$ = this.store$.select(
        fromBussiness.getAgencyCartProcessing
      );
    }

    if (this.userType === 'ROLE_AFFILIATE') {
      this.fetchAffiliateNotifications();
      this.cartsProcessing$ = this.store$.select(
        fromBussiness.getCartProcessing
      );
    }
  }

  fetchAffiliateNotifications() {
    this.store$.dispatch(new GetCartsProgessing({ page: 0, size: 20 }));
  }

  fetchAgencyNotifications() {
    this.store$.dispatch(
      new GetAgencyCartsProgessing({ page: 0, size: 100, status: 'new' })
    );
  }

  fetchAdminNotifications() {
    this.cartService.getAll({}).subscribe(
      res => {
        this.counter = res.pagination.totalRecords;
        this.notifications = res.data;
      },
      error => {
        console.log(error);
      }
    );
  }

  setupNotification() {
    // this.onesignal.push('addListenerForNotificationOpened', message => {
    //   console.log('addListenerForNotificationOpened ', message);
    //   const { data } = message;
    //   if (typeof data === 'object') {
    //     if (typeof data.id === 'number') {
    //       this.nativigateionByNotification(data.eventName, data.id);
    //     } else {
    //       this.nativigateionByNotification(data.eventName);
    //     }
    //   }
    // });
    // this.onesignal.isSupported$.subscribe(isSupported => {
    //   if (isSupported) {
    //     console.log('loaded onesignal', isSupported);
    //     this.onesignal.sendTag('id', '' + this.user.user_id);
    //     this.onesignal.on('notificationDisplay', d => {
    //       console.log('notificationDisplay ', d);
    //     });
    //     this.onesignal.on('notificationDismiss', d => {
    //       console.log('notificationDismiss ', d);
    //     });
    //   }
    // });
  }

  nativigateionByNotification(eventName, id?: number) {
    switch (eventName) {
      case 'affiliateCartOrdered': {
        this.router.navigate(['/pages', 'agency-orders-waiting']);
        break;
      }
      case 'webOrdered': {
        this.router.navigate(['/pages', 'agency-orders-waiting']);
        break;
      }
      case 'agencyResponed': {
        if (id) {
          this.router.navigate(['/pages', 'affiliate-carts', id]);
        } else {
          this.router.navigate(['/pages', 'affiliate-carts']);
        }
        break;
      }
      case 'affiliateCartDone': {
        this.router.navigate(['/pages', 'agency-orders-done']);
        break;
      }
      case 'affiliateCartCancelled': {
        this.router.navigate(['/pages', 'agency-orders-cancelled']);
        break;
      }
      case 'affiliateApplied': {
        this.router.navigate(['/pages', 'affiliates']);
        break;
      }
      case 'agencyApplied': {
        this.router.navigate(['/pages', 'agencies']);
        break;
      }
    }
  }
}
