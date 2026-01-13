class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._data = data;
    this._template = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _generateCheckbox(todoElement) {
    const todoCheckboxEl = todoElement.querySelector(".todo__completed");
    const todoLabel = todoElement.querySelector(".todo__label");
    todoCheckboxEl.checked = Boolean(this._data.completed);
    const id = this._data.id ?? Math.random().toString(36).slice(2, 9);
    this._data.id = id;
    todoCheckboxEl.id = `todo-${id}`;
    todoLabel.setAttribute("for", `todo-${id}`);
  }

  _setEventListeners(todoElement) {
    const todoCheckboxEl = todoElement.querySelector(".todo__completed");
    if (todoCheckboxEl) {
      todoCheckboxEl.addEventListener("change", (evt) => {
        this._data.completed = evt.target.checked;
        todoElement.classList.toggle("todo_completed", this._data.completed);

        if (this._handleCheck) {
          this._handleCheck(this._data.completed);
        }
      });
    }

    const todoDeleteBtn = todoElement.querySelector(".todo__delete-btn");
    if (todoDeleteBtn) {
      todoDeleteBtn.addEventListener("click", () => {
        if (this._handleDelete) {
          this._handleDelete(this._data.completed);
        }
        todoElement.remove();
      });
    }
  }

  getview() {
    const todoElement = this._template.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = todoElement.querySelector(".todo__name");
    const todoCheckboxEl = todoElement.querySelector(".todo__completed");
    const todoDate = todoElement.querySelector(".todo__date");

    // Apply content & attributes
    todoNameEl.textContent = this._data.name || "";
    this._generateCheckbox(todoElement);

    // Format due date if present
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    this._setEventListeners(todoElement);

    return todoElement;
  }
}

export default Todo;
