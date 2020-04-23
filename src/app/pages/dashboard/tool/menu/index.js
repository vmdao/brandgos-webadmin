import $ from 'jquery';
import _ from 'lodash';
import ModelList from './ModelList';
import ModelColor from './ModelColor';
import ModelSlider from './ModelSlider';
import ModelButton from './ModelButton';
import ModelButtonPad from './ModelButtonPad';

export default class Menu {
    constructor(where, type, observers = {}, dataElement) {
        this.where = where;
        this.type = type;
        this.observers = observers;
        this.dataElement = dataElement;
        this.create();
    }

    addMenuItem(item) {
        item.render();
    }

    create() {
        this.$dom = $(this.getHTML());
        switch (this.type) {
            case 'text':
                return this.createToolbarText();
            case 'image':
                return this.createToolbarImage();
            case 'svg':
                return this.createToolbarSvg();
            default: ;
        }
    }

    createToolbarText() {
        const dataMenuDefault = {
            uppercase: false,
            color: '#000000',
            lintHeight: 1.41,
            letterSpacing: 0,
            opacity: 1

        }
        const style = _.extend(dataMenuDefault, this.dataElement.style);

        const ulElem = this.$dom.children('.toolbar__list');

        if (typeof this.observers.listenerFontFamily === 'function') {
            const toolbarFontFamily = new ModelList(ulElem, {
                listener: (data) => {
                    this.observers.listenerFontFamily(this.dataElement, data)
                },
                click: this.hideSubmenu.bind(this)
            }, { kind: 'fontFamily', type: 'radio', code: 'fontFamily', name: 'Roboto', label: 'Text Left', isIcon: false, });
            this.addMenuItem(toolbarFontFamily);
        }

        if (typeof this.observers.listenerFontSize === 'function') {
            const toolbarFontSize = new ModelList(ulElem, {
                listener: (data) => {
                    this.observers.listenerFontSize(this.dataElement, data);
                },
                click: this.hideSubmenu.bind(this)
            }, { kind: 'fontSize', type: 'radio', code: 'fontSize', name: 28, label: 28, isIcon: false });

            this.addMenuItem(toolbarFontSize);
        }

        if (typeof this.observers.listenerTextAlign === 'function') {
            const toolbarTextAlign = new ModelButtonPad(ulElem,
                {
                    listener: (data) => {
                        this.observers.listenerTextAlign(this.dataElement, data);

                    },
                    click: this.hideSubmenu.bind(this)
                },
                { type: 'radio', code: 'textLeft', name: 'Left', label: 'Text Left', isIcon: true, });

            toolbarTextAlign.addItem(new ModelButton(toolbarTextAlign.$dom, { click: toolbarTextAlign.callObserver() }, { type: 'radio', code: 'textLeft', name: 'Left', isActive: !0, label: 'Text Left', isIcon: true, }));

            toolbarTextAlign.addItem(new ModelButton(toolbarTextAlign.$dom, { click: toolbarTextAlign.callObserver() }, { type: 'radio', code: 'textRight', name: 'Right', label: 'Text Right', isIcon: true, }));

            toolbarTextAlign.addItem(new ModelButton(toolbarTextAlign.$dom, { click: toolbarTextAlign.callObserver() }, { type: 'radio', code: 'textCenter', name: 'Center', label: 'Text Center', isIcon: true, }));

            this.addMenuItem(toolbarTextAlign);
        }

        if (typeof this.observers.listenerLayer === 'function') {
            const toolbarLayer = new ModelButtonPad(ulElem, {
                listener: (data) => {
                    this.observers.listenerLayer(this.dataElement, data);
                },
                click: this.hideSubmenu.bind(this)
            }, { type: 'radio', code: 'layer', name: 'Layer', label: 'Layer', isIcon: false });
            toolbarLayer.addItem(new ModelButton(toolbarLayer.$dom, { click: toolbarLayer.callObserver() }, { code: 'forward', name: 'Forward', label: 'Forward', isIcon: true, }));
            toolbarLayer.addItem(new ModelButton(toolbarLayer.$dom, { click: toolbarLayer.callObserver() }, { code: 'back', name: 'Back', label: 'Back', isIcon: true, }));
            this.addMenuItem(toolbarLayer);
        }

        if (typeof this.observers.listenerTextSpacing === 'object') {
            const toolbarTextSpacing = new ModelButtonPad(ulElem, {
                listener: (data) => {

                    if (typeof this.observers.listenerTextSpacing.listenerLineHeight === 'function' && data.name === 'Line height') {
                        return this.observers.listenerTextSpacing.listenerLineHeight(this.dataElement, data);
                    }

                    if (typeof this.observers.listenerTextSpacing.listenerLetterSpacing === 'function' && data.name === 'Letter spacing') {
                        return this.observers.listenerTextSpacing.listenerLetterSpacing(this.dataElement, data);
                    }
                },
                click: this.hideSubmenu.bind(this)
            }, { name: 'Spacing' });

            toolbarTextSpacing.addItem(new ModelSlider(toolbarTextSpacing.$dom, { slider: toolbarTextSpacing.callObserver() }, { name: 'Letter spacing', min: -200, max: 800, step: 10, valueDefault: style.letterSpacing }));

            toolbarTextSpacing.addItem(new ModelSlider(toolbarTextSpacing.$dom, { slider: toolbarTextSpacing.callObserver() }, { name: 'Line height', min: 0.5, max: 2.5, step: 0.01, valueDefault: style.lintHeight }));

            this.addMenuItem(toolbarTextSpacing);
        }

        if (typeof this.observers.listenerTranparency === 'function') {
            const toolbarTranparency = new ModelButtonPad(ulElem, {
                listener: (data) => {
                    this.observers.listenerTranparency(this.dataElement, data);
                },
                click: this.hideSubmenu.bind(this)
            }, { name: 'transparency', code: 'transparency', label: 'Transparency', isIcon: true });

            toolbarTranparency.addItem(new ModelSlider(toolbarTranparency.$dom, { slider: toolbarTranparency.callObserver() }, { name: 'Transparency', min: 0, max: 100, step: 1, valueDefault: style.opacity * 100 }));

            this.addMenuItem(toolbarTranparency);
        }

        if (typeof this.observers.listenerColor1 === 'function') {
            const toolbarColor = new ModelButtonPad(ulElem, {
                listener: (data) => {
                    this.observers.listenerColor1(this.dataElement, data);
                    toolbarColor.updateIconColor(data);
                },
                click: this.hideSubmenu.bind(this)
            }, { name: 'color', code: 'color', label: 'Color', isIcon: true });
            toolbarColor.addItem(new ModelColor(toolbarColor.$dom, { onChangeCompete: toolbarColor.callObserver() }, style.color));
            this.addMenuItem(toolbarColor);
        }

        if (typeof this.observers.listenerUppercase === 'function') {
            const toolbarUppercase = new ModelButton(ulElem, {
                click: (data) => {
                    this.hideSubmenu();
                    this.observers.listenerUppercase(this.dataElement, data);
                },

            }, { type: 'radio', code: 'uppercase', name: 'Uppercase', label: 'Uppercase', isIcon: true, isActive: style.uppercase });
            this.addMenuItem(toolbarUppercase);
        }

        if (typeof this.observers.listenerCopy === 'function') {
            const toolbarCopy = new ModelButton(ulElem, {
                click: (data) => {
                    this.hideSubmenu();
                    this.observers.listenerCopy(this.dataElement, data);
                }
            }, { code: 'copy', name: 'Copy', label: 'Copy', isIcon: false });
            this.addMenuItem(toolbarCopy);
        }

        if (typeof this.observers.listenerDelete === 'function') {
            const toolbarDelete = new ModelButton(ulElem, {
                click: (data) => {
                    this.remove();
                    this.observers.listenerDelete(this.dataElement, data);
                }
            }, { code: 'delete', name: 'Delete', label: 'Delete', isIcon: true });
            this.addMenuItem(toolbarDelete);
        }
    }

