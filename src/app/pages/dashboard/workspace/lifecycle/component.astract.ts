export abstract class Component {
  constructor(params) {
    if (typeof this.onInit === 'function') {
      this.onInit(params);
    }
  }
  render(selector?: any): void {
    if (typeof this.onViewed === 'function') {
      this.onViewed();
    }
  }

  destroy(): void {
    if (typeof this.destroy === 'function') {
      this.destroy();
    }
  }

  abstract onInit(params?: any): void;
  abstract onViewed(): void;
  abstract onDestroy(): void;
}
