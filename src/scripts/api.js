const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-17",
  headers: {
    authorization: "d936029b-1839-4111-97fd-d146df2432b7",
    "Content-Type": "application/json",
  },
  endlink: {
    userInfo: "/users/me",
    cards: "/cards",
    likes: "/cards/likes/",
    userAvatar: "/users/me/avatar",
  },
};

//обработка ошибки ответа
function checkResult(result) {
  return result.ok ? result.json() : Promise.reject(`ошибка: ${result.status}`);
}

//получение профиля пользователя
export function getUserInfo() {
  return fetch(`${config.baseUrl}${config.endlink.userInfo}`, {
    headers: config.headers,
  }).then(checkResult);
}

//получение карточек
export function getInitialCards() {
  return fetch(`${config.baseUrl}${config.endlink.cards}`, {
    headers: config.headers,
  }).then(checkResult);
}

//изменение данных пользователя
export function setUserInfo(name, about) {
  return fetch(`${config.baseUrl}${config.endlink.userInfo}`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(checkResult);
}

// добавление карточки
export function patchNewCard(name, link) {
  return fetch(`${config.baseUrl}${config.endlink.cards}`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkResult);
}

//удаление карточки
export function deleteCardApi(cardId) {
  return fetch(`${config.baseUrl}${config.endlink.cards}/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResult);
}

// добавление лайка
export function addLike(cardId) {
  return fetch(`${config.baseUrl}${config.endlink.likes}/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResult);
}

// удаление лайка
export function deleteLike(cardId) {
  return fetch(`${config.baseUrl}${config.endlink.likes}/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResult);
}

// изменение аватраки
export function patchNewAvatar(link) {
  return fetch(`${config.baseUrl}${config.endlink.userAvatar}`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then(checkResult);
}

// проверка ссылки на картинку
export async function testUrl(url) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    if (response.ok) {
      const contentType = response.headers.get("content-type");
      console.log(contentType);
      return contentType && contentType.startsWith("image/");
    }
    return false;
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}