    createToolbarImage() {
        const dataMenuDefault = {
            opacity: 1

        }
        const style = _.extend(dataMenuDefault, this.dataElement.style);

        const ulElem = this.$dom.children('.toolbar__list');

        if (typeof this.observers.listenerLayer === 'function') {
            const toolbarLayer = new ModelButtonPad(ulElem, {
                listener: (data) => {
                    this.observers.listenerLayer(this.dataElement, data);
                },
                click: this.hideSubmenu.bind(this)
            }, { type: 'radio', code: 'layer', name: 'Layer', label: 'Layer', isIcon: false });
            toolbarLayer.addItem(new ModelButton(toolbarLayer.$dom, { click: toolbarLayer.callObserver() }, { code: 'forward', name: 'Forward', label: 'Forward', isIcon: true, }));
            toolbarLayer.addItem(new ModelButton(toolbarLayer.$dom, { click: toolbarLayer.callObserver() }, { code: 'back', name: 'Back', label: 'Back', isIcon: true, }));
            this.addMenuItem(toolbarLayer);
        }

        if (typeof this.observers.listenerTranparency === 'function') {
            const toolbarTranparency = new ModelButtonPad(ulElem, {
                listener: (data) => {
                    this.observers.listenerTranparency(this.dataElement, data);
                },
                click: this.hideSubmenu.bind(this)
            }, { name: 'transparency', code: 'transparency', label: 'Transparency', isIcon: true });

            toolbarTranparency.addItem(new ModelSlider(toolbarTranparency.$dom, { slider: toolbarTranparency.callObserver() }, { name: 'Transparency', min: 0, max: 100, step: 1, valueDefault: style.opacity * 100 }));

            this.addMenuItem(toolbarTranparency);
        }

        if (typeof this.observers.listenerCopy === 'function') {
            const toolbarCopy = new ModelButton(ulElem, {
                click: (data) => {
                    this.observers.listenerCopy(this.dataElement, data);
                }
            }, { code: 'copy', name: 'Copy', label: 'Copy', isIcon: false });
            this.addMenuItem(toolbarCopy);
        }

        if (typeof this.observers.listenerDelete === 'function') {
            const toolbarDelete = new ModelButton(ulElem, {
                click: (data) => {
                    this.remove();
                    this.observers.listenerDelete(this.dataElement, data);
                }
            }, { code: 'delete', name: 'Delete', label: 'Delete', isIcon: true });
            this.addMenuItem(toolbarDelete);
        }
    }

