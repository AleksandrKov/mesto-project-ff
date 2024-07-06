import { deleteCardApi, deleteLike, addLike } from "./api";
import { openModal, closeModal } from "./modal";

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard(
  initialCard,
  deleteCard,
  likeCard,
  viewingCard,
  userId
) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const cardLikeCounter = card.querySelector(".card__like-counter");
  card.setAttribute("data-id", initialCard._id);
  const popupConfirm = document.querySelector(".popup_confirm");

  cardImage.src = initialCard.link;
  cardImage.alt = initialCard.name;
  cardTitle.textContent = initialCard.name;
  cardLikeCounter.textContent = initialCard.likes.length;

  const deleteButton = card.querySelector(".card__delete-button");
  if (userId !== initialCard.owner._id) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.addEventListener("click", () => openDeletePopup(card, popupConfirm));
  }

  const likeButton = card.querySelector(".card__like-button");
  likeButton.addEventListener("click", () =>
    likeCard(likeButton, card.getAttribute("data-id"), cardLikeCounter)
  );

  cardImage.addEventListener("click", () =>
    viewingCard(cardImage.src, cardImage.alt, cardTitle.textContent)
  );

  if (initialCard.likes.some(like => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  return card;
}

// Функция открытия попапа для подтверждения удаления
function openDeletePopup(card, popupConfirm) {
  openModal(popupConfirm);

  const confirmButton = popupConfirm.querySelector(".popup__button");
  const confirmHandler = (evt) => {
    evt.preventDefault();
    deleteCard(card, popupConfirm);
    confirmButton.removeEventListener("click", confirmHandler);
  };
  
  confirmButton.addEventListener("click", confirmHandler);
}

// Функция удаления карточки
export function deleteCard(card, popupConfirm) {
  const cardId = card.getAttribute("data-id");

  deleteCardApi(cardId)
    .then(() => {
      card.remove();
      closeModal(popupConfirm);
    })
    .catch(err => {
      console.error("Error deleting card:", err);
      closeModal(popupConfirm);
    });
}

// Обработка лайков
export function likeCard(likeButton, cardId, cardLikeCounter) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    deleteLike(cardId)
      .then((res) => {
        likeButton.classList.toggle("card__like-button_is-active");
        cardLikeCounter.textContent = res.likes.length;
      })
      .catch(err => console.error("Error removing like:", err));
  } else {
    addLike(cardId)
      .then((res) => {
        likeButton.classList.toggle("card__like-button_is-active");
        cardLikeCounter.textContent = res.likes.length;
      })
      .catch(err => console.error("Error adding like:", err));
  }
}
