import {getRandomInteger, getRandomFloat} from './get-random.js';

const SAMPLE =
{
  TITLES: [
    'Ibes',
    'de la Paix',
    'Rudninkai City',
    'Kamelot',
    'Kreuz',
    'HN',
    'AB Residence',
    'Soca',
    'Lake',
    'Mercury',
  ],
  TYPES: [
    'palace',
    'flat',
    'house',
    'bungalow',
    'hotel',
  ],
  CHECKINS: [
    '12:00',
    '13:00',
    '14:00',
  ],
  FEATURES: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ],
  PHOTOS: [
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
    'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
  ],
  DESCRIPTIONS: [
    'Отличный вид из окна',
    'Вкуснейшие завтраки',
    'Проведите свои выходные вместе с нами!',
    'Заселяем без ПЦР теста!',
    'Расположение в самом центре',
    'Уединенное место вдали от суеты',
    'Мы открыты для гостей с 1984 года',
  ],
};

const generateLat = function ()
{
  return getRandomFloat(35.65, 35.7, 5);
};

const generateLng = function ()
{
  return getRandomFloat(139.7, 139.8, 5);
};

const generateAvatar = function ()
{
  let random=getRandomInteger(1,10);
  if (random<10)
  {
    random=(`0${random}`);
  }
  return(`img/avatars/user${random}.png`);
};

const generateTitle = function ()
{
  return SAMPLE.TITLES[getRandomInteger(0, SAMPLE.TITLES.length-1)];
};

const generateType = () => SAMPLE.TYPES[getRandomInteger(0, SAMPLE.TYPES.length-1)];

const generateCheckin = () => SAMPLE.CHECKINS[getRandomInteger(0, SAMPLE.CHECKINS.length-1)];

const generateFeatures = () => {
  const featuresArray = [];
  for (let ii=0; ii<SAMPLE.FEATURES.length; ii++)
  {
    if (getRandomInteger(0,1))
    {
      featuresArray.push(SAMPLE.FEATURES[ii]);
    }
  }
  return featuresArray;
};

const generatePhotos = () => {
  const photosArray = [];
  for (let ii=0; ii<SAMPLE.PHOTOS.length; ii++)
  {
    if (getRandomInteger(0,1))
    {
      photosArray.push(SAMPLE.PHOTOS[ii]);
    }
  }
  return photosArray;
};

const generateDescription =  ()=>SAMPLE.DESCRIPTIONS[getRandomInteger(0, SAMPLE.DESCRIPTIONS.length-1)];

const generateAuthor = ()=> {
  const genereatedAuthor =
  {
    avatar: generateAvatar(),
  };
  return genereatedAuthor;
};
const generateLocation = ()=>{
  const generatedLocation =
  {
    lat: generateLat(),
    lng: generateLng(),
  };
  return generatedLocation;
};
const generateOffer =  () => {
  const generatedOffer = //Не генерирует адрес (Адрес добавляется позднее на основе генерации location)
  {
    title: generateTitle(),
    price: getRandomInteger(1000, 50000),
    type: generateType(),
    rooms: getRandomInteger(1, 5),
    guests: getRandomInteger(1, 8),
    checkin: generateCheckin(),
    checkout: generateCheckin(),
    features: generateFeatures(),
    description: generateDescription(),
    photos: generatePhotos(),
  };
  return generatedOffer;
};

const generateOfferSummary = () => {
  const generatedOfferSummary = {
    location: generateLocation(),
    author: generateAuthor(),
    offer: generateOffer(),
  };
  generatedOfferSummary.offer.address = (`${generatedOfferSummary.location.lat  }, ${  generatedOfferSummary.location.lng}`);
  return generatedOfferSummary;
};


const generateOffersArray = (amount)=>Array.from({length: amount}, generateOfferSummary);

export {generateOffersArray};

