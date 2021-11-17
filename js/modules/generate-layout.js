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
  const popup = {
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
  popup.title.textContent = offerSummary.offer.title;   //заполнение DOM-элемента
  popup.address.textContent = offerSummary.offer.address;
  popup.price.textContent = (`${offerSummary.offer.price  } ₽/ночь`);
  popup.type.textContent = TYPE_MAP[offerSummary.offer.type];
  popup.capacity.textContent = (`${offerSummary.offer.rooms} комнаты для ${offerSummary.offer.guests} гостей`);
  popup.time.textContent = (`Заезд после ${offerSummary.offer.checkin}, выезд до ${offerSummary.offer.checkout}`);
  popup.features.innerHTML = '';
  if (!(offerSummary.offer.features===undefined)) {
    for (const feature of offerSummary.offer.features) {
      popup.features.insertAdjacentHTML('beforeend', `<li class="popup__feature popup__feature--${feature}"></li>`);
    }
  }
  popup.description.textContent = offerSummary.offer.description;
  popup.photoTemplate = popup.photos.querySelector('.popup__photo');
  popup.photos.innerHTML='';
  if (!(offerSummary.offer.photos===undefined)) {
    for (const photo of offerSummary.offer.photos){
      const photoTemplateClone = popup.photoTemplate.cloneNode(true);
      photoTemplateClone.src=photo;
      popup.photos.appendChild(photoTemplateClone);
    }
  }
  popup.avatar.src=offerSummary.author.avatar;
  for (const element in popup){
    if (element==='')                           //Если данных для заполнения не хватает,{
    {popup[element].classList.add('hidden');} //  блок в карточке скрывается.
  }
  return cardClone.firstElementChild;
};


export {createOfferLayout};
