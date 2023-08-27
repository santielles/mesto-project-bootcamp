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

// Profile
// Ссылка на DOM элемент профиля
const profile = document.querySelector('.profile');
// Ссылка на DOM элемент для отображения имени в профиле
const profileName = profile.querySelector('.profile__name')
// Ссылка на DOM элемент для отображения описания в профиле
const profileAbout = profile.querySelector('.profile__about')
// Ссылка на DOM элемент кнопки для редактирования профиля
const editProfileButton = profile.querySelector('.profile__edit-button');
// Ссылка на DOM элемент кнопки для добавления новой карточки
const newCardButton = profile.querySelector('.profile__add-button');

// Profile Popup
// Ссылка на DOM элемент 'edit-profile-popup' редактирования профиля
const profilePopup = document.getElementById('edit-profile-popup');
// Ссылка на DOM элемент кнопки закрытия 'edit-profile-popup' редактирования профиля
const closeProfileButton = profilePopup.querySelector('.popup__close-button');
// Ссылка на DOM элемент формы редактирования профиля
const profileEditForm = profilePopup.querySelector('.popup__form');
// Ссылка на DOM элемент поля редактирования имени в форме редактирования профиля
const profileEditName = document.getElementById('edit-profile-name');
// Ссылка на DOM элемент поля редактирования описания в форме редактирования профиля
const profileEditJob = document.getElementById('edit-profile-job');

// New card Popup
// Ссылка на DOM элемент 'new-card-popup' добавления новой карточки
const newCardPopup = document.getElementById('new-card-popup');
// Ссылка на DOM элемент кнопки закрытия 'new-card-popup' добавления новой карточки
const closeNewCardPopupButton = newCardPopup.querySelector('.popup__close-button');
// Ссылка на DOM элемент формы добавления новой карточки
const newCardForm = newCardPopup.querySelector('.popup__form');
// Ссылка на DOM элемент поля ввода названия в форме добавления новой карточки
const newCardAddTitle = document.getElementById('add-title');
// Ссылка на DOM элемент поля ввода ссылки в форме добавления новой карточки
const newCardAddLink = document.getElementById('add-link');

const cards = document.querySelector('.cards');
const template = document.getElementById('template');
const templateCard = template.content.querySelector('.card');

/*
Эта функция закрывает (делает невидимым) переданный в неё 'popup', удаляя у него класс 'popup_opened'
Параметр 'popup' - это ссылка на DOM элемент, представляющий собой 'popup'
*/
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

/*
Эта функция открывает (делает видимым) переданный в неё 'popup', добавляя ему класс 'popup_opened'
Параметр 'popup' - это ссылка на DOM элемент, представляющий собой 'popup'
*/
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function resetNewCardPopupInputs() {
  newCardAddTitle.value = '';
  newCardAddLink.value = '';
}

function creatNewCard(name, link) {
  const newCard = templateCard.cloneNode(true);
  const cardImage = newCard.querySelector(".card__image");
  const cardTitle = newCard.querySelector(".card__title");
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  // Кнопка удаления карточки
  const deleteButton = newCard.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteButton.closest('.card').remove());

  // Кнопка like
  const likeButton = newCard.querySelector('.card__like');
  likeButton.addEventListener('click', () => likeButton.classList.toggle('card__like_mode-active'));
  return newCard;
}

// Add new card
function addNewCard(newCard) {
  cards.prepend(newCard);
}
/*
Эта функция обрабатывает нажатие на кнопку 'Сохранить' в форме редактировниая профиля
Она обновляет имя и описание в профиле и закрывает 'popup'
Параметр 'event' содержит событие, например событие 'нажатия на кнопку' или 'отправки формы'
*/
function handleProfileEditFormSubmit(event) {
  // Отменяем стандартное действие браузера по отправке формы, чтобы предотвратить перезагрузку страницы
  event.preventDefault();
  // Обновляем имя профиля на основе введенного значения в форме
  profileName.textContent = profileEditName.value;
  // Обновляем описание профиля на основе введенного значения в форме
  profileAbout.textContent = profileEditJob.value;
  // Закрываем 'popup'
  closePopup(profilePopup);
}

function handleNewCardFormSubmit(event) {
  // Отменяем стандартное действие браузера по отправке формы, чтобы предотвратить перезагрузку страницы
  event.preventDefault();
  const newCard = creatNewCard(newCardAddTitle.value, newCardAddLink.value);
  addNewCard(newCard);
  // Закрываем 'popup'
  closePopup(newCardPopup);
}

// Добавляем обработчик события 'click' для кнопки редактирования профиля
editProfileButton.addEventListener('click', () => {
  // Заполняем поле для имени в форме редактирования профиля текущим значением из профиля
  profileEditName.value = profileName.textContent;
  // Заполняем поле для описания профиля в форме редактирования текущим значением из профиля
  profileEditJob.value = profileAbout.textContent;
  // Открываем 'popup' редактирования профиля
  openPopup(profilePopup);
});

// Добавляем обработчик события 'click' для кнопки добавления новой карточки
newCardButton.addEventListener('click', () => {
  // Очищение полей
  resetNewCardPopupInputs();
  // Открываем 'popup' добавления новой карточки
  openPopup(newCardPopup);
});

closeNewCardPopupButton.addEventListener('click', () => {
  // Закрывем 'popup' добавления новой карточки
  closePopup(newCardPopup);
});

// Добавляем обработчик события 'submit' для формы редактирования профиля
// При отправке формы будет вызвана функция handleProfileEditFormSubmit в которую как аргумент будет передано событие 'submit'
profileEditForm.addEventListener('submit', (event) => handleProfileEditFormSubmit(event));

// Добавляем обработчик события 'click' для кнопки закрытия профиля
// При клике на эту кнопку будет вызвана функция closePopup с аргументом profilePopup
closeProfileButton.addEventListener('click', () => closePopup(profilePopup));

newCardForm.addEventListener('submit', (event) => handleNewCardFormSubmit(event));

// Создаём новые карточки из заданного массива initialCards
initialCards.forEach(cardElement => {
  const newCard = creatNewCard(cardElement.name, cardElement.link);
  addNewCard(newCard);
});