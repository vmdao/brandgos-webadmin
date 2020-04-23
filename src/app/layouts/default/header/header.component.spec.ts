import { LayoutDefaultHeaderComponent } from './header.component';
import { async, TestBed } from '@angular/core/testing';
import { MUserComponent } from './@components/m-user/m-user.component';
import { MHeaderTaskComponent } from './@components/m-task/m-task.component';

import { AppUIModule } from '@app/app-ui.module';

import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from '@app/pages/@store/cart';
import { SettingService } from '@app/@core/services';

describe('MHeaderComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppUIModule],
      declarations: [
        LayoutDefaultHeaderComponent,
        MUserComponent,
        MHeaderTaskComponent
      ],
      providers: [CartService, SettingService]
    }).compileComponents();
  }));
  function setup() {
    const fixture = TestBed.createComponent(LayoutDefaultHeaderComponent);
    const component = fixture.componentInstance;

    return { fixture, component };
  }
});
