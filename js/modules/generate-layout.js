const CARD = document.querySelector('#card').content; //получение шаблона
const TYPE_MAP = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
const removeEmptyElements = (removeFrom) => {
  for (const element in removeFrom){
    if (element==='')                           //Если данных для заполнения не хватает,{
    {removeFrom[element].classList.add('hidden');} //  блок в карточке скрывается.
  }
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
  const addFeatures = (featuresToAdd) =>{
    popup.features.innerHTML = '';
    if (!(featuresToAdd===undefined)) {
      for (const feature of featuresToAdd) {
        popup.features.insertAdjacentHTML('beforeend', `<li class="popup__feature popup__feature--${feature}"></li>`);
      }
    }
  };
  const addPhotos = (photosToAdd) => {
    popup.photos.innerHTML='';
    if (!(photosToAdd===undefined)) {
      for (const photo of photosToAdd){
        const photoTemplateClone = popup.photoTemplate.cloneNode(true);
        photoTemplateClone.src=photo;
        popup.photos.appendChild(photoTemplateClone);
      }
    }
  };
  popup.title.textContent = offerSummary.offer.title;   //заполнение DOM-элемента
  popup.address.textContent = offerSummary.offer.address;
  popup.price.textContent = (`${offerSummary.offer.price  } ₽/ночь`);
  popup.type.textContent = TYPE_MAP[offerSummary.offer.type];
  popup.capacity.textContent = (`${offerSummary.offer.rooms} комнаты для ${offerSummary.offer.guests} гостей`);
  popup.time.textContent = (`Заезд после ${offerSummary.offer.checkin}, выезд до ${offerSummary.offer.checkout}`);
  addFeatures(offerSummary.offer.features);
  popup.description.textContent = offerSummary.offer.description;
  popup.photoTemplate = popup.photos.querySelector('.popup__photo');
  addPhotos(offerSummary.offer.photos);
  popup.avatar.src=offerSummary.author.avatar;
  removeEmptyElements(cardClone);
  return cardClone.firstElementChild;
};


export {
  createOfferLayout
};
