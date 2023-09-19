const headers = {
  'Authorization': '1815da7b-afff-4032-8dda-f664f5e514d1',
  'Content-Type': 'application/json'
}

const BASE_URL = 'https://nomoreparties.co/v1/wbf-cohort-12'

function checkRespons(response) {

  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Error: ${response.status}`);

}

// Создаем функцию getServerProfile
// функция нам вернет объект профиля вида
//    {
//      about: "Physicist and Chemist"
//      avatar: "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg"
//      cohort: "wbf-cohort-12"
//      name: "Marie Skłodowska Curie"
//      _id: "17fdccc9d887ad2d28b7eae5" (вернет id конкретно моего профиля)
//    }
export function getServerProfile() {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: headers,
  })
    // .then(respons => checkRespons(respons)) - не сокращенная версия
    .then(checkRespons)
}

// Тут наша ссылка на сервер с путем к профайлу, к ней мы применяем метод PATCH, который
// подразумевает 'замена'.
export function setServerProfile(profile) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({
      name: profile.name,
      about: profile.about,
    })
  })
    // Если мы вызываем функцию в которой используем этот же параметр, то можно сократить до .then(checkRespons)
    .then(respons => checkRespons(respons))
}

export function createServerCard(card) {
  return fetch(`${BASE_URL}/cards`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    })
  })
    // Если мы вызываем функцию в которой используем этот же параметр, то можно сократить до .then(checkRespons)
    .then(respons => checkRespons(respons))
}

export function deleteServerCard(cardID) {
  return fetch(`${BASE_URL}/cards/${cardID}`, {
    method: 'DELETE',
    headers: headers,
  })
    // Если мы вызываем функцию в которой используем этот же параметр, то можно сократить до .then(checkRespons)
    .then(respons => checkRespons(respons))
}

export function getServerCards() {
  return fetch(`${BASE_URL}/cards/`, {
    method: 'GET',
    headers: headers,
  })
    // Если мы вызываем функцию в которой используем этот же параметр, то можно сократить до .then(checkRespons)
    .then(respons => checkRespons(respons))
}

export function putServerLike(cardID) {
  return fetch(`${BASE_URL}/cards/likes/${cardID}`, {
    method: 'PUT',
    headers: headers,
  })
    // Если мы вызываем функцию в которой используем этот же параметр, то можно сократить до .then(checkRespons)
    .then(respons => checkRespons(respons))
}

export function deleteServerLike(cardID) {
  return fetch(`${BASE_URL}/cards/likes/${cardID}`, {
    method: 'DELETE',
    headers: headers,
  })
    // Если мы вызываем функцию в которой используем этот же параметр, то можно сократить до .then(checkRespons)
    .then(respons => checkRespons(respons))
}

export function uploadAvatar(avatar) {
  return fetch(`${BASE_URL}/users/me/avatar`, {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({
      avatar: avatar,
    })
  })
    // Если мы вызываем функцию в которой используем этот же параметр, то можно сократить до .then(checkRespons)
    .then(respons => checkRespons(respons))
}