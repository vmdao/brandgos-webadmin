export const EDITOR_PROPERTIES = [
  'memory',
  'eventBus',
  'keyManager',
  'moveableData',
  'moveableManager',
  'historyManager',
  'console',
];
export const PREFIX = 'scena-';
export const DATA_ELEMENT_ID = 'data-element-id';
export const DATA_ELEMENT = 'data-element';
export const DATA_PAGE_ID = 'data-page-id';

export const userAgent =
  ((typeof navigator !== 'undefined' && navigator) || ({} as any)).userAgent ||
  '';
export const isMacintosh =
  userAgent.indexOf('Macintosh') >= 0 ||
  userAgent.indexOf('iPad') >= 0 ||
  userAgent.indexOf('iPhone') >= 0;
