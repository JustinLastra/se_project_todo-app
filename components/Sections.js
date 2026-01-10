class Section {
  constructor({ items = [], renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      const node = this._renderer(item, this._container);
      if (
        node &&
        (node instanceof Element || node instanceof DocumentFragment)
      ) {
        this._container.append(node);
      }
    });
  }

  addItems(items) {
    items.forEach((item) => {
      const node = this._renderer(item, this._container);
      if (
        node &&
        (node instanceof Element || node instanceof DocumentFragment)
      ) {
        this._container.append(node);
      }
    });
  }

  addItem(item, { prepend = false } = {}) {
    const node = this._renderer(item, this._container);
    if (node && (node instanceof Element || node instanceof DocumentFragment)) {
      prepend ? this._container.prepend(node) : this._container.append(node);
    }
  }
}

export default Section;
