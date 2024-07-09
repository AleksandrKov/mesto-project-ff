import { deleteLike, addLike } from "./api";

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
export function createCard(
  initialCard,
  openDeletePopup,
  likeCard,
  viewingCard,
  userId
) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const cardLikeCounter = card.querySelector(".card__like-counter");
  card.setAttribute("data-id", initialCard._id);

  cardImage.src = initialCard.link;
  cardImage.alt = initialCard.name;
  cardTitle.textContent = initialCard.name;
  cardLikeCounter.textContent = initialCard.likes.length;

  const deleteButton = card.querySelector(".card__delete-button");
  if (userId !== initialCard.owner._id) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.addEventListener("click", () => openDeletePopup(card));
  }

  const likeButton = card.querySelector(".card__like-button");
  likeButton.addEventListener("click", () =>
    likeCard(likeButton, card.getAttribute("data-id"), cardLikeCounter)
  );

  cardImage.addEventListener("click", () =>
    viewingCard(cardImage.src, cardImage.alt, cardTitle.textContent)
  );

  if (initialCard.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  return card;
}

// Обработка лайков
export function likeCard(likeButton, cardId, cardLikeCounter) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    deleteLike(cardId)
      .then((res) => {
        likeButton.classList.toggle("card__like-button_is-active");
        cardLikeCounter.textContent = res.likes.length;
      })
      .catch((err) => console.error("Error removing like:", err));
  } else {
    addLike(cardId)
      .then((res) => {
        likeButton.classList.toggle("card__like-button_is-active");
        cardLikeCounter.textContent = res.likes.length;
      })
      .catch((err) => console.error("Error adding like:", err));
  }
}
