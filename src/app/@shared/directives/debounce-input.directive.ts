import {
  Directive,
  Input,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';
import * as _ from 'lodash';

@Directive({
  selector: '[appDebounceInput]'
})
export class DebounceInputDirective {
  private defaultDebounceTime = 1000;
  @Input() appDebounceInput: number;

  private debounceEmit = _.debounce(
    this.updateChange,
    this.appDebounceInput || this.defaultDebounceTime
  );

  @Output() changeInput = new EventEmitter<string>();
  @HostListener('keyup', ['$event']) onkeyup(e) {
    const value = e.target.value;
    this.debounceEmit(value);
  }

  updateChange(value) {
    this.changeInput.emit(value);
  }
  constructor() {}
}
