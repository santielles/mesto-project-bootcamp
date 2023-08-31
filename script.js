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
// Ссылка на DOM элемент кнопки закрытия 'edit-profile-popup' для редактирования профиля
const closeProfileButton = profilePopup.querySelector('.popup__close-button');
// Ссылка на DOM элемент формы редактирования профиля
const profileEditForm = profilePopup.querySelector('.popup__form');
// Ссылка на DOM элемент поля редактирования имени в форме редактирования профиля
const profileEditName = document.getElementById('edit-profile-name');
// Ссылка на DOM элемент поля редактирования описания в форме редактирования профиля
const profileEditJob = document.getElementById('edit-profile-job');

// New Card Popup
// Ссылка на DOM элемент 'new-card-popup' для добавления новой карточки
const newCardPopup = document.getElementById('new-card-popup');
// Ссылка на DOM элемент кнопки закрытия 'new-card-popup' для добавления новой карточки
const closeNewCardPopupButton = newCardPopup.querySelector('.popup__close-button');
// Ссылка на DOM элемент формы добавления новой карточки
const newCardForm = newCardPopup.querySelector('.popup__form');
// Ссылка на DOM элемент поля ввода названия в форме добавления новой карточки
const newCardAddTitle = document.getElementById('add-title');
// Ссылка на DOM элемент поля ввода ссылки в форме добавления новой карточки
const newCardAddLink = document.getElementById('add-link');

// Cards
// Ссылка на DOM элемент 'cards'
const cards = document.querySelector('.cards');
// Ссылка на DOM элемент 'template' шаблона для новой карточки
const template = document.getElementById('template');
// Ссылка на DOM элемент в 'template' с классом 'card'
const templateCard = template.content.querySelector('.card');

// Ссылка на DOM элемент в popup для открытия popup с картинкой в большом размере
const overlayImagePopup = document.getElementById('overlay-image-open');
// Ссылка на DOM элемент в popup с img
const popupOverlayImage = overlayImagePopup.querySelector(".popup__overlay-image");
// Ссылка на DOM элемент в popup с title (подписью к картинке)
const popupOverlayCaption = overlayImagePopup.querySelector(".popup__overlay-caption");

const closeButtonList = document.querySelectorAll('.popup__close-button');

/*
Эта функция закрывает (делает невидимым) переданный в неё popup, удаляя у него класс 'popup_opened'
Параметр popup — это ссылка на DOM-элемент, представляющий собой popup
*/
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

/*
Эта функция открывает (делает видимым) переданный в неё popup, добавляя ему класс 'popup_opened'
Параметр popup — это ссылка на DOM-элемент, представляющий собой popup
*/
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

