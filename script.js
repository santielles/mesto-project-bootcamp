// Delete Card Button
const deleteButtonsArray = document.querySelectorAll('.card__delete-button');
deleteButtonsArray.forEach(
  deleteButton => {
    deleteButton.addEventListener('click', () => deleteButton.closest('.card').remove());
  }
);

// Popup
const popup = document.querySelector('.popup');
const editProfileButton = document.querySelector('.profile__edit-button');
const closePopupButton = document.querySelector('.popup__close-button');
editProfileButton.addEventListener('click', () => popup.classList.add('popup_opened'));
closePopupButton.addEventListener('click', () => popup.classList.remove('popup_opened'));

// Like Button
const likeButtonArray = document.querySelectorAll('.card__like');
likeButtonArray.forEach(
  likeButton => {
    likeButton.addEventListener('click', () => {
      if (likeButton.classList.contains('card__like_mode-active')) {
        likeButton.classList.remove('card__like_mode-active')
      } else {
        likeButton.classList.add('card__like_mode-active')
      };
    });
  }
)