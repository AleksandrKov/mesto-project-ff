import { openModal } from "../scripts/modal.js";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

const popupTimeImage = document.querySelector(".popup_type_image");
const popupImage = popupTimeImage.querySelector(".popup__image");
const popupCaption = popupTimeImage.querySelector(".popup__caption");

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

// окно увеличенного просмотра карточки
export function viewingCard(src, alt, textContent) {
  openModal(popupTimeImage);
  popupImage.setAttribute("src", src);
  popupImage.setAttribute("alt", alt);
  popupCaption.textContent = textContent;
}
