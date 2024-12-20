import '../pages/index.css';
import { enableValidation } from './validation';
import { createCard } from './card';
import { openModal, closeModal } from './modal';

import { getUser, getCards, updateProfile, addCard, deleteCard, putLike, like, updateAvatar } from './api';

// Предобработка поп-апов (плавное появление)
const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const popupAvatar = document.querySelector('.popup_type_avatar');
[profilePopup, cardPopup, imagePopup, popupAvatar].forEach((popup) => {
  popup.classList.add("popup_is-animated");
});


// ---> Работа с поп-апом редактирования профиля
// Получение элементов поп-апа
const profileForm = profilePopup.querySelector(".popup__form");
const inputName = profileForm.querySelector(".popup__input_type_name");
const inputJob = profileForm.querySelector(".popup__input_type_description");
const buttonEditProfileClose = profilePopup.querySelector(".popup__close");
const buttonEditProfileSave = profilePopup.querySelector(".popup__button");

// Элементы страницы, связанные с поп-апом
const titleName = document.querySelector(".profile__title");
const titleJob = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const buttonEditProfile = document.querySelector(".profile__edit-button");

// Запрос и заполнение данных о пользователе с сервера
function setUserData(){
  getUser()
    .then(userInfo => {
      titleName.textContent = userInfo.name;
      titleJob.textContent = userInfo.about;
      profileAvatar.style.backgroundImage = `url(${userInfo.avatar})`;
      localStorage.setItem('userId', userInfo._id);
    })
    .catch(err => console.log(err));
}
setUserData();

// Обработка клика на кнопку редактирования профиля
buttonEditProfile.addEventListener("click", function() {
  inputName.value = titleName.textContent;
  inputName.dispatchEvent(new Event('input'));
  inputJob.value = titleJob.textContent;
  inputJob.dispatchEvent(new Event('input'));
  openModal(profilePopup);
});

// Обработка закртытия поп-апа по кнопке закрытия
buttonEditProfileClose.addEventListener("click", function() {
  closeModal(profilePopup);
});

// Обработка отправки формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  buttonEditProfileSave.textContent = "Сохранение...";
  updateProfile(inputName.value, inputJob.value)
    .then(res => {
      titleName.textContent = res.name;
      titleJob.textContent = res.about;
      profileAvatar.style.backgroundImage = `url(${res.avatar})`;
      closeModal(profilePopup);
    })
    .catch(res => console.log(res))
    .finally(res => {
      buttonEditProfileSave.textContent = "Сохранить";
    })
}
profileForm.addEventListener('submit', handleProfileFormSubmit);

// ---> Работа с поп-апом добавления карточки и поп-апом просмотра фотографии
// Переменные для поп-апа добавления карточки
const buttonCard = document.querySelector(".profile__add-button");
const buttonCardClose = cardPopup.querySelector(".popup__close");
const cardForm = cardPopup.querySelector(".popup__form");
const inputCardName = cardForm.querySelector(".popup__input_type_card-name");
const inputCardUrl = cardForm.querySelector(".popup__input_type_url");
const cardsPlace = document.querySelector(".places__list");
const buttonCardPopupSave = cardPopup.querySelector(".popup__button");

// Переменные для поп-апа с фотографией
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupTitle = imagePopup.querySelector(".popup__caption");
const imagePopupButtonClose = imagePopup.querySelector(".popup__close");

// Обработка открытия поп-апа добавления карточки
buttonCard.addEventListener("click", () => {
  inputCardName.value = "";
  inputCardUrl.value = "";
  openModal(cardPopup);
});

// Обработка закрытия поп-апа добавления карточки
buttonCardClose.addEventListener("click", () => {
  closeModal(cardPopup);
});

// Обработка добавления карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  buttonCardPopupSave.textContent = "Сохранение...";
  addCard(inputCardName.value, inputCardUrl.value)
    .then(res => {
      console.log("Добавлена карточка", res);
      const newCard = createCard(res);
      cardsPlace.prepend(newCard);
      closeModal(cardPopup);
    })
    .catch(res => console.log(res))
    .finally(res => {
      buttonCardPopupSave.textContent = "Сохранить";
    })
}
cardForm.addEventListener("submit", (evt) => {
  handleCardFormSubmit(evt);
});

// Темплейт карточки
const templateCardContent = document.getElementById("card-template").content;


// Заполнение поп-апа с фотографией
function fillImagePopup(title, imageUrl) {
  imagePopupTitle.textContent = title;
  imagePopupImage.src = imageUrl;
  imagePopupImage.alt = "Фотография места";
}

//---> Работа с поп-апом изменения аватарки
const buttonAvatar = document.querySelector('.profile__image-cover');
const buttonAvatarSubmit = popupAvatar.querySelector('.popup__button');
const inputAvatarLink = popupAvatar.querySelector('.popup__input');
const buttonAvatarClose = popupAvatar.querySelector('.popup__close');

buttonAvatar.addEventListener('click', () => {
  openModal(popupAvatar);
});

buttonEditProfile.addEventListener("click", function() {
  inputName.value = titleName.textContent;
  inputName.dispatchEvent(new Event('input'));
  inputJob.value = titleJob.textContent;
  inputJob.dispatchEvent(new Event('input'));
  openModal(profilePopup);
});

buttonAvatarClose.addEventListener('click', () => {
  closeModal(popupAvatar);
})

// Обработка добавления карточки
function handleAvatarSubmit(evt) {
  evt.preventDefault();
  buttonAvatarSubmit.textContent = "Сохранение...";
  updateAvatar(inputAvatarLink.value)
    .then(res => {
      console.log("Аватарка обновлена, вот ответ от сервера:", res);
      setUserData();
      closeModal(popupAvatar);
    })
    .catch(res => console.log(res))
    .finally(res => {
      buttonAvatarSubmit.textContent = "Сохранить";
    })
}
popupAvatar.addEventListener('submit', handleAvatarSubmit);

// Запрос и вывод карточек на страницу
function insertInitialCards() {
  getCards()
    .then(res => {
      res.forEach(function(cardInfo){
        const newCard = createCard(cardInfo);
        cardsPlace.append(newCard);
      });
    })
    .catch(err => console.log(err));
}

// Вызов функции вывода начальных карточек
insertInitialCards();

// ---> Работа с валидацией
// Создание объекта с настройками валидации
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation(validationSettings);

// --> Работа с кликом по оверлею
const popupBlock = document.querySelectorAll('.popup');

popupBlock.forEach(popup => {
  popup.addEventListener('click', (event) => {
    const clickTarget = event.target;
    if (clickTarget.classList.contains("popup")) {
      closeModal(clickTarget);
    }
  });
});

export { templateCardContent, imagePopup, imagePopupImage, imagePopupTitle, imagePopupButtonClose, fillImagePopup }
