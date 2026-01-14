# Simple Todo App

A dynamic and interactive to-do list application that helps users organize and track their tasks efficiently. Built with vanilla JavaScript using object-oriented programming principles and modern ES6+ features.

## Functionality

This to-do application provides the following features:

- **Add New Tasks**: Users can create new to-do items with a task name and optional due date
- **Mark Tasks Complete**: Check off tasks as they're completed with visual feedback
- **Delete Tasks**: Remove tasks from the list when they're no longer needed
- **Dynamic Counter**: Real-time tracking showing "X out of Y completed" tasks
- **Form Validation**: Built-in validation ensures proper input before task creation
- **Responsive Design**: Works seamlessly across different screen sizes
- **Modal Interface**: Clean popup form for adding new tasks
- **Keyboard Navigation**: Close modals with the Escape key
- **Overlay Clicks**: Click outside the modal to close it

## Technology

**Technologies & Techniques:**

- **HTML5**: Semantic markup with template elements for dynamic content
- **CSS3**: BEM methodology for organized and maintainable styling
- **Vanilla JavaScript (ES6+)**:
  - ES6 Modules for code organization
  - Classes and Object-Oriented Programming
  - Arrow functions and modern syntax
  - Template literals
- **Object-Oriented Design Patterns**:
  - Inheritance (PopupWithForm extends Popup)
  - Encapsulation (private methods with underscore convention)
  - Loose coupling between components via callbacks
- **Separation of Concerns**: Each class handles a specific responsibility
- **DOM Manipulation**: Dynamic element creation and event handling
- **Form Validation**: Custom validation with real-time feedback
- **UUID Generation**: Unique identifiers for each to-do item
- **Date Handling**: Timezone-aware date processing

**Project Architecture:**

- `Popup` - Base class for modal functionality
- `PopupWithForm` - Handles form-specific popup behavior
- `Section` - Utility class for rendering items to the DOM
- `Todo` - Individual to-do item component
- `TodoCounter` - Tracks and displays task statistics
- `FormValidator` - Handles form validation logic

## Deployment

This project is deployed on GitHub Pages:

- [https://justinlastra.github.io/se_project_todo-app/](https://justinlastra.github.io/se_project_todo-app/)
