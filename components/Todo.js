class todo {
  constructor(data, selector) {
    this._data = data;
    this.templateElement = document.querySelector(selector);
  }
  getview() {
    const todoElement = this.templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = todoElement.querySelector(".todo__name");
    const todoCheckboxEl = todoElement.querySelector(".todo__completed");
    const todoLabel = todoElement.querySelector(".todo__label");
    const todoDate = todoElement.querySelector(".todo__date");
    const todoDeleteBtn = todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;
    todoCheckboxEl.checked = Boolean(this._data.completed);

    // Ensure there is an id for label/for pairing
    const id = this._data.id ?? Math.random().toString(36).slice(2, 9);
    todoCheckboxEl.id = `todo-${id}`;
    todoLabel.setAttribute("for", `todo-${id}`);

    // Format due date if present
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    // Wire delete behavior
    todoDeleteBtn.addEventListener("click", () => {
      todoElement.remove();
    });

    return todoElement;
  }
}
export default todo;
