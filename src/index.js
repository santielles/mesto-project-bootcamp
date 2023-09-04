import * as card from './components/card.js';
import * as modal from './components/modal.js';
import * as validate from './components/validate.js';
import * as utils from './components/utils.js';

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
const profileName = profile.querySelector('.profile__name');
// Ссылка на DOM элемент для отображения описания в профиле
const profileAbout = profile.querySelector('.profile__about');
// Ссылка на DOM элемент кнопки для редактирования профиля
const editProfileButton = profile.querySelector('.profile__edit-button');
// Ссылка на DOM элемент кнопки для добавления новой карточки
const newCardButton = profile.querySelector('.profile__add-button');

// Profile Popup
// Ссылка на DOM элемент 'edit-profile-popup' для редактирования профиля
const profilePopup = document.getElementById('edit-profile-popup');
// Ссылка на DOM элемент формы редактирования профиля
const profileEditForm = document.forms.editProfileForm;
// Ссылка на DOM элемент поля редактирования имени в форме редактирования профиля
const profileEditName = profileEditForm.elements.profileInputName;
// Ссылка на DOM элемент поля редактирования описания в форме редактирования профиля
const profileEditJob = profileEditForm.elements.profileInputJob;

// New Card Popup
// Ссылка на DOM элемент 'new-card-popup' для добавления новой карточки
const newCardPopup = document.getElementById('new-card-popup');
// Ссылка на DOM элемент формы добавления новой карточки
const newCardForm = document.forms.newCardForm;
// Ссылка на DOM элемент поля ввода названия в форме добавления новой карточки
const newCardAddTitle = newCardForm.elements.newCardFormTitle;
// Ссылка на DOM элемент поля ввода ссылки в форме добавления новой карточки
const newCardAddLink = newCardForm.elements.newCardFormLink;

const closeButtonList = document.querySelectorAll('.popup__close-button');

const validationSettings = {
  inputSelector: '.popup__input',
  buttonSelector: '.popup__button',
  formSelector: '.popup__form',
  invalidInputTextClass: 'popup__input-invalid',
}

/*
Эта функция обрабатывает нажатие на кнопку 'Сохранить' в форме редактирования профиля
Она обновляет имя и описание в профиле и закрывает popup
Параметр 'event' содержит событие, например, событие 'нажатия на кнопку' или 'отправки формы'
*/
function handleProfileEditFormSubmit(event) {
  // Отменяем стандартное действие браузера по отправке формы, чтобы предотвратить перезагрузку страницы
  event.preventDefault();
  // Обновляем имя профиля на основе введенного значения в форме
  profileName.textContent = profileEditName.value;
  // Обновляем описание профиля на основе введенного значения в форме
  profileAbout.textContent = profileEditJob.value;
  // Закрываем popup
  modal.closePopup(profilePopup);
  // Получаем из event кнопку "Сохранить", которую нажали
  const button = event.submitter;
  // Делаем кнопку "Сохранить" неактивной
  utils.disableSubmitButton(button);
}

/*
Эта функция обрабатывает нажатие на кнопку 'Создать' в форме добавления новой карточки
Она берёт имя карточки и ссылку на картинку, добавляет карточку и закрывает popup
Параметр 'event' содержит событие, например, событие 'нажатия на кнопку' или 'отправки формы'
*/
function handleNewCardFormSubmit(event) {
  // Отменяем стандартное действие браузера по отправке формы, чтобы предотвратить перезагрузку страницы
  event.preventDefault();
  // Создаём новую карточку с помощью функции 'createNewCard'
  const newCard = card.createNewCard(newCardAddTitle.value, newCardAddLink.value);
  // Добавляем созданную карточку на страницу
  card.addNewCard(newCard);
  // Закрываем popup
  modal.closePopup(newCardPopup);
  // Получаем из event кнопку "Создать", которую нажали
  const button = event.submitter;
  // Делаем кнопку "Создать" неактивной
  utils.disableSubmitButton(button);
}

// Добавляем обработчик события 'click' для кнопки редактирования профиля
editProfileButton.addEventListener('click', () => {
  // Заполняем поле для имени в форме редактирования профиля текущим значением из профиля
  profileEditName.value = profileName.textContent;
  // Заполняем поле для описания профиля в форме редактирования текущим значением из профиля
  profileEditJob.value = profileAbout.textContent;
  // Открываем popup редактирования профиля
  modal.openPopup(profilePopup);
});

// Добавляем обработчик события 'click' для кнопки добавления новой карточки
newCardButton.addEventListener('click', () => {
  // Очищаем поля формы
  utils.resetFormInputs(newCardForm);
  // Открываем popup добавления новой карточки
  modal.openPopup(newCardPopup);
});

// Добавляем обработчик события 'submit' для формы редактирования профиля
// При отправке формы будет вызвана функция handleProfileEditFormSubmit, в которую как аргумент будет передано событие 'submit'
profileEditForm.addEventListener('submit', (event) => handleProfileEditFormSubmit(event));

newCardForm.addEventListener('submit', (event) => handleNewCardFormSubmit(event));

// Создаём новые карточки из заданного массива initialCards
initialCards.forEach(cardElement => {
  const newCard = card.createNewCard(cardElement.name, cardElement.link);
  card.addNewCard(newCard);
});

closeButtonList.forEach(closeButton => {
  // Добавляем обработчик события 'click' для кнопки закрытия профиля
  // При клике на эту кнопку будет вызвана функция modal.closePopup с аргументом closeButton.closest('.popup') - найти ближайшего родителя кнопки с классом '.popup'
  closeButton.addEventListener('click', () => {
    modal.closePopup(closeButton.closest('.popup'));
  });
  closeButton.closest('.popup').addEventListener('mousedown', (event) => {
    // Проверяем что щелчок мышкой был вне видимого окна popup
    if (event.target === event.currentTarget) {
      modal.closePopup(event.currentTarget);
    }
  });
});

card.cards.addEventListener('click', (event) => {
  // event.target содержит ссылку на DOM элемент, на который нажали мышкой
  // Если нажали на кнопку "like"
  if (event.target.classList.contains('card__like')) {
    // Вызываем функцию 'cardLike' и как аргумент передаём в неё ссылку на DOM элемент кнопки лайка, на который нажали мышкой
    card.handleLikeButtonClick(event.target);
  }
  // Если нажали на кнопку удаления
  if (event.target.classList.contains('card__delete-button')) {
    // Вызываем функцию 'TrashButton' и как аргумент передаём в неё ссылку на DOM элемент кнопки удаления, на который нажали мышкой
    card.handleTrashButtonClick(event.target);
  }
  // Если нажали на картинку карточки
  if (event.target.classList.contains('card__image')) {
    // Вызываем функцию 'OverlayImage' и как аргумент передаём в неё ссылку на DOM элемент картинки карточки, на который нажали мышкой
    modal.handleOverlayImageClick(event.target);
  }
});

validate.enableFormsValidation(validationSettings);