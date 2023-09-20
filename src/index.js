import './pages/index.css';

import * as card from './components/card.js';
import * as modal from './components/modal.js';
import * as validate from './components/validate.js';
import { getServerCards, getServerProfile, setServerProfile, createServerCard, uploadAvatar } from './components/api.js';


// Вместо 
// const profileObject = await getServerProfile();
// const serverCards = await getServerCards();
Promise.all([getServerProfile(), getServerCards()])
  .then(([profileObject, serverCards]) => {
    setLocalProfile(profileObject);

    // Создаём новые карточки
    serverCards.forEach((cardElement) => {
      const newCard = card.createNewCard(cardElement, profileObject._id);
      card.addNewCard(newCard);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

// Profile
// Ссылка на DOM элемент профиля
const profile = document.querySelector('.profile');
// Ссылка на DOM элемент для отображения аватара в профиле
const profileAvatar = profile.querySelector('.profile__avatar');
// Ссылка на DOM элемент для отображения имени в профиле
const profileName = profile.querySelector('.profile__name');
// Ссылка на DOM элемент для отображения описания в профиле
const profileAbout = profile.querySelector('.profile__about');
// Ссылка на DOM элемент кнопки для редактирования профиля
const editProfileButton = profile.querySelector('.profile__edit-button');
// Ссылка на DOM элемент кнопки для добавления новой карточки
const newCardButton = profile.querySelector('.profile__add-button');

const editAvatarProfile = document.getElementById('edit-profile-avatar');
const profileAvatarPencil = profile.querySelector('.profile__avatar-pencil');
const editAvatarProfileForm = document.forms.editProfileAvatarForm;
const editAvatarProfileLink = editAvatarProfileForm.elements.editProfileAvatarLink;

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
async function handleProfileEditFormSubmit(event) {
  // Отменяем стандартное действие браузера по отправке формы, чтобы предотвратить перезагрузку страницы
  event.preventDefault();
  event.submitter.textContent = 'Сохранение...'
  // В нашу функцйю передаём profileEditName.value что значит взять значение
  // из profileEditName (ссылка на DOM элемент в попапе редактирования имени)
  try {
    const res = await setServerProfile({
      name: profileEditName.value,
      about: profileEditJob.value
    })
    // Обновляем имя профиля на основе введенного значения в форме
    profileName.textContent = res.name;
    // Обновляем описание профиля на основе введенного значения в форме
    profileAbout.textContent = res.about;
    // Закрываем popup
    modal.closePopup(profilePopup);
  } catch (error) {
    console.log(error.message)
  }
  event.submitter.textContent = 'Сохранить'
}

async function handleProfileAvatarEditFormSubmit(event) {
  // Отменяем стандартное действие браузера по отправке формы, чтобы предотвратить перезагрузку страницы
  event.preventDefault();
  event.submitter.textContent = 'Сохранение...'
  try {
    await uploadAvatar(editAvatarProfileLink.value)
    profileAvatar.src = editAvatarProfileLink.value;
    modal.closePopup(editAvatarProfile);
  } catch (error) {
    console.log(error.message)
  }
  event.submitter.textContent = 'Сохранить'
}

/*
Эта функция обрабатывает нажатие на кнопку 'Создать' в форме добавления новой карточки
Она берёт имя карточки и ссылку на картинку, добавляет карточку и закрывает popup
Параметр 'event' содержит событие, например, событие 'нажатия на кнопку' или 'отправки формы'
*/
async function handleNewCardFormSubmit(event) {
  // Отменяем стандартное действие браузера по отправке формы, чтобы предотвратить перезагрузку страницы
  event.preventDefault();
  event.submitter.textContent = 'Сохранение...'
  try {
    const cardObject = {
      name: newCardAddTitle.value,
      link: newCardAddLink.value
    }
    const cardServerObject = await createServerCard(cardObject);
    // Создаём новую карточку с помощью функции 'createNewCard'
    const newCard = card.createNewCard(cardServerObject, cardServerObject.owner._id);
    // Добавляем созданную карточку на страницу
    card.addNewCard(newCard);
    // Закрываем popup
    modal.closePopup(newCardPopup);
  } catch (error) {
    console.log(error.message)
  }
  event.submitter.textContent = 'Создать'
}

function setLocalProfile(profile) {
  // profileName это наша константа (ссылка на DOM элемент), textContent - считываем текстовое содержимое элемента
  // about это свойство объекта(смотри выше)
  profileName.textContent = profile.name;
  profileAbout.textContent = profile.about;
  profileAvatar.src = profile.avatar;
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
  newCardForm.reset();
  const submitButton = newCardForm.querySelector('.popup__button');
  // Делаем кнопку "Создать" неактивной
  validate.disableSubmitButton(submitButton)
  modal.openPopup(newCardPopup);
});

// Добавляем обработчик события 'click' для кнопки открытия редактирования аватара
profileAvatarPencil.addEventListener('click', () => {
  const avatarButton = editAvatarProfileForm.querySelector('.popup__button');
  validate.disableSubmitButton(avatarButton)
  modal.openPopup(editAvatarProfile);
});

editAvatarProfileForm.addEventListener('submit', (event) => handleProfileAvatarEditFormSubmit(event));
// Добавляем обработчик события 'submit' для формы редактирования профиля
// При отправке формы будет вызвана функция handleProfileEditFormSubmit, в которую как аргумент будет передано событие 'submit'
profileEditForm.addEventListener('submit', (event) => handleProfileEditFormSubmit(event));

newCardForm.addEventListener('submit', (event) => handleNewCardFormSubmit(event));

closeButtonList.forEach(closeButton => {
  const popup = closeButton.closest('.popup');
  // Добавляем обработчик события 'click' для кнопки закрытия профиля
  // При клике на эту кнопку будет вызвана функция modal.closePopup с аргументом closeButton.closest('.popup') - найти ближайшего родителя кнопки с классом '.popup'
  closeButton.addEventListener('click', () => {
    modal.closePopup(popup);
  });
  popup.addEventListener('mousedown', (event) => {
    // Проверяем что щелчок мышкой был вне видимого окна popup
    if (event.target === event.currentTarget) {
      modal.closePopup(event.currentTarget);
    }
  });
});

validate.enableFormsValidation(validationSettings);