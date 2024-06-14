import "./pages/index.css";

// вызов функции вывода всех карточек на страницу
import { initialCards } from "./scripts/cards.js";
import { initialCard } from "./scripts/card.js";
initialCard(initialCards);

// открытие попапа профиля
import { openModal } from "./scripts/modal";
import { closeModal } from "./scripts/modal";

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupEditProfile = document.forms["edit-profile"];
const popupProfile = document.querySelector(".popup_type_edit");

const profileEditButton = document.querySelector(".profile__edit-button");
profileEditButton.addEventListener("click", () => {
  setProfilePopup(
    popupEditProfile,
    profileTitle.textContent,
    profileDescription.textContent
  );
  openModal(popupProfile);
});

// установка текущих данных профиля
const setProfilePopup = (form, name, description) => {
  form.elements.name.value = name;
  form.elements.description.value = description;
};

// редактирования профиля
const formElement = document.querySelector('form[name="edit-profile"]');
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description"
);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(popupProfile);
  formElement.reset();
}

formElement.addEventListener("submit", handleFormSubmit);

// добавление новой карточки на сайт
import { addNewCard } from "./scripts/card.js";
const popupTypeNewCard = document.querySelector(".popup_type_new-card");

const profileAddButton = document.querySelector(".profile__add-button");
profileAddButton.addEventListener("click", () => {
  formNewPlace.reset();
  openModal(popupTypeNewCard);
});

const formNewPlace = document.querySelector('form[name="new-place"]');
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const typeUrlInput = document.querySelector(".popup__input_type_url");

function handleFormAddCard(evt) {
  evt.preventDefault();
  const newCard = { name: cardNameInput.value, link: typeUrlInput.value };
  closeModal(popupTypeNewCard);
  addNewCard(newCard);
  formNewPlace.reset();
}

formNewPlace.addEventListener("submit", handleFormAddCard);

// окно увеличенного просмотра карточки
const popupTimeImage = document.querySelector(".popup_type_image");
const popupImage = popupTimeImage.querySelector(".popup__image");
const popupCaption = popupTimeImage.querySelector(".popup__caption");

export function cardView(src, alt, textContent) {
  openModal(popupTimeImage);
  popupImage.setAttribute("src", src);
  popupImage.setAttribute("alt", alt);
  popupCaption.textContent = textContent;
}