/*
Эта функция очищает поля ввода данных 'Наименование' и 'Ссылка' при открытии popup для добавления новой карточки
*/
function resetFormInputs(form) {
  form.reset();
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Эта функция создает новую карточку путем клонирования шаблона template. Имеет на вход два параметра: 'name' и 'link'
function createNewCard(name, link) {
  // Здесь мы клонируем DOM-элемент шаблона карточки
  const newCard = templateCard.cloneNode(true);
  // Ссылка на DOM-элемент поля для ссылки на изображение
  const cardImage = newCard.querySelector(".card__image");
  // Ссылка на DOM-элемент поля для названия изображения
  const cardTitle = newCard.querySelector(".card__title");
  // Для тэга img карточки указываем атрибут src и присваиваем ему значение из параметра 'link'
  cardImage.src = link;
  // Для тэга img карточки указываем атрибут alt и присваиваем ему значение из параметра 'name'
  cardImage.alt = name;
  // Полю названия изображения присваиваем значение из параметра 'name'
  cardTitle.textContent = name;

  return newCard;
}
// Здесь функция createNewCard заканчивается
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
Эта функция вставляет карточку на страницу
*/
function addNewCard(newCard) {
  cards.prepend(newCard);
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
  closePopup(profilePopup);
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
  const newCard = createNewCard(newCardAddTitle.value, newCardAddLink.value);
  // Добавляем созданную карточку на страницу
  addNewCard(newCard);
  // Закрываем popup
  closePopup(newCardPopup);
}

// Данная функция проставляет или убирает лайк
// likeButton - это ссылка на DOM элемент кнопки лайка
function handleLikeButtonClick(likeButton) {
  likeButton.classList.toggle('card__like_mode-active');
}

// Данная функция удаляет карточку со страницы
// trashButton - это ссылка на DOM элемент кнопки удаления карточки
function handleTrashButtonClick(trashButton) {
  trashButton.closest('.card').remove();
}

// Данная функция открывает картинку в popup в большом размере
// cardImage - это ссылка на DOM элемент картинки карточки
function handleOverlayImageClick(cardImage) {
  // В переменной popupOverlayImage у нас ссылка на тэг img в popup
  // Указываем атрибут src у тега img popup картинки и присваиваем ему значение из cardImage
  popupOverlayImage.src = cardImage.src;
  // Та же переменная, но тут указываем атрибут alt
  popupOverlayImage.alt = cardImage.alt;
  // В переменной popupOverlayCaption у нас ссылка на элемент подписи картинки в popup
  popupOverlayCaption.textContent = cardImage.alt;

  // Открываем popup
  openPopup(overlayImagePopup);
}

// Добавляем обработчик события 'click' для кнопки редактирования профиля
editProfileButton.addEventListener('click', () => {
  // Заполняем поле для имени в форме редактирования профиля текущим значением из профиля
  profileEditName.value = profileName.textContent;
  // Заполняем поле для описания профиля в форме редактирования текущим значением из профиля
  profileEditJob.value = profileAbout.textContent;
  // Открываем popup редактирования профиля
  openPopup(profilePopup);
});

// Добавляем обработчик события 'click' для кнопки добавления новой карточки
newCardButton.addEventListener('click', () => {
  // Очищаем поля формы
  resetFormInputs(newCardForm);
  // Открываем popup добавления новой карточки
  openPopup(newCardPopup);
});

// Добавляем обработчик события 'submit' для формы редактирования профиля
// При отправке формы будет вызвана функция handleProfileEditFormSubmit, в которую как аргумент будет передано событие 'submit'
profileEditForm.addEventListener('submit', (event) => handleProfileEditFormSubmit(event));

newCardForm.addEventListener('submit', (event) => handleNewCardFormSubmit(event));

// Создаём новые карточки из заданного массива initialCards
initialCards.forEach(cardElement => {
  const newCard = createNewCard(cardElement.name, cardElement.link);
  addNewCard(newCard);
});

closeButtonList.forEach(closeButton => {
  // Добавляем обработчик события 'click' для кнопки закрытия профиля
  // При клике на эту кнопку будет вызвана функция closePopup с аргументом closeButton.closest('.popup') - найти ближайшего родителя кнопки с классом '.popup'
  closeButton.addEventListener('click', () => {
    closePopup(closeButton.closest('.popup'));
  });
});

cards.addEventListener('click', (event) => {
  // event.target содержит ссылку на DOM элемент, на который нажали мышкой

  // Если нажали на кнопку "like"
  if (event.target.classList.contains('card__like')) {
    // Вызываем функцию 'cardLike' и как аргумент передаём в неё ссылку на DOM элемент кнопки лайка, на который нажали мышкой
    handleLikeButtonClick(event.target);
  }
  // Если нажали на кнопку удаления
  if (event.target.classList.contains('card__delete-button')) {
    // Вызываем функцию 'TrashButton' и как аргумент передаём в неё ссылку на DOM элемент кнопки удаления, на который нажали мышкой
    handleTrashButtonClick(event.target);
  }
  // Если нажали на картинку карточки
  if (event.target.classList.contains('card__image')) {
    // Вызываем функцию 'OverlayImage' и как аргумент передаём в неё ссылку на DOM элемент картинки карточки, на который нажали мышкой
    handleOverlayImageClick(event.target);
  }
});