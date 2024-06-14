// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsContainer = document.querySelector(".places__list");

// @todo: Функция создания карточки
import { cardView } from "../index.js";
function createCard(initialCard, deletteCard, likeCard, cardView) {
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
    cardView(cardImage.src, cardImage.alt, cardTitle.textContent)
  );

  return card;
}

// @todo: Функция удаления карточки
function deletteCard(card) {
  card.remove();
}

// Обработка лайков
function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

// функция вывода всех карточек на страницу
export function initialCard(cards) {
  cards.forEach((initialCard) => {
    cardsContainer.append(
      createCard(initialCard, deletteCard, likeCard, cardView)
    );
  });
}

// вывод новой карточки на страницу
export function addNewCard(newCard) {
  cardsContainer.prepend(createCard(newCard, deletteCard, likeCard, cardView));
}
