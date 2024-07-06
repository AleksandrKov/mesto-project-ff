import "./pages/index.css";
import { openModal, closeModal } from "./scripts/modal";
import { createCard, deleteCard, likeCard } from "./scripts/card.js";
import {
  enableValidation,
  validationConfig,
  clearValidation,
} from "./scripts/validation.js";
import {
  getInitialCards,
  getUserInfo,
  apiConfig,
  setUserInfo,
  patchNewCard,
  patchNewAvatar,
} from "./scripts/api.js";

// создание переменных
let userId = "";
const cardsContainer = document.querySelector(".places__list");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupEditProfile = document.forms["edit-profile"];
const popupProfile = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const formElement = document.querySelector('form[name="edit-profile"]');
const profileImage = document.querySelector(".profile__image");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description"
);
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const profileAddButton = document.querySelector(".profile__add-button");
const formNewPlace = document.querySelector('form[name="new-place"]');
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const typeUrlInput = document.querySelector(".popup__input_type_url");
const popupTimeImage = document.querySelector(".popup_type_image");
const popupImage = popupTimeImage.querySelector(".popup__image");
const popupCaption = popupTimeImage.querySelector(".popup__caption");
const avatarInput = document.querySelector(".popup__input_avatar_url");
const formNewAvatar = document.querySelector('form[name="new-avatar"]');
const profileImageButton = document.querySelector(".profile__image-button");
const popupAvatarImage = document.querySelector(".popup_avatar_image");

// функции
// функция вывода всех карточек на страницу
function initialCard(cards) {
  cards.forEach((initialCard) => {
    cardsContainer.append(
      createCard(initialCard, deleteCard, likeCard, viewingCard, userId)
    );
  });
}

// вывод новой карточки на страницу
function addNewCard(newCard) {
  cardsContainer.prepend(
    createCard(newCard, deleteCard, likeCard, viewingCard, userId)
  );
}

// установка текущих данных профиля
function setProfilePopup(form, name, description) {
  form.elements.name.value = name;
  form.elements.description.value = description;
}

// установка новых данных пользователя
function handleFormSubmitEditProfile(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(".popup__button");

  toggleButtonName(true, submitButton);

  const name = nameInput.value;
  const description = descriptionInput.value;

  setUserInfo(name, description)
    .then((user) => {
      setUserProfileFromServer(user);
      closeModal(popupProfile);
    })
    .catch((err) => {
      console.error("Произошла ошибка при добавлении данных:", err);
    })
    .finally(() => {
      toggleButtonName(false, submitButton);
    });
}

// установка данных пользователя с сервера
function setUserProfileFromServer(user) {
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;
  profileImage.setAttribute("style", `background-image: url(${user.avatar})`);
  userId = user._id;
}

// добавление новой карточки
function handleFormSubmitNewPlace(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(".popup__button");

  toggleButtonName(true, submitButton);
  const name = cardNameInput.value;
  const link = typeUrlInput.value;

  patchNewCard(name, link)
    .then((newCard) => {
      addNewCard(newCard);
      closeModal(popupTypeNewCard);
    })
    .catch((err) => {
      console.error("Произошла ошибка при добавлении карточки:", err);
    })
    .finally(() => {
      toggleButtonName(false, submitButton);
    });
}

// изменение аватарки
function handleFormSubmitNewAvatar(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(".popup__button");

  toggleButtonName(true, submitButton);
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
      toggleButtonName(false, submitButton);
    });
}

// окно увеличенного просмотра карточки
function viewingCard(src, alt, textContent) {
  openModal(popupTimeImage);
  popupImage.setAttribute("src", src);
  popupImage.setAttribute("alt", alt);
  popupCaption.textContent = textContent;
}

function toggleButtonName(isLoading, button) {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
}

// установка слушателей
// редактирования профиля
formElement.addEventListener("submit", handleFormSubmitEditProfile);

// создание карточки
formNewAvatar.addEventListener("submit", handleFormSubmitNewAvatar);

// замена аватарки
formNewPlace.addEventListener("submit", handleFormSubmitNewPlace);

// открытие попапов
// профиль
profileEditButton.addEventListener("click", () => {
  openModal(popupProfile);
  setProfilePopup(
    popupEditProfile,
    profileTitle.textContent,
    profileDescription.textContent
  );
});

// добавление новой карточки на сайт
profileAddButton.addEventListener("click", () => {
  openModal(popupTypeNewCard);
});

// изменение аватара
profileImageButton.addEventListener("click", () => {
  openModal(popupAvatarImage);
});

// получение профиля и карточек с сервера
Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    setUserProfileFromServer(user);
    initialCard(cards);
    console.log(cards);
  })
  .catch((err) => {
    console.error("Произошла ошибка при получении данных:", err);
  });

enableValidation(validationConfig);

