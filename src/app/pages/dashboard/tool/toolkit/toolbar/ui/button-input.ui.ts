import { BaseMenuItemUI } from '../../basebar/ui.asbtract';
import { fromEvent, interval } from 'rxjs';
import { debounce } from 'rxjs/operators';

export class ButtonInputUI extends BaseMenuItemUI {
  valueCurrent = 0;
  constructor(options) {
    super(options);
    this.valueCurrent = options.context.content || 0;
    this.htmlWrapper = `<li class="toolbar__item toolbar__item--submenu${
      this.code ? 'toolbar__item--' + this.code : ''
    } ${this.position ? 'toolbar__item--' + this.position : ''}"></li>`;

    this.html = `<div class="button-input"><button><i class="fa fa-minus" aria-hidden="true"></i>+</button>
    <input class="" value="${this.valueCurrent}"/>
    <button><i class="fa fa-plus" aria-hidden="true"></i>-</button></div>`;
  }

  setCommand(action) {
    const clickIncreaset = fromEvent(
      this.$dom.find('button:first-child').get(0),
      action.event
    );

    const resultIncreaset = clickIncreaset.pipe(debounce(() => interval(50)));

    resultIncreaset.subscribe((x) => {
      if (this.valueCurrent + 10 < 360) {
        this.valueCurrent += 10;
        this.update();
      }
      // tslint:disable-next-line: no-string-literal
      action.command.execute(this.valueCurrent);
    });

    const clickDecrease = fromEvent(
      this.$dom.find('button:last-child').get(0),
      action.event
    );
    const resultDecrease = clickDecrease.pipe(debounce(() => interval(50)));
    resultDecrease.subscribe((x) => {
      if (this.valueCurrent - 10 > -360) {
        this.valueCurrent -= 10;
        this.update();
      }
      // tslint:disable-next-line: no-string-literal
      action.command.execute(this.valueCurrent);
    });
  }

  update() {
    this.$dom.find('input').val(this.valueCurrent);
  }
}
