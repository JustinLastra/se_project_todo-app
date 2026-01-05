class todo {
  constructor(data, selector) {
    this._data = data;
    this.templateElement = document.querySelector(selector);
  }

  _seteventListeners() {
    const todoCheckboxEl = todoElement.querySelector(".todo__completed");
    if (!todoCheckboxEl) return;
    todoCheckboxEl.addEventListener("change", (evt) => {
      this._data.completed = evt.target.checked;
      todoElement.classList.toggle("todo_completed", this._data.completed);
      
    });
  }
  _generateCheckboxel() {
    const todoCheckboxEl = todoElement.querySelector(".todo__completed");
    const todoLabel = todoElement.querySelector(".todo__label");
    todoCheckboxEl.checked = Boolean(this._data.completed);
    const id = this._data.id ?? Math.random().toString(36).slice(2, 9);
    this._data.id = id;
    todoCheckboxEl.id = `todo-${id}`;
    todoLabel.setAttribute("for", `todo-${id}`);
  }
  getview() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    this._todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    this._generateCheckboxel(todoElement);
    this._seteventListeners(todoElement);

    todoNameEl.textContent = this._data.name;
    todoCheckboxEl.checked = Boolean(this._data.completed);

    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    todoDeleteBtn.addEventListener("click", () => {
      todoElement.remove();
    });

    return todoElement;
  }
}
export default todo;
