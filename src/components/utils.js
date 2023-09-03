/*
Эта функция очищает поля ввода данных 'Наименование' и 'Ссылка' при открытии popup для добавления новой карточки
*/
function resetFormInputs(form) {
  form.reset();
}

function enableSubmitButton(button) {
  button.disabled = false;
}

function disableSubmitButton(button) {
  button.disabled = true;
}

export { resetFormInputs, enableSubmitButton, disableSubmitButton };