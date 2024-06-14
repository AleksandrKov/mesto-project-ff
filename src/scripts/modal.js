//открытие модального окна
export function openModal(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", eventsCloseModal);
  document.addEventListener("click", eventsCloseModal);
}

// события закрывающие модадьное окно
function eventsCloseModal(evt) {
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
  document.removeEventListener("click", eventsCloseModal);
  document.addEventListener("keydown", eventsCloseModal);
}
