import { BaseMenuItemUI } from '../../basebar/ui.asbtract';
import { fromEvent, interval } from 'rxjs';
import { debounce } from 'rxjs/operators';

export class InputUI extends BaseMenuItemUI {
  constructor(options) {
    super(options);
    this.html = `<input class="toolbar__button toolbar__button--input" value="${options.context.content}"/>`;
  }

  setCommand(action) {
    const keyup = fromEvent(this.$dom.get(0), action.event);
    const result = keyup.pipe(debounce(() => interval(300)));
    result.subscribe((x) => {
      // tslint:disable-next-line: no-string-literal
      action.command.execute(x['target'].value);
    });
  }
}
