import { BaseMenuItemUI } from '../../basebar/ui.asbtract';
import { fromEvent, interval } from 'rxjs';
import { debounce } from 'rxjs/operators';

export class ButtonInputUI extends BaseMenuItemUI {
  constructor(options) {
    super(options);
    this.htmlWrapper = `<li class="toolbar__item toolbar__item--submenu${
      this.code ? 'toolbar__item--' + this.code : ''
    } ${this.position ? 'toolbar__item--' + this.position : ''}"></li>`;

    this.html = `<div class="button-input"><button><i class="fa fa-minus" aria-hidden="true"></i>+</button>
    <input class="" value="${options.context.content}"/>
    <button><i class="fa fa-plus" aria-hidden="true"></i>-</button></div>`;
  }

  setCommand(action) {
    const click = fromEvent(
      this.$dom.find('button:first-child').get(0),
      action.event
    );
    const result = click.pipe(debounce(() => interval(50)));
    result.subscribe((x) => {
      // tslint:disable-next-line: no-string-literal
      action.command.execute(x['target'].value);
    });
  }
}
