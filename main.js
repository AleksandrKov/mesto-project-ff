(()=>{"use strict";var e={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},t=function(t){var n=Array.from(t.querySelectorAll(e.inputSelector)),c=t.querySelector(e.submitButtonSelector);o(n,c),n.forEach((function(e){e.addEventListener("input",(function(){r(t,e),o(n,c)}))}))},n=function(t,n){var r=t.querySelector(".".concat(n.id,"-error"));n.classList.remove(e.inputErrorClass),r.classList.remove(e.errorClass),r.textContent=""},r=function(t,r){r.validity.patternMismatch?r.setCustomValidity(r.dataset.error):r.setCustomValidity(""),r.validity.valid?n(t,r):function(t,n){var r=t.querySelector(".".concat(n.id,"-error"));n.classList.add(e.inputErrorClass),r.classList.add(e.errorClass),r.textContent=n.validationMessage}(t,r)},o=function(t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?(n.disabled=!1,n.classList.remove(e.inactiveButtonClass)):(n.disabled=!0,n.classList.add(e.inactiveButtonClass))};function c(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),c=e.querySelector(t.submitButtonSelector);r.forEach((function(t){t.value="",n(e,t)})),o(r,c)}function a(t){t.querySelector("input")&&c(t,e),t.classList.add("popup_is-opened"),document.addEventListener("keydown",i),document.addEventListener("click",i)}function i(e){(e.target.classList.contains("popup__close")||e.target.classList.contains("popup")||"Escape"===e.key)&&u(document.querySelector(".popup_is-opened"))}function u(t){t.classList.remove("popup_is-opened"),document.removeEventListener("click",i),document.addEventListener("keydown",i),t.querySelector("input")&&c(t,e)}var l={baseUrl:"https://nomoreparties.co/v1/wff-cohort-17",headers:{authorization:"d936029b-1839-4111-97fd-d146df2432b7","Content-Type":"application/json"},endlink:{userInfo:"/users/me",cards:"/cards",likes:"/cards/likes/",userAvatar:"/users/me/avatar"}};function s(e){return e.ok?e.json():Promise.reject("ошибка: ".concat(e.status))}var d=document.querySelector("#card-template").content;function p(e,t,n,r,o){var c=d.querySelector(".card").cloneNode(!0),a=c.querySelector(".card__image"),i=c.querySelector(".card__title"),u=c.querySelector(".card__like-counter");c.setAttribute("data-id",e._id);var l=document.querySelector(".popup_confirm");a.src=e.link,a.alt=e.name,i.textContent=e.name,u.textContent=e.likes.length;var s=c.querySelector(".card__delete-button");o!==e.owner._id?s.style.display="none":s.addEventListener("click",(function(){return f(c,l)}));var p=c.querySelector(".card__like-button");return p.addEventListener("click",(function(){return n(p,c.getAttribute("data-id"),u)})),a.addEventListener("click",(function(){return r(a.src,a.alt,i.textContent)})),e.likes.some((function(e){return e._id===o}))&&p.classList.add("card__like-button_is-active"),c}function f(e,t){a(t);var n=t.querySelector(".popup__button");n.addEventListener("click",(function r(o){o.preventDefault(),function(e,t){(n=e.getAttribute("data-id"),fetch("".concat(l.baseUrl).concat(l.endlink.cards,"/").concat(n),{method:"DELETE",headers:l.headers}).then(s)).then((function(){e.remove(),u(t)})).catch((function(e){console.error("Error deleting card:",e),u(t)}));var n}(e,t),n.removeEventListener("click",r)}))}function _(e,t,n){e.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(l.baseUrl).concat(l.endlink.likes,"/").concat(e),{method:"DELETE",headers:l.headers}).then(s)}(t).then((function(t){e.classList.toggle("card__like-button_is-active"),n.textContent=t.likes.length})).catch((function(e){return console.error("Error removing like:",e)})):function(e){return fetch("".concat(l.baseUrl).concat(l.endlink.likes,"/").concat(e),{method:"PUT",headers:l.headers}).then(s)}(t).then((function(t){e.classList.toggle("card__like-button_is-active"),n.textContent=t.likes.length})).catch((function(e){return console.error("Error adding like:",e)}))}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var y="",v=document.querySelector(".places__list"),h=document.querySelector(".profile__title"),S=document.querySelector(".profile__description"),b=document.forms["edit-profile"],q=document.querySelector(".popup_type_edit"),k=document.querySelector(".profile__edit-button"),g=document.querySelector('form[name="edit-profile"]'),E=document.querySelector(".profile__image"),L=document.querySelector(".popup__input_type_name"),C=document.querySelector(".popup__input_type_description"),A=document.querySelector(".popup_type_new-card"),x=document.querySelector(".profile__add-button"),U=document.querySelector('form[name="new-place"]'),w=document.querySelector(".popup__input_type_card-name"),T=document.querySelector(".popup__input_type_url"),j=document.querySelector(".popup_type_image"),D=j.querySelector(".popup__image"),O=j.querySelector(".popup__caption"),B=document.querySelector(".popup__input_avatar_url"),I=document.querySelector('form[name="new-avatar"]'),P=document.querySelector(".profile__image-button"),N=document.querySelector(".popup_avatar_image");function J(e){h.textContent=e.name,S.textContent=e.about,E.setAttribute("style","background-image: url(".concat(e.avatar,")")),y=e._id}function M(e,t,n){a(j),D.setAttribute("src",e),D.setAttribute("alt",t),O.textContent=n}function H(e,t){t.textContent=e?"Сохранение...":"Сохранить"}g.addEventListener("submit",(function(e){e.preventDefault();var t,n,r=e.target.querySelector(".popup__button");H(!0,r),(t=L.value,n=C.value,fetch("".concat(l.baseUrl).concat(l.endlink.userInfo),{method:"PATCH",headers:l.headers,body:JSON.stringify({name:t,about:n})}).then(s)).then((function(e){J(e),u(q)})).catch((function(e){console.error("Произошла ошибка при добавлении данных:",e)})).finally((function(){H(!1,r)}))})),I.addEventListener("submit",(function(t){t.preventDefault();var n,r=t.target.querySelector(".popup__button");H(!0,r),(n=B.value,fetch("".concat(l.baseUrl).concat(l.endlink.userAvatar),{method:"PATCH",headers:l.headers,body:JSON.stringify({avatar:n})}).then(s)).then((function(t){J(t),u(N),c(N,e)})).catch((function(e){console.error("Произошла ошибка при изменении аватарки:",e)})).finally((function(){H(!1,r)}))})),U.addEventListener("submit",(function(e){e.preventDefault();var t,n,r=e.target.querySelector(".popup__button");H(!0,r),(t=w.value,n=T.value,fetch("".concat(l.baseUrl).concat(l.endlink.cards),{method:"POST",headers:l.headers,body:JSON.stringify({name:t,link:n})}).then(s)).then((function(e){!function(e){v.prepend(p(e,0,_,M,y))}(e),u(A)})).catch((function(e){console.error("Произошла ошибка при добавлении карточки:",e)})).finally((function(){H(!1,r)}))})),k.addEventListener("click",(function(){var e,t,n;a(q),e=b,t=h.textContent,n=S.textContent,e.elements.name.value=t,e.elements.description.value=n})),x.addEventListener("click",(function(){a(A)})),P.addEventListener("click",(function(){a(N)})),Promise.all([fetch("".concat(l.baseUrl).concat(l.endlink.userInfo),{headers:l.headers}).then(s),fetch("".concat(l.baseUrl).concat(l.endlink.cards),{headers:l.headers}).then(s)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];J(o),function(e){e.forEach((function(e){v.append(p(e,0,_,M,y))}))}(c),console.log(c)})).catch((function(e){console.error("Произошла ошибка при получении данных:",e)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),t(e)}))}(e)})();