class FormValidator {
  constructor(settings, formEl) {
    this._settings = settings;
    this._formEl = formEl;
    this._inputList = [];
    this._buttonElement = null;
  }

  _showInputError(inputElement) {
    const errorElement = this._formEl.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._settings.inputErrorClass);
    if (errorElement) {
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._settings.errorClass);
    }
  }

  _hideInputError(inputElement) {
    const errorElement = this._formEl.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._settings.inputErrorClass);
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove(this._settings.errorClass);
    }
  }

  resetValidation() {
    if (!this._formEl) return;
    this._formEl.reset();
    this._toggleButtonState();
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    if (!this._buttonElement) return;
    const hasInvalid = this._inputList.some((input) => !input.validity.valid);
    this._buttonElement.classList.toggle(this._settings.inactiveButtonClass, hasInvalid);
    this._buttonElement.disabled = hasInvalid;
  }

  enableValidation() {
    if (!this._formEl) return;
    this._inputList = Array.from(this._formEl.querySelectorAll(this._settings.inputSelector));
    this._buttonElement = this._formEl.querySelector(this._settings.submitButtonSelector);

    // Initialize
    this._toggleButtonState();

    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });

    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }
}

export default FormValidator;
