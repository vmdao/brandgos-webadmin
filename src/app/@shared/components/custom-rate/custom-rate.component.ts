import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-custom-rate',
  templateUrl: './custom-rate.component.html',
  styleUrls: ['./custom-rate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomRateComponent {
  @Input()
  score = 0;
  @Input()
  readonly = false;
}
