const deleteButtonsArray = document.querySelectorAll('.card__delete-button');
deleteButtonsArray.forEach(
  deleteButton => {
    deleteButton.addEventListener(
      'click', () => deleteButton.closest('.card').remove()
    );
  }
);