import * as jQuery from 'jquery';
import { template } from 'lodash';

export function getView(templateString, data): string {
  return template(templateString)(data);
}

export function getViewEl(templateString, data) {
  return jQuery(getView(templateString, data)).get(0);
}

export function findChildrenEl(parent, selector) {
  return jQuery(parent).find(selector).get(0);
}

export function append(
  selector: string | HTMLElement,
  el: string | HTMLElement
) {
  return jQuery(selector).append(el);
}

export function getPageOfElement(element) {
  return jQuery(element).parents('.page').get(0);
}

export function filterElementsByPage(page, elements) {
  return elements
    .filter((e) => {
      return jQuery(page).has(e).length;
    })
    .map((e) => {
      return e;
    });
}

export function addPageSelected(element) {
  jQuery('.page').removeClass('selected');
  return jQuery(element).addClass('selected');
}
