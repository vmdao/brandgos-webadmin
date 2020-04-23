import { async, TestBed } from '@angular/core/testing';

import { AppUIModule } from '@app/app-ui.module';

import { LayoutDefaultComponent } from './default.component';
import { RouterTestingModule } from '@angular/router/testing';

import { LayoutDefaultSidebarComponent } from './sidebar/sidebar.component';
import { LayoutDefaultHeaderComponent } from './header/header.component';
import { MUserComponent } from './header/@components/m-user/m-user.component';
import { MHeaderTaskComponent } from './header/@components/m-task/m-task.component';
import { CartService } from '@app/pages/@store/cart';
import { AuthenticationService } from '@app/auth/services';

describe('LayoutDefaultComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppUIModule],
      declarations: [
        LayoutDefaultComponent,
        MHeaderTaskComponent,
        MUserComponent,
        LayoutDefaultSidebarComponent,
        LayoutDefaultHeaderComponent
      ],
      providers: [CartService, AuthenticationService]
    }).compileComponents();
  }));

  function setup() {
    const fixture = TestBed.createComponent(LayoutDefaultComponent);
    const component = fixture.componentInstance;
    component.isCollapsed = true;

    const authenticationService = fixture.debugElement.injector.get(
      AuthenticationService
    );

    return { fixture, component, authenticationService };
  }

  // it('should create', () => {
  //   const { component, fixture, authenticationService } = setup();
  //   const role = 'ROLE_AGENCY';
  //   const user = { roles: ['ROLE_AGENCY'], name: 'okok' };
  //   localStorage.setItem('currentUser', JSON.stringify(user));
  //   spyOn(authenticationService, 'currentUserType').and.returnValue(
  //     Observable.create((observer: Observer<string>) => {
  //       observer.next(role);
  //       return observer;
  //     })
  //   );

  //   tick();

  //   fixture.detectChanges();

  //   expect(component).toBeTruthy();
  // });
});
