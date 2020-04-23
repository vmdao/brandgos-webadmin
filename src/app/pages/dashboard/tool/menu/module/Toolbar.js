import Module from '../core/module';
import Button from '../ui/Button';
import Picker from '../ui/Picker';
import IconPicker from '../ui/IconPicker';
import SliderPicker from '../ui/SliderPicker';
import ColorPicker from '../ui/ColorPicker';
export default class Toolbar extends Module {
  constructor(editor, options) {
    super();
    this.editor = editor;
    this.options = options;

    const container = document.createElement('div');

    addControls(container, this.options.container);

    quill.container.parentNode.insertBefore(container, quill.container);
    this.container = container;

    this.styleUI(this.container);
  }

  styleUI(container) {
    console.log(container);
  }
}

function addControls(container, groups) {
  if (!Array.isArray(groups[0])) {
    groups = [groups];
  }

  groups.forEach((controls) => {
    if (!Array.isArray(controls)) {
      throw new Error('Not controls');
    }
    const group = document.createElement('span');
    group.classList.add('editor-formats');

    controls.forEach((control) => {
      switch (control.type) {
        case 'item': {
          addButton(group, control);
          break;
        }
        case 'group': {
          addSelect(group, control);
          break;
        }
        case 'slider': {
          addSilder(group, control);
          break;
        }
        case 'color': {
          addColor(group, control);
          break;
        }
      }
    });
    container.appendChild(group);
  });
}

function addButton(container, format, value) {
  const input = document.createElement('button');
  input.setAttribute('type', 'button');
  input.classList.add(`editor-${format}`);
  if (value != null) {
    input.value = value;
  }
  container.appendChild(input);
}

function addSelect(container, format, values) {
  const input = document.createElement('select');
  input.classList.add(`editor-${format}`);
  values.forEach((value) => {
    const option = document.createElement('option');
    if (value !== false) {
      option.setAttribute('value', value);
    } else {
      option.setAttribute('selected', 'selected');
    }
    input.appendChild(option);
  });
  container.appendChild(input);
}

function addSilder(container, format, values) {
  const input = document.createElement('select');
  input.classList.add(`editor-${format}`);
  values.forEach((value) => {
    const option = document.createElement('option');
    if (value !== false) {
      option.setAttribute('value', value);
    } else {
      option.setAttribute('selected', 'selected');
    }
    input.appendChild(option);
  });
  container.appendChild(input);
}

function addColor(container, format, values) {
  const input = document.createElement('select');
  input.classList.add(`editor-${format}`);
  values.forEach((value) => {
    const option = document.createElement('option');
    if (value !== false) {
      option.setAttribute('value', value);
    } else {
      option.setAttribute('selected', 'selected');
    }
    input.appendChild(option);
  });
  container.appendChild(input);
}
