import { async, TestBed } from '@angular/core/testing';

import { AppUIModule } from '@app/app-ui.module';

import { RouterTestingModule } from '@angular/router/testing';

import { MHeaderTaskComponent } from './m-task.component';

describe('MHeaderTaskComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppUIModule],
      declarations: [MHeaderTaskComponent]
    }).compileComponents();
  }));

  function setup() {
    const fixture = TestBed.createComponent(MHeaderTaskComponent);
    const component = fixture.componentInstance;

    return { fixture, component };
  }

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(MHeaderTaskComponent);
  //   component = fixture.componentInstance;
  //   component.notifications = [];
  //   fixture.detectChanges();
  // });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
