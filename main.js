(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e,t,n){e.some((function(e){return!e.validity.valid}))?(t.classList.add(n),t.disabled=!0):(t.classList.remove(n),t.disabled=!1)}e.d({},{Rk:()=>O,y6:()=>s,Kq:()=>T,yz:()=>A});var n={baseUrl:"https://nomoreparties.co/v1/frontend-st-cohort-201",headers:{authorization:"75a08035-fad0-499b-9c71-b4f28d096f52","Content-Type":"application/json"}};localStorage.setItem("config",n);var o=function(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))};function r(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",a)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",a)}function a(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}function u(e){var t=e.likes,a=A.cloneNode(!0),u=a.querySelector(".card__title"),i=a.querySelector(".card__image"),l=a.querySelector(".card__like-button"),d=a.querySelector(".card__delete-button"),p=a.querySelector(".card__like-counter");return u.textContent=e.name,p.textContent=t.length,i.src=e.link,i.alt="Фотография места",t.some((function(e){return e._id===localStorage.getItem("userId")}))&&l.classList.toggle("card__like-button_is-active"),console.log("owner: ",e.owner._id,e),e.owner._id===localStorage.getItem("userId")?d.addEventListener("click",(function(){var t;t=e._id,fetch("".concat(n.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:n.headers}).then(o),d.closest(".card").remove()})):d.style.display="none",l.addEventListener("click",(function(){var r;t.some((function(e){return e._id===localStorage.getItem("userId")}))?(r=e._id,fetch("".concat(n.baseUrl,"/cards/likes/").concat(r),{method:"DELETE",headers:n.headers}).then(o)).then((function(e){t=e.likes,p.textContent=e.likes.length})).catch((function(e){return console.log(e)})):function(e){return fetch("".concat(n.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:n.headers}).then(o)}(e._id).then((function(e){t=e.likes,p.textContent=e.likes.length})).catch((function(e){return console.log(e)})),l.classList.toggle("card__like-button_is-active")})),i.addEventListener("click",(function(){O(e.name,e.link),r(s)})),T.addEventListener("click",(function(){c(s)})),a}var i=document.querySelector(".popup_type_edit"),l=document.querySelector(".popup_type_new-card"),s=document.querySelector(".popup_type_image"),d=document.querySelector(".popup_type_avatar");[i,l,s,d].forEach((function(e){e.classList.add("popup_is-animated")}));var p=i.querySelector(".popup__form"),_=p.querySelector(".popup__input_type_name"),f=p.querySelector(".popup__input_type_description"),v=i.querySelector(".popup__close"),m=i.querySelector(".popup__button"),y=document.querySelector(".profile__title"),h=document.querySelector(".profile__description"),S=document.querySelector(".profile__image"),g=document.querySelector(".profile__edit-button");function E(){fetch("".concat(n.baseUrl,"/users/me"),{method:"GET",headers:n.headers}).then(o).then((function(e){y.textContent=e.name,h.textContent=e.about,S.style.backgroundImage="url(".concat(e.avatar,")"),localStorage.setItem("userId",e._id)})).catch((function(e){return console.log(e)}))}E(),g.addEventListener("click",(function(){_.value=y.textContent,_.dispatchEvent(new Event("input")),f.value=h.textContent,f.dispatchEvent(new Event("input")),r(i)})),v.addEventListener("click",(function(){c(i)})),p.addEventListener("submit",(function(e){var t,r;e.preventDefault(),m.textContent="Сохранение...",(t=_.value,r=f.value,fetch("".concat(n.baseUrl,"/users/me"),{method:"PATCH",headers:n.headers,body:JSON.stringify({name:t,about:r})}).then(o)).then((function(e){y.textContent=e.name,h.textContent=e.about,S.style.backgroundImage="url(".concat(e.avatar,")"),c(i)})).catch((function(e){return console.log(e)})).finally((function(e){m.textContent="Сохранить"}))}));var b=document.querySelector(".profile__add-button"),q=l.querySelector(".popup__close"),k=l.querySelector(".popup__form"),C=k.querySelector(".popup__input_type_card-name"),L=k.querySelector(".popup__input_type_url"),x=document.querySelector(".places__list"),I=l.querySelector(".popup__button"),w=s.querySelector(".popup__image"),U=s.querySelector(".popup__caption"),T=s.querySelector(".popup__close");b.addEventListener("click",(function(){C.value="",L.value="",r(l)})),q.addEventListener("click",(function(){c(l)})),k.addEventListener("submit",(function(e){!function(e){var t,r;e.preventDefault(),I.textContent="Сохранение...",(t=C.value,r=L.value,fetch("".concat(n.baseUrl,"/cards"),{method:"POST",headers:n.headers,body:JSON.stringify({name:t,link:r})}).then(o)).then((function(e){console.log("Добавлена карточка",e);var t=u(e);x.prepend(t),c(l)})).catch((function(e){return console.log(e)})).finally((function(e){I.textContent="Сохранить"}))}(e)}));var A=document.getElementById("card-template").content;function O(e,t){U.textContent=e,w.src=t,w.alt="Фотография места"}var P=document.querySelector(".profile__image-cover"),B=d.querySelector(".popup__button"),j=d.querySelector(".popup__input"),D=d.querySelector(".popup__close");P.addEventListener("click",(function(){r(d)})),g.addEventListener("click",(function(){_.value=y.textContent,_.dispatchEvent(new Event("input")),f.value=h.textContent,f.dispatchEvent(new Event("input")),r(i)})),D.addEventListener("click",(function(){c(d)})),d.addEventListener("submit",(function(e){var t;e.preventDefault(),B.textContent="Сохранение...",(t=j.value,fetch("".concat(n.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:n.headers,body:JSON.stringify({avatar:t})}).then(o)).then((function(e){console.log("Аватарка обновлена, вот ответ от сервера:",e),E(),c(d)})).catch((function(e){return console.log(e)})).finally((function(e){B.textContent="Сохранить"}))})),fetch("".concat(n.baseUrl,"/cards"),{method:"GET",headers:n.headers}).then(o).then((function(e){e.forEach((function(e){var t=u(e);x.append(t)}))})).catch((function(e){return console.log(e)})),function(e){console.log("Применение валидации");var n=Array.from(document.querySelectorAll(e.formSelector));console.log("Полученный formList: ",n),n.forEach((function(n){!function(e,n){var o=Array.from(e.querySelectorAll(n.inputSelector)),r=e.querySelector(n.submitButtonSelector);t(o,r,n.inactiveButtonClass),o.forEach((function(c){c.addEventListener("input",(function(){!function(e,t,n){t.validity.valid?(function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""}(e,t,n),console.log("Правильный ввод")):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(e,c,n),t(o,r,n.inactiveButtonClass)}))}))}(n,e)}))}({formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_visible"}),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",(function(e){var t=e.target;t.classList.contains("popup")&&c(t)}))}))})();