    createToolbarSvg() {
        const dataMenuDefault = {
            opacity: 1,
            color1: '#000'
        }
        const style = _.extend(dataMenuDefault, this.dataElement.style);

        const ulElem = this.$dom.children('.toolbar__list');

        if (typeof this.observers.listenerColor1 === 'function' && style.color1) {
            const toolbarColor = new ModelButtonPad(ulElem, {
                listener: (data) => {
                    this.observers.listenerColor1(this.dataElement, data);
                    toolbarColor.updateIconColor(data);
                },
                click: this.hideSubmenu.bind(this)
            }, { name: 'color', code: 'color', label: 'Color', isIcon: true });
            toolbarColor.addItem(new ModelColor(toolbarColor.$dom, { onChangeCompete: toolbarColor.callObserver() }, style.color));
            this.addMenuItem(toolbarColor);
        }

        if (typeof this.observers.listenerLayer === 'function') {
            const toolbarLayer = new ModelButtonPad(ulElem, {
                listener: (data) => {
                    this.observers.listenerLayer(this.dataElement, data);
                },
                click: this.hideSubmenu.bind(this)
            }, { type: 'radio', code: 'layer', name: 'Layer', label: 'Layer', isIcon: false });
            toolbarLayer.addItem(new ModelButton(toolbarLayer.$dom, { click: toolbarLayer.callObserver() }, { code: 'forward', name: 'Forward', label: 'Forward', isIcon: true, }));
            toolbarLayer.addItem(new ModelButton(toolbarLayer.$dom, { click: toolbarLayer.callObserver() }, { code: 'back', name: 'Back', label: 'Back', isIcon: true, }));
            this.addMenuItem(toolbarLayer);
        }

        if (typeof this.observers.listenerTranparency === 'function') {
            const toolbarTranparency = new ModelButtonPad(ulElem, {
                listener: (data) => {
                    this.observers.listenerTranparency(this.dataElement, data);
                },
                click: this.hideSubmenu.bind(this)
            }, { name: 'transparency', code: 'transparency', label: 'Transparency', isIcon: true });

            toolbarTranparency.addItem(new ModelSlider(toolbarTranparency.$dom, { slider: toolbarTranparency.callObserver() }, { name: 'Transparency', min: 0, max: 100, step: 1, valueDefault: style.opacity * 100 }));

            this.addMenuItem(toolbarTranparency);
        }

        if (typeof this.observers.listenerCopy === 'function') {
            const toolbarCopy = new ModelButton(ulElem, {
                click: (data) => {
                    this.hideSubmenu();
                    this.observers.listenerCopy(this.dataElement, data);
                }
            }, { code: 'copy', name: 'Copy', label: 'Copy', isIcon: false });
            this.addMenuItem(toolbarCopy);
        }

        if (typeof this.observers.listenerDelete === 'function') {
            const toolbarDelete = new ModelButton(ulElem, {
                click: (data) => {
                    this.remove();
                    this.observers.listenerDelete(this.dataElement, data);
                }
            }, { code: 'delete', name: 'Delete', label: 'Delete', isIcon: true });
            this.addMenuItem(toolbarDelete);
        }
    }

    render() {
        $(this.where).addClass('menu--active');
        $(this.where).append(this.$dom);
    }

    getHTML() {
        return `<menu class="menu toolbar"><ul class="toolbar__list"></ul></menu>`
    }

    hideSubmenu() {
        this.$dom.find('.toolbar__item--submenuExpanded').removeClass('toolbar__item--submenuExpanded');
    }

    remove() {
        $(this.where).removeClass('menu--active');
        this.$dom.remove();
    }

    detach() {
        $(this.where).removeClass('menu--active');
        this.$dom.detach();
    }
}