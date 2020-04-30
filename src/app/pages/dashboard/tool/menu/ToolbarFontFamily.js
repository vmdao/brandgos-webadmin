import ToolbarBase from './ToolbarBase';

export default class ToolbarFontFamily extends ToolbarBase {
  constructor(where, observers = [], fontsList) {
    super(where, observers);
    this.fontsList = fontsList;
    this.setHTML = this.createHTML(this.fontsList);
  }

  createHTML(fontsList = []) {
    const fontsHtml = fontsList.reduce((total, font) => {
      return total + `<option>${font.name}</option>`;
    }, '');

    const html = `<li class="toolbar__item"><select>${fontsHtml}</select></li>`;

    this.setHTML(html);
  }
}
