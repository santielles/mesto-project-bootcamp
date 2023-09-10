const headers = {
  'Authorization': '1815da7b-afff-4032-8dda-f664f5e514d1',
  'Content-Type': 'application/json'
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
export async function getServerProfile() {
  return fetch('https://nomoreparties.co/v1/wbf-cohort-12/users/me', {
    method: 'GET',
    headers: headers,
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Error: ${response.status}`);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

// Тут наша ссылка на сервер с путем к профайлу, к ней мы применяем метод PATCH, который
// подразумевает 'замена'.
export async function setServerProfile(profile) {
  fetch('https://nomoreparties.co/v1/wbf-cohort-12/users/me', {
    method: 'PATCH',
    headers: headers,
    body: JSON.stringify({
      name: profile.name,
      about: profile.about,
    })
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Error: ${response.status}`);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export async function createServerCard(card) {
  fetch('https://nomoreparties.co/v1/wbf-cohort-12/cards', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    })
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Error: ${response.status}`);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export async function deleteServerCard(cardID) {
  fetch(`https://nomoreparties.co/v1/wbf-cohort-12/cards/${cardID}`, {
    method: 'DELETE',
    headers: headers,
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Error: ${response.status}`);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export async function getServerCards() {
  return fetch('https://nomoreparties.co/v1/wbf-cohort-12/cards/', {
    method: 'GET',
    headers: headers,
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Error: ${response.status}`);
    })
    .catch((error) => {
      console.log(error.message);
    });
}