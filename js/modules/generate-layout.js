const CARD = document.querySelector('#card').content; //получение шаблона
const TYPE_MAP = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const createOfferLayout = (offerSummary) => {
  const cardClone = CARD.cloneNode(true);             //создание клона шаблона
  const POPUP = {
    title: cardClone.querySelector('.popup__title'),
    address: cardClone.querySelector('.popup__text--address'),
    price: cardClone.querySelector('.popup__text--price'),
    type: cardClone.querySelector('.popup__type'),
    capacity: cardClone.querySelector('.popup__text--capacity'),
    time: cardClone.querySelector('.popup__text--time'),
    features: cardClone.querySelector('.popup__features'),
    description: cardClone.querySelector('.popup__description'),
    photos: cardClone.querySelector('.popup__photos'),
    avatar: cardClone.querySelector('.popup__avatar'),
  };
  POPUP.title.textContent = offerSummary.offer.title;   //заполнение DOM-элемента
  POPUP.address.textContent = offerSummary.offer.address;
  POPUP.price.textContent = (`${offerSummary.offer.price  } ₽/ночь`);
  POPUP.type.textContent = TYPE_MAP[offerSummary.offer.type];
  POPUP.capacity.textContent = (`${offerSummary.offer.rooms} комнаты для ${offerSummary.offer.guests} гостей`);
  POPUP.time.textContent = (`Заезд после ${offerSummary.offer.checkin}, выезд до ${offerSummary.offer.checkout}`);
  POPUP.features.innerHTML = '';
  if (!(offerSummary.offer.features===undefined)) {
    for (const feature of offerSummary.offer.features) {
      POPUP.features.insertAdjacentHTML('beforeend', `<li class="popup__feature popup__feature--${feature}"></li>`);
    }
  }
  POPUP.description.textContent = offerSummary.offer.description;
  POPUP.photoTemplate = POPUP.photos.querySelector('.popup__photo');
  POPUP.photos.innerHTML='';
  if (!(offerSummary.offer.photos===undefined)) {
    for (const photo of offerSummary.offer.photos){
      const photoTemplateClone = POPUP.photoTemplate.cloneNode(true);
      photoTemplateClone.src=photo;
      POPUP.photos.appendChild(photoTemplateClone);
    }
  }
  POPUP.avatar.src=offerSummary.author.avatar;
  for (const element in POPUP){
    if (element==='')                           //Если данных для заполнения не хватает,{
    {POPUP[element].classList.add('hidden');} //  блок в карточке скрывается.
  }
  return cardClone;
};


export {createOfferLayout};
