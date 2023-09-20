import { deleteServerCard, deleteServerLike, putServerLike } from './api.js';
import { handleOverlayImageClick } from './modal.js';

// Ссылка на DOM элемент 'cards'
const cards = document.querySelector('.cards');
// Ссылка на DOM элемент 'template' шаблона для новой карточки
const template = document.getElementById('template');
// Ссылка на DOM элемент в 'template' с классом 'card'
const templateCard = template.content.querySelector('.card');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Эта функция создает новую карточку путем клонирования шаблона template. Имеет на вход объект 'card'
function createNewCard(card, userId) {
  // Здесь мы клонируем DOM-элемент шаблона карточки
  const newCard = templateCard.cloneNode(true);
  // Ссылка на DOM-элемент поля для ссылки на изображение
  const cardImage = newCard.querySelector(".card__image");
  // Ссылка на DOM-элемент поля для названия изображения
  const cardTitle = newCard.querySelector(".card__title");
  const likesCount = newCard.querySelector('.card__likes-count');
  const likeButton = newCard.querySelector('.card__like');
  const deleteButton = newCard.querySelector('.card__delete-button');
  // Для тэга img карточки указываем атрибут src и присваиваем ему значение из параметра 'link'
  cardImage.src = card.link;
  // Для тэга img карточки указываем атрибут alt и присваиваем ему значение из параметра 'name'
  cardImage.alt = card.name;
  // Полю названия изображения присваиваем значение из параметра 'name'
  cardTitle.textContent = card.name;
  if (card.likes.some(like => like._id === userId)) {
    likeButton.classList.toggle('card__like_mode-active');
  };
  likesCount.textContent = card.likes.length;
  // Если нажали на кнопку "like"
  likeButton.addEventListener('click', () => { handleLikeButtonClick(likeButton, card._id, likesCount) });
  // Если нажали на кнопку удаления
  if (card.owner._id === userId) {
    deleteButton.addEventListener('click', () => { handleTrashButtonClick(deleteButton, card._id) });
  } else {
    deleteButton.remove();
  }
  // Если нажали на картинку карточки
  cardImage.addEventListener('click', () => { handleOverlayImageClick(cardImage.src, cardImage.alt) });
  return newCard;
}
// Здесь функция createNewCard заканчивается
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Данная функция проставляет или убирает лайк
// likeButton - это ссылка на DOM элемент кнопки лайка
async function handleLikeButtonClick(likeButton, cardID, cardsLikeSpan) {
  try {
    let likesCount;
    if (likeButton.classList.contains('card__like_mode-active')) {
      likesCount = await deleteServerLike(cardID);
    } else {
      likesCount = await putServerLike(cardID);
    }
    cardsLikeSpan.textContent = likesCount.likes.length;
    likeButton.classList.toggle('card__like_mode-active');
  }
  catch (error) {
    console.log(error.message)
  }
}



// Данная функция удаляет карточку со страницы
// trashButton - это ссылка на DOM элемент кнопки удаления карточки
async function handleTrashButtonClick(trashButton, cardID) {
  try {
    await deleteServerCard(cardID);
    trashButton.closest('.card').remove();
  } catch (error) {
    console.log(error.message)
  }
}

/*
Эта функция вставляет карточку на страницу
*/
function addNewCard(newCard) {
  cards.prepend(newCard);
}

export { cards, createNewCard, handleLikeButtonClick, handleTrashButtonClick, addNewCard };