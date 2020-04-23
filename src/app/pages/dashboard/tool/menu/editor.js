import Toolbar from './module/Toolbar';

export default class Editor {
  constructor(container, options = {}) {
    this.options = expandConfig(container, options);
    this.container = this.options.container;
    if (this.container == null) {
      return debug.error('Invalid Quill container', container);
    }

    if (this.container == null) {
      throw new Error('Invalid Quill container', container);
    }

    this.styleContainer();
    this.buildToolBar();
  }

  styleContainer() {
    this.container.classList.add('editor-container');
    this.root = this.addContainer('editor');
  }

  addContainer(container, refNode = null) {
    if (typeof container === 'string') {
      const className = container;
      container = document.createElement('div');
      container.classList.add(className);
    }
    this.container.insertBefore(container, refNode);
    return container;
  }

  buildToolBar() {
    this.toolbar = new Toolbar(this, this.options);
  }
}

function expandConfig(container) {
  return {
    container: document.querySelector(container),
  };
}
