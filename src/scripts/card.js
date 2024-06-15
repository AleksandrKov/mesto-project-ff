// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
export function createCard(initialCard, deletteCard, likeCard, viewingCard) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");

  cardImage.src = initialCard.link;
  cardImage.alt = initialCard.name;
  cardTitle.textContent = initialCard.name;

  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deletteCard(card));

  const likeButton = card.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => likeCard(likeButton));

  cardImage.addEventListener("click", () =>
    viewingCard(cardImage.src, cardImage.alt, cardTitle.textContent)
  );

  return card;
}

// @todo: Функция удаления карточки
export function deletteCard(card) {
  card.remove();
}

// Обработка лайков
export function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
