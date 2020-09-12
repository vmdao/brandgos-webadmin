export abstract class Component {
  constructor() {
    if (typeof this.onInit === 'function') {
      this.onInit();
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

  abstract onInit(): void;
  abstract onViewed(): void;
  abstract onDestroy(): void;
}
