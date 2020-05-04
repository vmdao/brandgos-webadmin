import $ from '../utils/jquery';
import ModelBase from './ModelBase';
import ModelItemFontFamily from './ModelItemFontFamily';
import ModelItemFontSize from './ModelItemFontSize';
const FontSize = [
  10,
  12,
  18,
  20,
  22,
  24,
  28,
  30,
  36,
  48,
  52,
  58,
  62,
  72,
  80,
  90,
  100,
  110,
  120,
  130,
];
const FontList = [
  {
    family: 'Aileron Thin',
    locales: 'en ms-MY sv-SE da-DK nb-NO en-psaccent id-ID de-DE es-ES es-419 es-AR es-CO es-US es-MX fr-FR it-IT ja-JP pl-PL pt-BR tr-TR ro-RO sl-SI hu-HU nl-NL fi-FI cs-CZ sk-SK af-ZA hr-HR pt-PT jv-ID sw-KE tl-PH uz-UZ en-IN'.split(
      ' '
    ),
    url: 'https://static.canva.com/static/webfonts/Aileron-Thin.1.css',
    R: 'Aileron-Thin',
    displayName: 'Aileron Thin',
    H: {
      u: !0,
      bold: !0,
      w: !0,
    },
    i: {
      l: 'https://static.canva.com/static/truetypefonts/Aileron-Thin.ttf',
      u: 'https://static.canva.com/static/truetypefonts/Aileron-ThinItalic.ttf',
      bold: 'https://static.canva.com/static/truetypefonts/Aileron-Light.ttf',
      w:
        'https://static.canva.com/static/truetypefonts/Aileron-LightItalic.ttf',
    },
    o: {
      w: {
        i:
          'https://static.canva.com/static/truetypefonts/Aileron-LightItalic.ttf',
        C: 'Aileron-LightItalic',
        ba: 'https://static.canva.com/static/webfonts/Aileron-LightItalic.otf',
      },
      bold: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Light.ttf',
        C: 'Aileron-Light',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Light.otf',
      },
      u: {
        i:
          'https://static.canva.com/static/truetypefonts/Aileron-ThinItalic.ttf',
        C: 'Aileron-ThinItalic',
        ba: 'https://static.canva.com/static/webfonts/Aileron-ThinItalic.otf',
      },
      l: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Thin.ttf',
        C: 'Aileron-Thin',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Thin.otf',
      },
    },
    O: {
      url: 'https://static.canva.com/static/images/fonts/Aileron.png',
      width: 200,
      height: 35,
    },
    W: {
      url: 'https://static.canva.com/static/images/fonts/Aileron@2x.png',
      width: 275,
      height: 70,
    },
  },
  {
    family: 'Aileron Regular',
    locales: 'en ms-MY sv-SE da-DK nb-NO en-psaccent id-ID de-DE es-ES es-419 es-AR es-CO es-US es-MX fr-FR it-IT pl-PL pt-BR tr-TR ro-RO sl-SI hu-HU nl-NL fi-FI cs-CZ sk-SK af-ZA hr-HR pt-PT jv-ID sw-KE tl-PH uz-UZ en-IN'.split(
      ' '
    ),
    url: 'https://static.canva.com/static/webfonts/Aileron-Regular.css',
    R: 'Aileron Regular',
    displayName: 'Aileron Regular',
    H: {
      u: !0,
      bold: !0,
      w: !0,
    },
    i: {
      l: 'https://static.canva.com/static/truetypefonts/Aileron-Regular.ttf',
      u: 'https://static.canva.com/static/truetypefonts/Aileron-Italic.ttf',
      bold: 'https://static.canva.com/static/truetypefonts/Aileron-Bold.ttf',
      w: 'https://static.canva.com/static/truetypefonts/Aileron-BoldItalic.ttf',
    },
    o: {
      w: {
        i:
          'https://static.canva.com/static/truetypefonts/Aileron-BoldItalic.ttf',
        C: 'Aileron-BoldItalic',
        ba: 'https://static.canva.com/static/webfonts/Aileron-BoldItalic.otf',
      },
      bold: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Bold.ttf',
        C: 'Aileron-Bold',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Bold.otf',
      },
      u: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Italic.ttf',
        C: 'Aileron-Italic',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Italic.otf',
      },
      l: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Regular.ttf',
        C: 'Aileron-Regular',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Regular.otf',
      },
    },
    O: {
      url: 'https://static.canva.com/static/images/fonts/Aileron.png',
      width: 138,
      height: 35,
    },
    W: {
      url: 'https://static.canva.com/static/images/fonts/Aileron@2x.png',
      width: 275,
      height: 70,
    },
  },
  {
    family: 'Aileron Thin',
    locales: 'en ms-MY sv-SE da-DK nb-NO en-psaccent id-ID de-DE es-ES es-419 es-AR es-CO es-US es-MX fr-FR it-IT ja-JP pl-PL pt-BR tr-TR ro-RO sl-SI hu-HU nl-NL fi-FI cs-CZ sk-SK af-ZA hr-HR pt-PT jv-ID sw-KE tl-PH uz-UZ en-IN'.split(
      ' '
    ),
    url: 'https://static.canva.com/static/webfonts/Aileron-Thin.1.css',
    R: 'Aileron-Thin',
    displayName: 'Aileron Thin',
    H: {
      u: !0,
      bold: !0,
      w: !0,
    },
    i: {
      l: 'https://static.canva.com/static/truetypefonts/Aileron-Thin.ttf',
      u: 'https://static.canva.com/static/truetypefonts/Aileron-ThinItalic.ttf',
      bold: 'https://static.canva.com/static/truetypefonts/Aileron-Light.ttf',
      w:
        'https://static.canva.com/static/truetypefonts/Aileron-LightItalic.ttf',
    },
    o: {
      w: {
        i:
          'https://static.canva.com/static/truetypefonts/Aileron-LightItalic.ttf',
        C: 'Aileron-LightItalic',
        ba: 'https://static.canva.com/static/webfonts/Aileron-LightItalic.otf',
      },
      bold: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Light.ttf',
        C: 'Aileron-Light',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Light.otf',
      },
      u: {
        i:
          'https://static.canva.com/static/truetypefonts/Aileron-ThinItalic.ttf',
        C: 'Aileron-ThinItalic',
        ba: 'https://static.canva.com/static/webfonts/Aileron-ThinItalic.otf',
      },
      l: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Thin.ttf',
        C: 'Aileron-Thin',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Thin.otf',
      },
    },
    O: {
      url: 'https://static.canva.com/static/images/fonts/Aileron-Thin.png',
      width: 99,
      height: 35,
    },
    W: {
      url: 'https://static.canva.com/static/images/fonts/Aileron-Thin@2x.png',
      width: 197,
      height: 70,
    },
  },
  {
    family: 'Aileron Regular',
    locales: 'en ms-MY sv-SE da-DK nb-NO en-psaccent id-ID de-DE es-ES es-419 es-AR es-CO es-US es-MX fr-FR it-IT pl-PL pt-BR tr-TR ro-RO sl-SI hu-HU nl-NL fi-FI cs-CZ sk-SK af-ZA hr-HR pt-PT jv-ID sw-KE tl-PH uz-UZ en-IN'.split(
      ' '
    ),
    url: 'https://static.canva.com/static/webfonts/Aileron-Regular.css',
    R: 'Aileron Regular',
    displayName: 'Aileron Regular',
    H: {
      u: !0,
      bold: !0,
      w: !0,
    },
    i: {
      l: 'https://static.canva.com/static/truetypefonts/Aileron-Regular.ttf',
      u: 'https://static.canva.com/static/truetypefonts/Aileron-Italic.ttf',
      bold: 'https://static.canva.com/static/truetypefonts/Aileron-Bold.ttf',
      w: 'https://static.canva.com/static/truetypefonts/Aileron-BoldItalic.ttf',
    },
    o: {
      w: {
        i:
          'https://static.canva.com/static/truetypefonts/Aileron-BoldItalic.ttf',
        C: 'Aileron-BoldItalic',
        ba: 'https://static.canva.com/static/webfonts/Aileron-BoldItalic.otf',
      },
      bold: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Bold.ttf',
        C: 'Aileron-Bold',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Bold.otf',
      },
      u: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Italic.ttf',
        C: 'Aileron-Italic',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Italic.otf',
      },
      l: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Regular.ttf',
        C: 'Aileron-Regular',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Regular.otf',
      },
    },
    O: {
      url: 'https://static.canva.com/static/images/fonts/Aileron.png',
      width: 138,
      height: 35,
    },
    W: {
      url: 'https://static.canva.com/static/images/fonts/Aileron@2x.png',
      width: 275,
      height: 70,
    },
  },
  {
    family: 'Aileron Thin',
    locales: 'en ms-MY sv-SE da-DK nb-NO en-psaccent id-ID de-DE es-ES es-419 es-AR es-CO es-US es-MX fr-FR it-IT ja-JP pl-PL pt-BR tr-TR ro-RO sl-SI hu-HU nl-NL fi-FI cs-CZ sk-SK af-ZA hr-HR pt-PT jv-ID sw-KE tl-PH uz-UZ en-IN'.split(
      ' '
    ),
    url: 'https://static.canva.com/static/webfonts/Aileron-Thin.1.css',
    R: 'Aileron-Thin',
    displayName: 'Aileron Thin',
    H: {
      u: !0,
      bold: !0,
      w: !0,
    },
    i: {
      l: 'https://static.canva.com/static/truetypefonts/Aileron-Thin.ttf',
      u: 'https://static.canva.com/static/truetypefonts/Aileron-ThinItalic.ttf',
      bold: 'https://static.canva.com/static/truetypefonts/Aileron-Light.ttf',
      w:
        'https://static.canva.com/static/truetypefonts/Aileron-LightItalic.ttf',
    },
    o: {
      w: {
        i:
          'https://static.canva.com/static/truetypefonts/Aileron-LightItalic.ttf',
        C: 'Aileron-LightItalic',
        ba: 'https://static.canva.com/static/webfonts/Aileron-LightItalic.otf',
      },
      bold: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Light.ttf',
        C: 'Aileron-Light',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Light.otf',
      },
      u: {
        i:
          'https://static.canva.com/static/truetypefonts/Aileron-ThinItalic.ttf',
        C: 'Aileron-ThinItalic',
        ba: 'https://static.canva.com/static/webfonts/Aileron-ThinItalic.otf',
      },
      l: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Thin.ttf',
        C: 'Aileron-Thin',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Thin.otf',
      },
    },
    O: {
      url: 'https://static.canva.com/static/images/fonts/Aileron-Thin.png',
      width: 99,
      height: 35,
    },
    W: {
      url: 'https://static.canva.com/static/images/fonts/Aileron-Thin@2x.png',
      width: 197,
      height: 70,
    },
  },
  {
    family: 'Aileron Regular',
    locales: 'en ms-MY sv-SE da-DK nb-NO en-psaccent id-ID de-DE es-ES es-419 es-AR es-CO es-US es-MX fr-FR it-IT pl-PL pt-BR tr-TR ro-RO sl-SI hu-HU nl-NL fi-FI cs-CZ sk-SK af-ZA hr-HR pt-PT jv-ID sw-KE tl-PH uz-UZ en-IN'.split(
      ' '
    ),
    url: 'https://static.canva.com/static/webfonts/Aileron-Regular.css',
    R: 'Aileron Regular',
    displayName: 'Aileron Regular',
    H: {
      u: !0,
      bold: !0,
      w: !0,
    },
    i: {
      l: 'https://static.canva.com/static/truetypefonts/Aileron-Regular.ttf',
      u: 'https://static.canva.com/static/truetypefonts/Aileron-Italic.ttf',
      bold: 'https://static.canva.com/static/truetypefonts/Aileron-Bold.ttf',
      w: 'https://static.canva.com/static/truetypefonts/Aileron-BoldItalic.ttf',
    },
    o: {
      w: {
        i:
          'https://static.canva.com/static/truetypefonts/Aileron-BoldItalic.ttf',
        C: 'Aileron-BoldItalic',
        ba: 'https://static.canva.com/static/webfonts/Aileron-BoldItalic.otf',
      },
      bold: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Bold.ttf',
        C: 'Aileron-Bold',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Bold.otf',
      },
      u: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Italic.ttf',
        C: 'Aileron-Italic',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Italic.otf',
      },
      l: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Regular.ttf',
        C: 'Aileron-Regular',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Regular.otf',
      },
    },
    O: {
      url: 'https://static.canva.com/static/images/fonts/Aileron.png',
      width: 138,
      height: 35,
    },
    W: {
      url: 'https://static.canva.com/static/images/fonts/Aileron@2x.png',
      width: 275,
      height: 70,
    },
  },
  {
    family: 'Aileron Thin',
    locales: 'en ms-MY sv-SE da-DK nb-NO en-psaccent id-ID de-DE es-ES es-419 es-AR es-CO es-US es-MX fr-FR it-IT ja-JP pl-PL pt-BR tr-TR ro-RO sl-SI hu-HU nl-NL fi-FI cs-CZ sk-SK af-ZA hr-HR pt-PT jv-ID sw-KE tl-PH uz-UZ en-IN'.split(
      ' '
    ),
    url: 'https://static.canva.com/static/webfonts/Aileron-Thin.1.css',
    R: 'Aileron-Thin',
    displayName: 'Aileron Thin',
    H: {
      u: !0,
      bold: !0,
      w: !0,
    },
    i: {
      l: 'https://static.canva.com/static/truetypefonts/Aileron-Thin.ttf',
      u: 'https://static.canva.com/static/truetypefonts/Aileron-ThinItalic.ttf',
      bold: 'https://static.canva.com/static/truetypefonts/Aileron-Light.ttf',
      w:
        'https://static.canva.com/static/truetypefonts/Aileron-LightItalic.ttf',
    },
    o: {
      w: {
        i:
          'https://static.canva.com/static/truetypefonts/Aileron-LightItalic.ttf',
        C: 'Aileron-LightItalic',
        ba: 'https://static.canva.com/static/webfonts/Aileron-LightItalic.otf',
      },
      bold: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Light.ttf',
        C: 'Aileron-Light',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Light.otf',
      },
      u: {
        i:
          'https://static.canva.com/static/truetypefonts/Aileron-ThinItalic.ttf',
        C: 'Aileron-ThinItalic',
        ba: 'https://static.canva.com/static/webfonts/Aileron-ThinItalic.otf',
      },
      l: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Thin.ttf',
        C: 'Aileron-Thin',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Thin.otf',
      },
    },
    O: {
      url: 'https://static.canva.com/static/images/fonts/Aileron-Thin.png',
      width: 99,
      height: 35,
    },
    W: {
      url: 'https://static.canva.com/static/images/fonts/Aileron-Thin@2x.png',
      width: 197,
      height: 70,
    },
  },
  {
    family: 'Aileron Regular',
    locales: 'en ms-MY sv-SE da-DK nb-NO en-psaccent id-ID de-DE es-ES es-419 es-AR es-CO es-US es-MX fr-FR it-IT pl-PL pt-BR tr-TR ro-RO sl-SI hu-HU nl-NL fi-FI cs-CZ sk-SK af-ZA hr-HR pt-PT jv-ID sw-KE tl-PH uz-UZ en-IN'.split(
      ' '
    ),
    url: 'https://static.canva.com/static/webfonts/Aileron-Regular.css',
    R: 'Aileron Regular',
    displayName: 'Aileron Regular',
    H: {
      u: !0,
      bold: !0,
      w: !0,
    },
    i: {
      l: 'https://static.canva.com/static/truetypefonts/Aileron-Regular.ttf',
      u: 'https://static.canva.com/static/truetypefonts/Aileron-Italic.ttf',
      bold: 'https://static.canva.com/static/truetypefonts/Aileron-Bold.ttf',
      w: 'https://static.canva.com/static/truetypefonts/Aileron-BoldItalic.ttf',
    },
    o: {
      w: {
        i:
          'https://static.canva.com/static/truetypefonts/Aileron-BoldItalic.ttf',
        C: 'Aileron-BoldItalic',
        ba: 'https://static.canva.com/static/webfonts/Aileron-BoldItalic.otf',
      },
      bold: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Bold.ttf',
        C: 'Aileron-Bold',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Bold.otf',
      },
      u: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Italic.ttf',
        C: 'Aileron-Italic',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Italic.otf',
      },
      l: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Regular.ttf',
        C: 'Aileron-Regular',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Regular.otf',
      },
    },
    O: {
      url: 'https://static.canva.com/static/images/fonts/Aileron.png',
      width: 138,
      height: 35,
    },
    W: {
      url: 'https://static.canva.com/static/images/fonts/Aileron@2x.png',
      width: 275,
      height: 70,
    },
  },
  {
    family: 'Aileron Thin',
    locales: 'en ms-MY sv-SE da-DK nb-NO en-psaccent id-ID de-DE es-ES es-419 es-AR es-CO es-US es-MX fr-FR it-IT ja-JP pl-PL pt-BR tr-TR ro-RO sl-SI hu-HU nl-NL fi-FI cs-CZ sk-SK af-ZA hr-HR pt-PT jv-ID sw-KE tl-PH uz-UZ en-IN'.split(
      ' '
    ),
    url: 'https://static.canva.com/static/webfonts/Aileron-Thin.1.css',
    R: 'Aileron-Thin',
    displayName: 'Aileron Thin',
    H: {
      u: !0,
      bold: !0,
      w: !0,
    },
    i: {
      l: 'https://static.canva.com/static/truetypefonts/Aileron-Thin.ttf',
      u: 'https://static.canva.com/static/truetypefonts/Aileron-ThinItalic.ttf',
      bold: 'https://static.canva.com/static/truetypefonts/Aileron-Light.ttf',
      w:
        'https://static.canva.com/static/truetypefonts/Aileron-LightItalic.ttf',
    },
    o: {
      w: {
        i:
          'https://static.canva.com/static/truetypefonts/Aileron-LightItalic.ttf',
        C: 'Aileron-LightItalic',
        ba: 'https://static.canva.com/static/webfonts/Aileron-LightItalic.otf',
      },
      bold: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Light.ttf',
        C: 'Aileron-Light',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Light.otf',
      },
      u: {
        i:
          'https://static.canva.com/static/truetypefonts/Aileron-ThinItalic.ttf',
        C: 'Aileron-ThinItalic',
        ba: 'https://static.canva.com/static/webfonts/Aileron-ThinItalic.otf',
      },
      l: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Thin.ttf',
        C: 'Aileron-Thin',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Thin.otf',
      },
    },
    O: {
      url: 'https://static.canva.com/static/images/fonts/Aileron-Thin.png',
      width: 99,
      height: 35,
    },
    W: {
      url: 'https://static.canva.com/static/images/fonts/Aileron-Thin@2x.png',
      width: 197,
      height: 70,
    },
  },
  {
    family: 'Aileron Regular',
    locales: 'en ms-MY sv-SE da-DK nb-NO en-psaccent id-ID de-DE es-ES es-419 es-AR es-CO es-US es-MX fr-FR it-IT pl-PL pt-BR tr-TR ro-RO sl-SI hu-HU nl-NL fi-FI cs-CZ sk-SK af-ZA hr-HR pt-PT jv-ID sw-KE tl-PH uz-UZ en-IN'.split(
      ' '
    ),
    url: 'https://static.canva.com/static/webfonts/Aileron-Regular.css',
    R: 'Aileron Regular',
    displayName: 'Aileron Regular',
    H: {
      u: !0,
      bold: !0,
      w: !0,
    },
    i: {
      l: 'https://static.canva.com/static/truetypefonts/Aileron-Regular.ttf',
      u: 'https://static.canva.com/static/truetypefonts/Aileron-Italic.ttf',
      bold: 'https://static.canva.com/static/truetypefonts/Aileron-Bold.ttf',
      w: 'https://static.canva.com/static/truetypefonts/Aileron-BoldItalic.ttf',
    },
    o: {
      w: {
        i:
          'https://static.canva.com/static/truetypefonts/Aileron-BoldItalic.ttf',
        C: 'Aileron-BoldItalic',
        ba: 'https://static.canva.com/static/webfonts/Aileron-BoldItalic.otf',
      },
      bold: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Bold.ttf',
        C: 'Aileron-Bold',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Bold.otf',
      },
      u: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Italic.ttf',
        C: 'Aileron-Italic',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Italic.otf',
      },
      l: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Regular.ttf',
        C: 'Aileron-Regular',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Regular.otf',
      },
    },
    O: {
      url: 'https://static.canva.com/static/images/fonts/Aileron.png',
      width: 138,
      height: 35,
    },
    W: {
      url: 'https://static.canva.com/static/images/fonts/Aileron@2x.png',
      width: 275,
      height: 70,
    },
  },
  {
    family: 'Aileron Thin',
    locales: 'en ms-MY sv-SE da-DK nb-NO en-psaccent id-ID de-DE es-ES es-419 es-AR es-CO es-US es-MX fr-FR it-IT ja-JP pl-PL pt-BR tr-TR ro-RO sl-SI hu-HU nl-NL fi-FI cs-CZ sk-SK af-ZA hr-HR pt-PT jv-ID sw-KE tl-PH uz-UZ en-IN'.split(
      ' '
    ),
    url: 'https://static.canva.com/static/webfonts/Aileron-Thin.1.css',
    R: 'Aileron-Thin',
    displayName: 'Aileron Thin',
    H: {
      u: !0,
      bold: !0,
      w: !0,
    },
    i: {
      l: 'https://static.canva.com/static/truetypefonts/Aileron-Thin.ttf',
      u: 'https://static.canva.com/static/truetypefonts/Aileron-ThinItalic.ttf',
      bold: 'https://static.canva.com/static/truetypefonts/Aileron-Light.ttf',
      w:
        'https://static.canva.com/static/truetypefonts/Aileron-LightItalic.ttf',
    },
    o: {
      w: {
        i:
          'https://static.canva.com/static/truetypefonts/Aileron-LightItalic.ttf',
        C: 'Aileron-LightItalic',
        ba: 'https://static.canva.com/static/webfonts/Aileron-LightItalic.otf',
      },
      bold: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Light.ttf',
        C: 'Aileron-Light',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Light.otf',
      },
      u: {
        i:
          'https://static.canva.com/static/truetypefonts/Aileron-ThinItalic.ttf',
        C: 'Aileron-ThinItalic',
        ba: 'https://static.canva.com/static/webfonts/Aileron-ThinItalic.otf',
      },
      l: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Thin.ttf',
        C: 'Aileron-Thin',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Thin.otf',
      },
    },
    O: {
      url: 'https://static.canva.com/static/images/fonts/Aileron-Thin.png',
      width: 99,
      height: 35,
    },
    W: {
      url: 'https://static.canva.com/static/images/fonts/Aileron-Thin@2x.png',
      width: 197,
      height: 70,
    },
  },
  {
    family: 'Aileron Regular',
    locales: 'en ms-MY sv-SE da-DK nb-NO en-psaccent id-ID de-DE es-ES es-419 es-AR es-CO es-US es-MX fr-FR it-IT pl-PL pt-BR tr-TR ro-RO sl-SI hu-HU nl-NL fi-FI cs-CZ sk-SK af-ZA hr-HR pt-PT jv-ID sw-KE tl-PH uz-UZ en-IN'.split(
      ' '
    ),
    url: 'https://static.canva.com/static/webfonts/Aileron-Regular.css',
    R: 'Aileron Regular',
    displayName: 'Aileron Regular',
    H: {
      u: !0,
      bold: !0,
      w: !0,
    },
    i: {
      l: 'https://static.canva.com/static/truetypefonts/Aileron-Regular.ttf',
      u: 'https://static.canva.com/static/truetypefonts/Aileron-Italic.ttf',
      bold: 'https://static.canva.com/static/truetypefonts/Aileron-Bold.ttf',
      w: 'https://static.canva.com/static/truetypefonts/Aileron-BoldItalic.ttf',
    },
    o: {
      w: {
        i:
          'https://static.canva.com/static/truetypefonts/Aileron-BoldItalic.ttf',
        C: 'Aileron-BoldItalic',
        ba: 'https://static.canva.com/static/webfonts/Aileron-BoldItalic.otf',
      },
      bold: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Bold.ttf',
        C: 'Aileron-Bold',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Bold.otf',
      },
      u: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Italic.ttf',
        C: 'Aileron-Italic',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Italic.otf',
      },
      l: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Regular.ttf',
        C: 'Aileron-Regular',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Regular.otf',
      },
    },
    O: {
      url: 'https://static.canva.com/static/images/fonts/Aileron.png',
      width: 138,
      height: 35,
    },
    W: {
      url: 'https://static.canva.com/static/images/fonts/Aileron@2x.png',
      width: 275,
      height: 70,
    },
  },
  {
    family: 'Aileron Thin',
    locales: 'en ms-MY sv-SE da-DK nb-NO en-psaccent id-ID de-DE es-ES es-419 es-AR es-CO es-US es-MX fr-FR it-IT ja-JP pl-PL pt-BR tr-TR ro-RO sl-SI hu-HU nl-NL fi-FI cs-CZ sk-SK af-ZA hr-HR pt-PT jv-ID sw-KE tl-PH uz-UZ en-IN'.split(
      ' '
    ),
    url: 'https://static.canva.com/static/webfonts/Aileron-Thin.1.css',
    R: 'Aileron-Thin',
    displayName: 'Aileron Thin',
    H: {
      u: !0,
      bold: !0,
      w: !0,
    },
    i: {
      l: 'https://static.canva.com/static/truetypefonts/Aileron-Thin.ttf',
      u: 'https://static.canva.com/static/truetypefonts/Aileron-ThinItalic.ttf',
      bold: 'https://static.canva.com/static/truetypefonts/Aileron-Light.ttf',
      w:
        'https://static.canva.com/static/truetypefonts/Aileron-LightItalic.ttf',
    },
    o: {
      w: {
        i:
          'https://static.canva.com/static/truetypefonts/Aileron-LightItalic.ttf',
        C: 'Aileron-LightItalic',
        ba: 'https://static.canva.com/static/webfonts/Aileron-LightItalic.otf',
      },
      bold: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Light.ttf',
        C: 'Aileron-Light',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Light.otf',
      },
      u: {
        i:
          'https://static.canva.com/static/truetypefonts/Aileron-ThinItalic.ttf',
        C: 'Aileron-ThinItalic',
        ba: 'https://static.canva.com/static/webfonts/Aileron-ThinItalic.otf',
      },
      l: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Thin.ttf',
        C: 'Aileron-Thin',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Thin.otf',
      },
    },
    O: {
      url: 'https://static.canva.com/static/images/fonts/Aileron-Thin.png',
      width: 99,
      height: 35,
    },
    W: {
      url: 'https://static.canva.com/static/images/fonts/Aileron-Thin@2x.png',
      width: 197,
      height: 70,
    },
  },
  {
    family: 'Aileron Regular',
    locales: 'en ms-MY sv-SE da-DK nb-NO en-psaccent id-ID de-DE es-ES es-419 es-AR es-CO es-US es-MX fr-FR it-IT pl-PL pt-BR tr-TR ro-RO sl-SI hu-HU nl-NL fi-FI cs-CZ sk-SK af-ZA hr-HR pt-PT jv-ID sw-KE tl-PH uz-UZ en-IN'.split(
      ' '
    ),
    url: 'https://static.canva.com/static/webfonts/Aileron-Regular.css',
    R: 'Aileron Regular',
    displayName: 'Aileron Regular',
    H: {
      u: !0,
      bold: !0,
      w: !0,
    },
    i: {
      l: 'https://static.canva.com/static/truetypefonts/Aileron-Regular.ttf',
      u: 'https://static.canva.com/static/truetypefonts/Aileron-Italic.ttf',
      bold: 'https://static.canva.com/static/truetypefonts/Aileron-Bold.ttf',
      w: 'https://static.canva.com/static/truetypefonts/Aileron-BoldItalic.ttf',
    },
    o: {
      w: {
        i:
          'https://static.canva.com/static/truetypefonts/Aileron-BoldItalic.ttf',
        C: 'Aileron-BoldItalic',
        ba: 'https://static.canva.com/static/webfonts/Aileron-BoldItalic.otf',
      },
      bold: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Bold.ttf',
        C: 'Aileron-Bold',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Bold.otf',
      },
      u: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Italic.ttf',
        C: 'Aileron-Italic',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Italic.otf',
      },
      l: {
        i: 'https://static.canva.com/static/truetypefonts/Aileron-Regular.ttf',
        C: 'Aileron-Regular',
        ba: 'https://static.canva.com/static/webfonts/Aileron-Regular.otf',
      },
    },
    O: {
      url:
        'https://static.canva.com/static/images/fonts/Alegreya-Small-Caps.png',
      width: 138,
      height: 35,
    },
    W: {
      url: 'https://static.canva.com/static/images/fonts/Aileron@2x.png',
      width: 275,
      height: 70,
    },
  },
];

