import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Sections.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];

// Initialize TodoCounter
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const handleCheck = (isChecked) => {
    todoCounter.updateCompleted(isChecked);
  };

  const handleDelete = (wasCompleted) => {
    if (wasCompleted) {
      todoCounter.updateCompleted(false);
    }
    todoCounter.updateTotal(false);
  };

  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getview();

  return todoElement;
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => generateTodo(item),
  containerSelector: ".todos__list",
});

// call section instances renderItems method to render initial todos
section.renderItems();

// renderer returns a node; Section appends it

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();

// Create popup instance
const addTodoPopupWithForm = new PopupWithForm(
  "#add-todo-popup",
  (formData) => {
    const name = formData.name;
    const dateInput = formData.date;

    // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id, completed: false };

    section.addItem(values);

    todoCounter.updateTotal(true);

    newTodoValidator.resetValidation();
    addTodoPopupWithForm.close();
  }
);

addTodoPopupWithForm.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopupWithForm.open();
});

// Initial items rendered by Section above
