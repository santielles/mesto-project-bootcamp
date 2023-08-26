const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cards = document.querySelector('.cards');
const template = document.getElementById('template');
const templateCard = template.content.querySelector('.card');

// Create new card
initialCards.forEach(cardElement => {
  const newCard = templateCard.cloneNode(true);
  const cardImage = newCard.querySelector(".card__image");
  const cardTitle = newCard.querySelector(".card__title");
  cardImage.src = cardElement.link;
  cardImage.alt = cardElement.name;
  cardTitle.textContent = cardElement.name;
  cards.prepend(newCard);
});

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