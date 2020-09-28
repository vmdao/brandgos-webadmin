import { BaseMenuItemUI } from '../../basebar/ui.asbtract';
import { fromEvent, interval } from 'rxjs';
import { debounce } from 'rxjs/operators';

export class ButtonInputUI extends BaseMenuItemUI {
  valueCurrent = 0;
  stepCurrent = 1;
  minCurrent = 0;
  maxCurrent = 10;
  constructor(options) {
    super(options);
    this.valueCurrent = options.context.content || 0;
    this.stepCurrent = options.context.step || 1;
    this.minCurrent = options.context.min || 0;
    this.maxCurrent = options.context.max || 10;

    this.htmlWrapper = `<li class="toolbar__item toolbar__item--submenu${
      this.code ? 'toolbar__item--' + this.code : ''
    } ${this.position ? 'toolbar__item--' + this.position : ''}"></li>`;

    this.html = `<div class="button-input"><button><i class="fa fa-minus" aria-hidden="true"></i>+</button>
    <input class="" value="${this.valueCurrent}"/>
    <button><i class="fa fa-plus" aria-hidden="true"></i>-</button></div>`;
  }

  setCommand(action) {
    const { stepCurrent, maxCurrent, minCurrent } = this;
    const clickIncreaset = fromEvent(
      this.$el.find('button:first-child').get(0),
      action.event
    );

    const resultIncreaset = clickIncreaset.pipe(debounce(() => interval(50)));

    resultIncreaset.subscribe((x) => {
      if (this.valueCurrent + stepCurrent <= maxCurrent) {
        this.valueCurrent += stepCurrent;
        this.update();
      }
      // tslint:disable-next-line: no-string-literal
      action.command.execute(this.valueCurrent);
    });

    const clickDecrease = fromEvent(
      this.$el.find('button:last-child').get(0),
      action.event
    );
    const resultDecrease = clickDecrease.pipe(debounce(() => interval(50)));
    resultDecrease.subscribe((x) => {
      if (this.valueCurrent - stepCurrent >= minCurrent) {
        this.valueCurrent -= stepCurrent;
        this.update();
      }
      // tslint:disable-next-line: no-string-literal
      action.command.execute(this.valueCurrent);
    });
  }

  update() {
    this.$el.find('input').val(this.valueCurrent);
  }
}
