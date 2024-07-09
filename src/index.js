import "./pages/index.css";
import { openModal, closeModal } from "./scripts/modal";
import { createCard, likeCard } from "./scripts/card.js";
import {
  enableValidation,
  clearValidation
} from "./scripts/validation.js";
import {
  getInitialCards,
  getUserInfo,
  apiConfig,
  setUserInfo,
  patchNewCard,
  patchNewAvatar,
  deleteCardApi
} from "./scripts/api.js";

let userId = "";
let cardToDelete = null;
const cardsContainer = document.querySelector(".places__list");
const profileImageButton = document.querySelector(".profile__image-button");
const profileImage = document.querySelector(".profile__image");
const profileTitle = document.querySelector(".profile__title");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileDescription = document.querySelector(".profile__description");
const profileAddButton = document.querySelector(".profile__add-button");
const popUpTypeEdit = document.querySelector(".popup_type_edit");
const formElementEditProfile = document.forms["edit-profile"];
const nameInput = formElementEditProfile.querySelector(
  ".popup__input_type_name"
);
const descriptionInput = formElementEditProfile.querySelector(
  ".popup__input_type_description"
);
const formElementEditProfileSubmit =
  formElementEditProfile.querySelector(".popup__button");

const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const formElementNewPlace = document.forms["new-place"];
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const typeUrlInput = document.querySelector(".popup__input_type_url");
const formElementNewPlaceSubmit =
  formElementNewPlace.querySelector(".popup__button");

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupAvatarImage = document.querySelector(".popup_avatar_image");
const formElementNewAvatar = document.forms["new-avatar"];
const avatarInput = document.querySelector(".popup__input_avatar_url");
const formElementNewAvatarSubmit =
  formElementNewAvatar.querySelector(".popup__button");

const popupConfirm = document.querySelector(".popup_confirm");
const formElementCardDeleteConfirm = document.forms["card-delete-confirm"];
const formElementCardDeleteConfirmSubmit =
  formElementCardDeleteConfirm.querySelector(".popup__button");

// // настройки валидации
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// функции
// установка данных пользователя с сервера
function setUserProfileFromServer(user) {
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;
  profileImage.setAttribute("style", `background-image: url(${user.avatar})`);
  userId = user._id;
}

// вывод всех карточек на страницу
function initialCard(cards) {
  cards.forEach((initialCard) => {
    cardsContainer.append(
      createCard(initialCard, openDeletePopup, likeCard, viewingCard, userId)
    );
  });
}

// вывод новой карточки на страницу
function addNewCard(newCard) {
  cardsContainer.prepend(
    createCard(newCard, openDeletePopup, likeCard, viewingCard, userId)
  );
}

// установка новых данных пользователя
function handleFormSubmitEditProfile(evt) {
  evt.preventDefault();

  toggleButtonName(true, formElementEditProfileSubmit);

  setUserInfo(nameInput.value, descriptionInput.value)
    .then((user) => {
      setUserProfileFromServer(user);
      closeModal(popUpTypeEdit);
    })
    .catch((err) => {
      console.error("Произошла ошибка при добавлении данных:", err);
    })
    .finally(() => {
      toggleButtonName(false, formElementEditProfileSubmit);
    });
}

// добавление новой карточки
function handleFormSubmitNewPlace(evt) {
  evt.preventDefault();

  toggleButtonName(true, formElementNewPlaceSubmit);
  patchNewCard(cardNameInput.value, typeUrlInput.value)
    .then((newCard) => {
      addNewCard(newCard);
      closeModal(popupTypeNewCard);
    })
    .catch((err) => {
      console.error("Произошла ошибка при добавлении карточки:", err);
    })
    .finally(() => {
      toggleButtonName(false, formElementNewPlaceSubmit);
    });
}

// изменение аватарки
function handleFormSubmitNewAvatar(evt) {
  evt.preventDefault();

  toggleButtonName(true, formElementNewAvatarSubmit);
  const link = avatarInput.value;

  patchNewAvatar(link)
    .then((user) => {
      setUserProfileFromServer(user);
      closeModal(popupAvatarImage);
      clearValidation(popupAvatarImage, validationConfig);
    })
    .catch((err) => {
      console.error("Произошла ошибка при изменении аватарки:", err);
    })
    .finally(() => {
      toggleButtonName(false, formElementNewAvatarSubmit);
    });
}

// удаление карточки
function handleFormSubmitConfirmDelete(evt) {
  evt.preventDefault();
  if (cardToDelete) {
    deleteCardApi(cardToDelete.getAttribute("data-id"))
      .then(() => {
        cardToDelete.remove();
        cardToDelete = null;
        closeModal(popupConfirm);
      })
      .catch((err) => {
        console.error("Error deleting card:", err);
      });
  }
  return;
}

// изменение названия кнопки при сохранении
function toggleButtonName(isLoading, button) {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
}

// установка слушателей
// редактирования профиля
formElementEditProfile.addEventListener("submit", handleFormSubmitEditProfile);

// замена аватарки
formElementNewAvatar.addEventListener("submit", handleFormSubmitNewAvatar);

// создание карточки
formElementNewPlace.addEventListener("submit", handleFormSubmitNewPlace);

// // подтверждение удаления карточки
formElementCardDeleteConfirm.addEventListener(
  "submit",
  handleFormSubmitConfirmDelete
);

// открытие попапов
// профиль
profileEditButton.addEventListener("click", () => {
  openModal(popUpTypeEdit);
  clearValidation(popUpTypeEdit, validationConfig);
  formElementEditProfile.elements.name.value = profileTitle.textContent;
  formElementEditProfile.description.value = profileDescription.textContent;
});

// добавление новой карточки на сайт
profileAddButton.addEventListener("click", () => {
  clearValidation(popupTypeNewCard, validationConfig);
  openModal(popupTypeNewCard);
});

// изменение аватара
profileImageButton.addEventListener("click", () => {
  clearValidation(popupAvatarImage, validationConfig);
  openModal(popupAvatarImage);
});

// окно увеличенного просмотра карточки
function viewingCard(src, alt, text) {
  openModal(popupTypeImage);
  popupImage.setAttribute("src", src);
  popupImage.setAttribute("alt", alt);
  popupCaption.textContent = text;
}

// окно подтверждения удаления карточки
export function openDeletePopup(card) {
  cardToDelete = card;
  openModal(popupConfirm);
}

// получение профиля и карточек с сервера
Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    setUserProfileFromServer(user);
    initialCard(cards);
  })
  .catch((err) => {
    console.error("Произошла ошибка при получении данных:", err);
  });

enableValidation(validationConfig);