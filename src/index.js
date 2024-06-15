import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { openModal, closeModal } from "./scripts/modal";
import {
  createCard,
  deletteCard,
  likeCard
} from "./scripts/card.js";

// создание переменных
const cardsContainer = document.querySelector(".places__list");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupEditProfile = document.forms["edit-profile"];
const popupProfile = document.querySelector(".popup_type_edit");
const profileEditButton = document.querySelector(".profile__edit-button");
const formElement = document.querySelector('form[name="edit-profile"]');
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

// функции
// функция вывода всех карточек на страницу
function initialCard(cards) {
  cards.forEach((initialCard) => {
    cardsContainer.append(
      createCard(initialCard, deletteCard, likeCard, viewingCard)
    );
  });
}

// вывод новой карточки на страницу
function addNewCard(newCard) {
  cardsContainer.prepend(
    createCard(newCard, deletteCard, likeCard, viewingCard)
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
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(popupProfile);
  formElement.reset();
}

// добавление новой карточки
function handleFormSubmitNewPlace(evt) {
  evt.preventDefault();
  const newCard = { name: cardNameInput.value, link: typeUrlInput.value };
  closeModal(popupTypeNewCard);
  addNewCard(newCard);
  formNewPlace.reset();
}

// окно увеличенного просмотра карточки
function viewingCard(src, alt, textContent) {
  openModal(popupTimeImage);
  popupImage.setAttribute("src", src);
  popupImage.setAttribute("alt", alt);
  popupCaption.textContent = textContent;
}

// установка слушателей
// открытие попапа профиля
profileEditButton.addEventListener("click", () => {
  setProfilePopup(
    popupEditProfile,
    profileTitle.textContent,
    profileDescription.textContent
  );
  openModal(popupProfile);
});

// редактирования профиля
formElement.addEventListener("submit", handleFormSubmitEditProfile);

// добавление новой карточки на сайт
profileAddButton.addEventListener("click", () => {
  formNewPlace.reset();
  openModal(popupTypeNewCard);
});

formNewPlace.addEventListener("submit", handleFormSubmitNewPlace);

// вызов функции вывода всех карточек на страницу
initialCard(initialCards);
