const CARD = document.querySelector('#card').content; //получение шаблона
const TYPE_MAP =
{
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

function createOfferLayout(offerSummary)
{
  const CARD_CLONE = CARD.cloneNode(true);             //создание клона шаблона
  const POPUP =
{
  title: CARD_CLONE.querySelector('.popup__title'),
  address: CARD_CLONE.querySelector('.popup__text--address'),
  price: CARD_CLONE.querySelector('.popup__text--price'),
  type: CARD_CLONE.querySelector('.popup__type'),
  capacity: CARD_CLONE.querySelector('.popup__text--capacity'),
  time: CARD_CLONE.querySelector('.popup__text--time'),
  features: CARD_CLONE.querySelector('.popup__features'),
  description: CARD_CLONE.querySelector('.popup__description'),
  photos: CARD_CLONE.querySelector('.popup__photos'),
  avatar: CARD_CLONE.querySelector('.popup__avatar'),
};
  POPUP.title.textContent = offerSummary.offer.title;   //заполнение DOM-элемента
  POPUP.address.textContent = offerSummary.offer.address;
  POPUP.price.textContent = (`${offerSummary.offer.price  } ₽/ночь`);
  POPUP.type.textContent = TYPE_MAP[offerSummary.offer.type];
  POPUP.capacity.textContent = (`${offerSummary.offer.rooms} комнаты для ${offerSummary.offer.guests} гостей`);
  POPUP.time.textContent = (`Заезд после ${offerSummary.offer.checkin}, выезд до ${offerSummary.offer.checkout}`);
  POPUP.features.innerHTML = '';
  for (const feature of offerSummary.offer.features)
  {
    POPUP.features.insertAdjacentHTML('beforeend', `<li class="popup__feature popup__feature--${feature}"></li>`);
  }

  POPUP.description.textContent = offerSummary.offer.description;
  POPUP.photoTemplate = POPUP.photos.querySelector('.popup__photo');
  POPUP.photos.innerHTML='';
  for (const photo of offerSummary.offer.photos)
  {
    const photoTemplateClone = POPUP.photoTemplate.cloneNode(true);
    photoTemplateClone.src=photo;
    POPUP.photos.appendChild(photoTemplateClone);
  }
  POPUP.avatar.src=offerSummary.author.avatar;
  for (const element in POPUP)
  {
    if (element==='')                           //Если данных для заполнения не хватает,
    {
      POPUP[element].classList.add('hidden'); //  блок в карточке скрывается.
    }
  }
  return CARD_CLONE;
}

export {createOfferLayout};
