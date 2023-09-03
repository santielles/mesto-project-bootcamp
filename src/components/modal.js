// Ссылка на DOM элемент в popup для открытия popup с картинкой в большом размере
const overlayImagePopup = document.getElementById('overlay-image-open');
// Ссылка на DOM элемент в popup с img
const popupOverlayImage = overlayImagePopup.querySelector(".popup__overlay-image");
// Ссылка на DOM элемент в popup с title (подписью к картинке)
const popupOverlayCaption = overlayImagePopup.querySelector(".popup__overlay-caption");
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

export { closePopup, openPopup, handleOverlayImageClick };