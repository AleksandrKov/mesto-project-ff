// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(initialCard, deletteCard) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");

  cardImage.src = initialCard.link;
  cardImage.alt = initialCard.name;
  cardTitle.textContent = initialCard.name;

  const deleteButton = card.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deletteCard(card));

  return card;
}

// @todo: Функция удаления карточки
const deletteCard = function (card) {
  card.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((initialCard) => {
  cardsContainer.append(createCard(initialCard, deletteCard));
});
