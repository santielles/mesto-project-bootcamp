const deleteButtonsArray = document.querySelectorAll('.element__delete-button');
deleteButtonsArray.forEach(
  deleteButton => {
    deleteButton.addEventListener(
      'click', () => deleteButton.closest('.element').remove()
    );
  }
);