import { MUserComponent } from './m-user.component';

import { async, TestBed } from '@angular/core/testing';

import { AppUIModule } from '@app/app-ui.module';

import { RouterTestingModule } from '@angular/router/testing';

describe('MUserComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppUIModule],
      declarations: [MUserComponent]
    }).compileComponents();
  }));

  function setup() {
    const fixture = TestBed.createComponent(MUserComponent);
    const component = fixture.componentInstance;

    return { fixture, component };
  }
});
