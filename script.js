const deleteButtonsArray = document.querySelectorAll('.card__delete-button');
deleteButtonsArray.forEach(
  deleteButton => {
    deleteButton.addEventListener('click', () => deleteButton.closest('.card').remove());
  }
);

const popup = document.querySelector('.popup');
const editProfileButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');
editProfileButton.addEventListener('click', () => popup.classList.add('popup_opened'));
closePopupButton.addEventListener('click', () => popup.classList.remove('popup_opened'));

