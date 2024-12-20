import { setLike, removeLike, deleteCard } from "./api";
import { templateCardContent, imagePopup, imagePopupImage, imagePopupTitle, imagePopupButtonClose, fillImagePopup } from "./index";
import { openModal, closeModal } from './modal';

export function createCard(cardInfo) {
  let likes = cardInfo.likes;
  // Создание новой карточки и получение её карточки
  const newCard = templateCardContent.cloneNode(true);
  const newCardTitle = newCard.querySelector(".card__title");
  const newCardImage = newCard.querySelector(".card__image");
  const newCardButtonLike = newCard.querySelector(".card__like-button");
  const newCardButtonDelete = newCard.querySelector(".card__delete-button");
  const newCardLikeCounter = newCard.querySelector(".card__like-counter");

  // Установление названия, картинки карточки и количества лайков
  newCardTitle.textContent = cardInfo.name;
  newCardLikeCounter.textContent = likes.length;
  newCardImage.src = cardInfo.link;
  newCardImage.alt = "Фотография места";

  // Работа с начальными параметрами карточки
  // Вычисление того, был ли поставлен лайк
  const hasLike = likes.some(user => {
    return user._id === localStorage.getItem('userId');
  });
  if (hasLike) {
    newCardButtonLike.classList.toggle("card__like-button_is-active");
  }

  // Вычисление того, нужно ли показывать кнопку удаления
  console.log("owner: ", cardInfo.owner._id, cardInfo);
  if (cardInfo.owner._id === localStorage.getItem('userId')) {
    newCardButtonDelete.addEventListener("click", () => {
      deleteCard(cardInfo._id);
      newCardButtonDelete.closest(".card").remove();
    });
  } else {
    newCardButtonDelete.style.display = 'none';
  }

  // Обработка кнопки лайка
  newCardButtonLike.addEventListener("click", () => {
    if (likes.some(user => user._id === localStorage.getItem('userId'))) {
      removeLike(cardInfo._id)
        .then(res => {
          likes = res.likes;
          newCardLikeCounter.textContent = res.likes.length;
        })
        .catch(err => console.log(err));
    } else {
      setLike(cardInfo._id)
        .then(res => {
          likes = res.likes;
          newCardLikeCounter.textContent = res.likes.length;
        })
        .catch(err => console.log(err));
    }
    newCardButtonLike.classList.toggle("card__like-button_is-active");
  });

  // Обработка клика по фотографии
  newCardImage.addEventListener("click", () => {
    fillImagePopup(cardInfo.name, cardInfo.link);
    openModal(imagePopup)
  });

  // Обработка клика на кнопке закрытия
  imagePopupButtonClose.addEventListener("click", () => {
    closeModal(imagePopup);
  });

  return newCard;
}