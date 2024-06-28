// import { validationConfig } from "./validation";

//открытие модального окна
export function openModal(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalEvents);
  document.addEventListener("click", closeModalEvents);
}

// события закрывающие модадьное окно
function closeModalEvents(evt) {
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup") ||
    evt.key === "Escape"
  ) {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

// закрытие модального окна
export function closeModal(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("click", closeModalEvents);
  document.addEventListener("keydown", closeModalEvents);
}
