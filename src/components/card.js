// Ссылка на DOM элемент 'cards'
const cards = document.querySelector('.cards');
// Ссылка на DOM элемент 'template' шаблона для новой карточки
const template = document.getElementById('template');
// Ссылка на DOM элемент в 'template' с классом 'card'
const templateCard = template.content.querySelector('.card');

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

/*
Эта функция вставляет карточку на страницу
*/
function addNewCard(newCard) {
  cards.prepend(newCard);
}

export { cards, createNewCard, handleLikeButtonClick, handleTrashButtonClick, addNewCard };