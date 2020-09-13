import inView from 'vanillajs-browser-helpers/inView';
import { debounce } from 'lodash';
import jQuery from 'jquery';

export class Scrollable {
  isDown = true;
  lastScrollTop = 0;
  scrollDebounce = debounce((e, selector, cbDebounce) => {
    const st = jQuery(e.target).scrollTop();
    if (st > this.lastScrollTop) {
      this.isDown = true;
    } else {
      this.isDown = false;
    }
    this.lastScrollTop = st;
    const pages = document.querySelectorAll(selector);
    const pagesView = [].slice.call(pages).filter((p) => {
      return inView(p, 100).inside;
    });

    if (!pagesView.length) {
      return cbDebounce(pages[0]);
    }

    const pageSelected = this.isDown
      ? pagesView[0]
      : pagesView[pagesView.length - 1];
    cbDebounce(pageSelected);
  }, 60);

  onScrollPage(parentSelector, selector, callback) {
    const cbDebounce = debounce(callback, 20);
    jQuery(parentSelector).scroll((e) => {
      this.scrollDebounce(e, selector, cbDebounce);
    });
  }
}
