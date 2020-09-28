import { Editor } from '../Editor';
import { BaseElement } from '../elements/abstracts/base.abstract';
import {
  ColorCommand,
  SvgColorCommand,
  CloneCommand,
  TransformCommand,
  DeleteCommand,
  FontFamilyCommand,
  FontsizeCommand,
  TransparencyCommand,
  InputCommand,
  CurveCommand,
  LetterSpacingCommand,
  StrokeWidthCommand,
  StrokeColorCommand,
  FlipHorizontalCommand,
  FlipVerticalCommand,
} from '../toolkit/command';
import { ToolbarMenu } from '../toolkit/toolbar/menu';
import * as jQuery from 'jquery';
export class MenuFactory {
  constructor(private editor: Editor) {}

  createMenu(dataElement) {
    console.log(dataElement, 1234);
    const inputCommand = new InputCommand(dataElement, this.editor);
    const curveCommand = new CurveCommand(dataElement, this.editor);
    const strokeColorCommand = new StrokeColorCommand(dataElement);
    const strokeWidthCommand = new StrokeWidthCommand(dataElement);
    const letterSpacingCommand = new LetterSpacingCommand(
      dataElement,
      this.editor
    );
    const transparencyCommand = new TransparencyCommand(dataElement);
    const fontFamilyCommand = new FontFamilyCommand(dataElement, this.editor);
    const fontsizeCommand = new FontsizeCommand(dataElement, this.editor);
    const colorCommand = new ColorCommand(dataElement);
    const svgColorCommand = new SvgColorCommand(dataElement);
    const transformCommand = new TransformCommand(dataElement, this.editor);
    const cloneComand = new CloneCommand(dataElement, this.editor);
    const deleteCommand = new DeleteCommand(dataElement, this.editor);

    const flipHorizontalCommand = new FlipHorizontalCommand(dataElement);
    const flipVerticalCommand = new FlipVerticalCommand(dataElement);

    let items = [];

    switch (dataElement.elementType) {
      case 'svgtext': {
        items = [
          {
            type: 'button-input',
            icon: '',
            name: 'button-input',
            actions: [{ event: 'click', command: curveCommand }],
            children: [],
            context: {
              content: dataElement.text.curve,
              step: 10,
              max: 360,
              min: -360,
            },
          },
          {
            type: 'button-input',
            icon: '',
            name: 'button-input',
            actions: [{ event: 'click', command: letterSpacingCommand }],
            children: [],
            context: {
              content: dataElement.text.letterSpacing,
              step: 0.1,
              max: 10,
              min: -10,
            },
          },

          {
            type: 'input',
            icon: '',
            name: 'input',
            actions: [{ event: 'keyup', command: inputCommand }],
            children: [],
            context: {
              content: dataElement.text.html,
            },
          },
          {
            type: 'dropdown',
            icon: '',
            name: 'Font Family',
            code: 'fontFamily',
            actions: [{ event: 'click', command: fontFamilyCommand }],
            children: [],
            context: {
              list: [
                {
                  label: 'Aileron Bold',
                  width: 138,
                  height: 35,
                  url: '/assets/UV-Agin.ttf',
                  thumbUrl:
                    'https://static.canva.com/static/images/fonts/Aileron.png',
                },
                {
                  label: 'Aileron Thin',
                  width: 90,
                  height: 35,
                  url: '/assets/cantata-one-regular.otf',
                  thumbUrl:
                    'https://static.canva.com/static/images/fonts/Aileron-Thin.png',
                },
                {
                  label: 'Aileron Bold',
                  width: 138,
                  height: 35,
                  url: '/assets/UV-Agin.ttf',
                  thumbUrl:
                    'https://static.canva.com/static/images/fonts/Aileron.png',
                },
                {
                  label: 'Aileron Thin',
                  width: 90,
                  height: 35,
                  url: '/assets/cantata-one-regular.otf',
                  thumbUrl:
                    'https://static.canva.com/static/images/fonts/Aileron-Thin.png',
                },
              ],
            },
          },
          {
            type: 'dropdown',
            icon: '',
            name: 'FontSize',
            code: 'fontSize',
            actions: [{ event: 'click', command: fontsizeCommand }],
            children: [],
            context: {
              list: [
                {
                  label: '30px',
                  value: 30,
                },
                {
                  label: '40px',
                  value: 40,
                },
                {
                  label: '50px',
                  value: 50,
                },
                {
                  label: '60px',
                  value: 60,
                },
              ],
            },
          },
          {
            type: 'button-toggle',
            icon: 'uppercase',
            name: 'transform',
            actions: [{ event: 'click', command: transformCommand }],
            children: [],
            context: {
              isActive:
                dataElement.text.transform === 'uppercase' ? true : false,
            },
          },
          {
            type: 'drop-pad',
            icon: 'transparency',
            code: 'transparency',
            name: 'transparency',
            actions: [],
            children: [
              {
                type: 'slider-one',
                icon: 'slider',
                name: 'Transprency',
                actions: [{ event: 'change', command: transparencyCommand }],
                context: {
                  min: 0,
                  max: 100,
                  step: 1,
                  valueDefault: 100,
                },
              },
            ],
            context: {},
            position: 'right',
          },

          {
            type: 'button-color',
            icon: '',
            name: 'color',
            actions: [{ event: 'change', command: colorCommand }],
            children: [],
            context: {
              color: dataElement.text.color,
            },
          },

          {
            type: 'button',
            icon: 'delete',
            name: 'Delete',
            actions: [{ event: 'click', command: deleteCommand }],
            children: [],
            context: {},
            position: 'right',
          },
          {
            type: 'button',
            icon: 'clone',
            name: 'Clone',
            actions: [{ event: 'click', command: cloneComand }],
            children: [],
            context: {},
            position: 'right',
          },
        ];
        break;
      }
      case 'svgdraw':
        items = [
          {
            type: 'drop-pad',
            icon: 'transparency',
            code: 'transparency',
            name: 'transparency',
            actions: [],
            children: [
              {
                type: 'slider-one',
                icon: 'slider',
                name: 'Transprency',
                actions: [{ event: 'change', command: transparencyCommand }],
                context: {
                  min: 0,
                  max: 100,
                  step: 1,
                  valueDefault: 100,
                },
              },
            ],
            context: {},
          },
          {
            type: 'button-color',
            icon: '',
            name: 'color1',
            actions: [{ event: 'change', command: svgColorCommand }],
            children: [],
            context: {
              color1: dataElement.svg.color1,
              color2: dataElement.svg.color2,
              color3: dataElement.svg.color3,
            },
          },
          {
            type: 'button-input',
            icon: '',
            name: 'button-input',
            actions: [{ event: 'click', command: strokeWidthCommand }],
            children: [],
            context: {
              content: dataElement.svg.strokeWidth,
              step: 1,
              max: 60,
              min: 0,
            },
          },
          {
            type: 'button-color',
            icon: '',
            name: 'color1',
            actions: [{ event: 'change', command: strokeColorCommand }],
            children: [],
            context: {
              strokeColor: dataElement.svg.strokeColor,
            },
          },
          {
            type: 'button',
            icon: 'delete',
            name: 'Delete',
            actions: [{ event: 'click', command: deleteCommand }],
            children: [],
            context: {},
            position: 'right',
          },
          {
            type: 'button',
            icon: 'clone',
            name: 'Clone',
            actions: [{ event: 'click', command: cloneComand }],
            children: [],
            context: {},
            position: 'right',
          },

          {
            type: 'drop-pad',
            icon: '',
            code: 'Layer',
            name: 'Layer',
            actions: [],
            children: [
              {
                type: 'button',
                icon: 'clone',
                name: 'Clone',
                actions: [{ event: 'click', command: cloneComand }],
                children: [],
                context: {},
              },
              {
                type: 'button',
                icon: 'clone',
                name: 'Clone',
                actions: [{ event: 'click', command: cloneComand }],
                children: [],
                context: {},
              },
            ],
            context: {},
            position: 'right',
          },
        ];
        break;
      case 'svg': {
        items = [
          {
            type: 'drop-pad',
            icon: 'transparency',
            code: 'transparency',
            name: 'transparency',
            actions: [],
            children: [
              {
                type: 'slider-one',
                icon: 'slider',
                name: 'Transprency',
                actions: [{ event: 'change', command: transparencyCommand }],
                context: {
                  min: 0,
                  max: 100,
                  step: 1,
                  valueDefault: 100,
                },
              },
            ],
            context: {},
          },
          {
            type: 'button-color',
            icon: '',
            name: 'color1',
            actions: [{ event: 'change', command: svgColorCommand }],
            children: [],
            context: {
              color1: dataElement.svg.color1,
              color2: dataElement.svg.color2,
              color3: dataElement.svg.color3,
            },
          },
          {
            type: 'button-color',
            icon: '',
            name: 'color2',
            actions: [{ event: 'change', command: svgColorCommand }],
            children: [],
            context: {
              color1: dataElement.svg.color1,
              color2: dataElement.svg.color2,
              color3: dataElement.svg.color3,
            },
          },
          {
            type: 'button-color',
            icon: '',
            name: 'color3',
            actions: [{ event: 'change', command: svgColorCommand }],
            children: [],
            context: {
              color1: dataElement.svg.color1,
              color2: dataElement.svg.color2,
              color3: dataElement.svg.color3,
            },
          },

          {
            type: 'button',
            icon: 'delete',
            name: 'Delete',
            actions: [{ event: 'click', command: deleteCommand }],
            children: [],
            context: {},
            position: 'right',
          },
          {
            type: 'button',
            icon: 'clone',
            name: 'Clone',
            actions: [{ event: 'click', command: cloneComand }],
            children: [],
            context: {},
            position: 'right',
          },

          {
            type: 'drop-pad',
            icon: '',
            code: 'Layer',
            name: 'Layer',
            actions: [],
            children: [
              {
                type: 'button',
                icon: 'clone',
                name: 'Clone',
                actions: [{ event: 'click', command: cloneComand }],
                children: [],
                context: {},
              },
              {
                type: 'button',
                icon: 'clone',
                name: 'Clone',
                actions: [{ event: 'click', command: cloneComand }],
                children: [],
                context: {},
              },
            ],
            context: {},
            position: 'right',
          },
        ];
        break;
      }
    }

    const itemsFix = [
      {
        type: 'button-toggle',
        icon: 'uppercase',
        name: 'transform',
        actions: [{ event: 'click', command: flipHorizontalCommand }],
        children: [],
        context: {
          isActive: dataElement.flipHorizontal ? true : false,
        },
        position: 'right',
      },
      {
        type: 'button-toggle',
        icon: 'uppercase',
        name: 'transform',
        actions: [{ event: 'click', command: flipVerticalCommand }],
        children: [],
        context: {
          isActive: dataElement.flipVertical ? true : false,
        },
        position: 'right',
      },
    ];

    return this.buildMenu(dataElement, [...items, ...itemsFix]);
  }

  buildMenu(dataElement: BaseElement, items) {
    const options = { where: '', type: 'toolbar', dataElement };
    const menu = new ToolbarMenu(options);
    menu.render();
    menu.builderMenu(items);

    const $toolbar = jQuery('#toolbar');
    $toolbar.empty();
    menu.appendTo('#toolbar');
    $toolbar.addClass('menu--active');
    return menu;
  }
}