export default class ModelList extends ModelBase {
  constructor(
    where,
    observers = {},
    { type, code, name, html, id, isIcon, label, kind }
  ) {
    super(where, observers);
    this.listener = observers.listener || '';
    this.click = observers.click || '';
    this.name = name;
    this.code = code;
    this.kind = kind;
    this.type = type || ''; // radio || '';
    this.isIcon = isIcon || !1;
    this.label = label;
    this.items = [];
    this.handleClick = this.handleClick.bind(this);
    this.handleClickOn = this.handleClickOn.bind(this);
    this.createHTML();
  }

  createHTML() {
    const boxWrapper = `<li class="toolbar__item toolbar__item--submenu ${
      this.code ? 'toolbar__item--' + this.code : ''
    }">
        <button class="toolbar__button ${
          this.code ? 'toolbar__button--' + this.code : ''
        } ${this.isIcon ? 'toolbar__button--icon' : ''}">
        <span class="toolbar__label toolbar__label--left">${
          this.name
        }</span></button><menu class="menuList">
        <ul class="menuList__inner"></ul></menu></li>`;
    this.setHTML(boxWrapper);
    this.setDom($(boxWrapper));
    this.setEvent();
    this.addBatchItem();
  }

  setEvent() {
    // this.$dom.find('.button-expanded').clickOutsideThisElement(this.handleClickOn);
    this.$dom.find('.toolbar__button').on('click', this.handleClick);
  }

  handleClickOn(event) {
    console.log(123, event);
  }

  handleClick(event) {
    this.click();
    this.$dom.toggleClass('toolbar__item--submenuExpanded');
  }

  callObserver() {
    return (data) => {
      this.eventByType();
      this.listener(data);
    };
  }

  eventByType() {
    if (this.type === 'radio') {
      this.items.forEach((item) => {
        item.updateActive(false);
      });
    }
  }

  addBatchItem() {
    if (this.kind === 'fontFamily') {
      FontList.forEach((font) => {
        this.addItem(
          new ModelItemFontFamily(
            this.$dom,
            { click: this.callObserver() },
            {
              code: 'fontFamily',
              name: font.fontFamily,
              label: font.displayName,
              isIcon: true,
              data: font,
            }
          )
        );
      });
    } else {
      FontSize.forEach((size) => {
        this.addItem(
          new ModelItemFontSize(
            this.$dom,
            { click: this.callObserver() },
            {
              isActive: size === 28 ? true : false,
              code: 'fontSize',
              name: size,
              label: size + 'px',
              isIcon: false,
              data: size,
            }
          )
        );
      });
    }
  }
}
