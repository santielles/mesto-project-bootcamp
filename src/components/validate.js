function showInputError(inputField, errorText, settings) {
  // Здесь мы создаем привязку нашего input к его span(error). 'error-' это приставка, то есть в сумме получается имя нашего id у span "error-profile-input-name"
  const errorID = 'error-' + inputField.id;
  // И затем делаем ссылку как на DOM элемент
  const errorElement = document.getElementById(errorID);
  // Тут выводим сообщение в span об ошибке
  errorElement.textContent = errorText;
  inputField.classList.add(settings.invalidInputTextClass);
}

function hideInputError(inputField, settings) {
  // Здесь мы создаем привязку нашего input к его span(error). 'error-' это приставка, то есть в сумме получается имя нашего id у span "error-profile-input-name"
  const errorID = 'error-' + inputField.id;
  // И затем делаем ссылку как на DOM элемент
  const errorElement = document.getElementById(errorID);
  // Тут выводим сообщение - '' (то есть прячем текст об ошибке)
  errorElement.textContent = '';
  inputField.classList.remove(settings.invalidInputTextClass);
}

function checkInputField(inputField, settings) {
  // Если ошибки нет тогда вызываем функцию hideError
  if (inputField.validity.valid) {
    hideInputError(inputField, settings);
    // Иначе вызывается функция showError
  } else {
    showInputError(inputField, inputField.validationMessage, settings);
  }
}

function toggleSubmitButton(isFormValid, buttonSubmit) {
  if (isFormValid) {
    enableSubmitButton(buttonSubmit);
  } else {
    disableSubmitButton(buttonSubmit);
  }
}



function setValidationEventListeners(formElement, settings) {
  const buttonSubmit = formElement.querySelector(settings.buttonSelector);
  const inputList = formElement.querySelectorAll(settings.inputSelector);
  disableSubmitButton(buttonSubmit);
  inputList.forEach((input) => {
    //Слушатель функции checkField, который срабатывает на каждое нажатие (input)
    input.addEventListener('input', () => {
      checkInputField(input, settings);
      const checkIsFormValid = formElement.checkValidity();
      toggleSubmitButton(checkIsFormValid, buttonSubmit);
    })
  });
}

function enableFormsValidation(settings) {
  const formList = document.querySelectorAll(settings.formSelector);
  formList.forEach((formElement) => {
    setValidationEventListeners(formElement, settings);
  });
}

function enableSubmitButton(button) {
  button.disabled = false;
}

function disableSubmitButton(button) {
  button.disabled = true;
}

export { showInputError, hideInputError, checkInputField, toggleSubmitButton, setValidationEventListeners, enableFormsValidation, disableSubmitButton };