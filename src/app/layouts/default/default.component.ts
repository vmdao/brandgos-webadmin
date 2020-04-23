import {
  Component,
  OnInit,
  Inject,
  Renderer2,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

import { BrandService } from '../layout.service';
import { DOCUMENT } from '@angular/common';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { ScrollService } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { Store } from '@ngrx/store';
import * as fromUser from '@app/pages/@store/user';

import {
  Router,
  NavigationEnd,
  RouteConfigLoadStart,
  NavigationError,
} from '@angular/router';
import { ReuseTabService } from '@delon/abc';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { updateHostClass } from '@delon/util';
import { UsersActions } from '@app/pages/@store/user';
@Component({
  selector: 'app-layout-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class LayoutDefaultComponent
  implements OnInit, AfterViewInit, OnDestroy {
  isCollapsed = false;
  isReverseArrow = false;
  width = 200;

  private unsubscribe$ = new Subject<void>();
  private queryCls: string;

  isFetching = false;

  get isMobile() {
    return this.pro.isMobile;
  }

  get getLayoutStyle() {
    const {
      isMobile,
      fixSiderbar,
      collapsed,
      menu,
      width,
      widthInCollapsed,
    } = this.pro;
    if (fixSiderbar && menu !== 'top' && !isMobile) {
      return {
        paddingLeft: (collapsed ? widthInCollapsed : width) + 'px',
      };
    }
    return null;
  }

  get getContentStyle() {
    const { fixedHeader, headerHeight } = this.pro;
    return {
      margin: '24px 24px 0',
      'padding-top': (fixedHeader ? headerHeight : 0) + 'px',
    };
  }

  private get body(): HTMLElement {
    return this.doc.body;
  }

  constructor(
    private storeUser$: Store<fromUser.UserState>,
    @Inject(DOCUMENT) private doc: any,
    bm: BreakpointObserver,
    mediaMatcher: MediaMatcher,
    router: Router,
    scroll: ScrollService,
    reuseTabSrv: ReuseTabService,
    private msg: NzMessageService,
    private renderer: Renderer2,
    public pro: BrandService
  ) {
    // scroll to top in change page
    router.events.pipe(takeUntil(this.unsubscribe$)).subscribe((evt) => {
      if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
        this.isFetching = true;
        scroll.scrollToTop();
      }
      if (evt instanceof NavigationError) {
        this.isFetching = false;
        msg.error(`Không thể chuyển tới trang ${evt.url}`, {
          nzDuration: 1000 * 3,
        });
        return;
      }
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      this.isFetching = false;
      // If have already cached router, should be don't need scroll to top
      if (!reuseTabSrv.exists(evt.url)) {
        scroll.scrollToTop();
      }
    });

    // media
    const query = {
      'screen-xs': '(max-width: 575px)',
      'screen-sm': '(min-width: 576px) and (max-width: 767px)',
      'screen-md': '(min-width: 768px) and (max-width: 991px)',
      'screen-lg': '(min-width: 992px) and (max-width: 1199px)',
      'screen-xl': '(min-width: 1200px)',
    };
    bm.observe([
      '(min-width: 1200px)',
      '(min-width: 992px) and (max-width: 1199px)',
      '(min-width: 768px) and (max-width: 991px)',
      '(min-width: 576px) and (max-width: 767px)',
      '(max-width: 575px)',
    ]).subscribe(() => {
      this.queryCls = Object.keys(query).find(
        (key) => mediaMatcher.matchMedia(query[key]).matches
      );
      this.setClass();
    });
  }

  private setClass() {
    const { body, renderer, queryCls, pro } = this;
    updateHostClass(body, renderer, {
      ['color-weak']: pro.layout.colorWeak,
      [`layout-fixed`]: pro.layout.fixed,
      [`aside-collapsed`]: pro.collapsed,
      ['alain-pro']: true,
      [queryCls]: true,
      [`alain-pro__content-${pro.layout.contentWidth}`]: true,
      [`alain-pro__fixed`]: pro.layout.fixedHeader,
      [`alain-pro__wide`]: pro.isFixed,
      [`alain-pro__dark`]: pro.theme === 'dark',
      [`alain-pro__light`]: pro.theme === 'light',
    });
  }

  ngAfterViewInit(): void {}

  ngOnInit() {
    const { pro, unsubscribe$ } = this;
    pro.notify.pipe(takeUntil(unsubscribe$)).subscribe(() => {
      this.setClass();
    });
  }

  ngOnDestroy() {
    const { unsubscribe$, body, pro } = this;
    unsubscribe$.next();
    unsubscribe$.complete();
    body.classList.remove(
      `alain-pro__content-${pro.layout.contentWidth}`,
      `alain-pro__fixed`,
      `alain-pro__wide`,
      `alain-pro__dark`,
      `alain-pro__light`
    );
  }
}
