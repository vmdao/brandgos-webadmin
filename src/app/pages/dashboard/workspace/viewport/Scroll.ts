import inView from 'vanillajs-browser-helpers/inView';
import { debounce } from 'lodash';
import jQuery from 'jquery';
const HEIGHT_THOU = 100;
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

    const pagesSelectedView = [].slice.call(pages).filter((p) => {
      return jQuery(p).hasClass('selected');
    });

    const pagesView = [].slice.call(pages).filter((p) => {
      return inView(p, HEIGHT_THOU).inside;
    });

    pages.forEach((p) => {
      jQuery(p).removeClass('selected');
    });

    if (!pagesView.length) {
      jQuery(pages[0]).addClass('selected');
      return cbDebounce(pages[0]);
    }

    const pageSelectedExist = pagesView.find((pV) =>
      pagesSelectedView.find((pS) => pV === pS)
    );
    let pageSelected = null;

    if (pageSelectedExist) {
      pageSelected = pageSelectedExist;
    }
    if (pagesView.length > 2) {
      const num = Math.floor(pagesView.length / 2);
      pageSelected = pagesView[num];
    } else {
      pageSelected = this.isDown
        ? pagesView[0]
        : pagesView[pagesView.length - 1];
    }

    jQuery(pageSelected).addClass('selected');
    cbDebounce(pageSelected);
  }, 60);

  onScrollPage(parentSelector, selector, callback) {
    const cbDebounce = debounce(callback, 20);
    jQuery(parentSelector).scroll((e) => {
      this.scrollDebounce(e, selector, cbDebounce);
    });
  }
}
