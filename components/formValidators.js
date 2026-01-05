class FormValidator {
  constructor(settings, formEl) {
    this._settings = settings;
    this._formEl = formEl;
  }

  _showInputError(inputElement) {
    const errorElement = this._formEl.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._settings.inputErrorClass);
    if (errorElement) {
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._settings.errorClass);
    }
  }

  _hideInputError(inputElement) {
    const errorElement = this._formEl.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._settings.inputErrorClass);
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove(this._settings.errorClass);
    }
  }

  resetValidation() {
    this._formEl.reset(); // reset the form
    this._toggleButtonState(); // this will disable the button after resetting
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
    this._buttonElement.classList.toggle(
      this._settings.inactiveButtonClass,
      hasInvalid
    );
    this._buttonElement.disabled = hasInvalid;
  }

  enableValidation() {
    if (!this._formEl) return;
    const inputList = Array.from(
      this._formEl.querySelectorAll(this._settings.inputSelector)
    );
    const buttonElement = this._formEl.querySelector(
      this._settings.submitButtonSelector
    );

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState(inputList, buttonElement);
      });
    });

    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }
}

export default formValidator;
