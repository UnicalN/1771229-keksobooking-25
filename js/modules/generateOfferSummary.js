import {getRandomInteger} from './getRandom.js';
import {getRandomFloat} from './getRandom.js';

const AMOUNT_OF_OFFERS = 10;
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

function generateLat()
{
  return getRandomFloat(35.65, 35.7, 5);
}

function generateLng()
{
  return getRandomFloat(139.7, 139.8, 5);
}

function generateAvatar()
{
  let random=getRandomInteger(1,10);
  if (random<10)
  {
    random=(`0${random}`);
  }
  return(`img/avatars/user${{ random }}.png`);
}

function generateTitle()
{
  return SAMPLE.TITLES[getRandomInteger(0, SAMPLE.TITLES.length-1)];
}

function generateType()
{
  return SAMPLE.TYPES[getRandomInteger(0, SAMPLE.TYPES.length-1)];
}

function generateCheckin()
{
  return SAMPLE.CHECKINS[getRandomInteger(0, SAMPLE.CHECKINS.length-1)];
}

function generateFeatures()
{
  const featuresArray = [];
  for (let ii=0; ii<SAMPLE.FEATURES.length; ii++)
  {
    if (getRandomInteger(0,1))
    {
      featuresArray.push(SAMPLE.FEATURES[ii]);
    }
  }
  return featuresArray;
}

function generatePhotos()
{
  const photosArray = [];
  for (let ii=0; ii<SAMPLE.PHOTOS.length; ii++)
  {
    if (getRandomInteger(0,1))
    {
      photosArray.push(SAMPLE.PHOTOS[ii]);
    }
  }
  return photosArray;
}

function generateDescription()
{
  return SAMPLE.DESCRIPTIONS[getRandomInteger(0, SAMPLE.DESCRIPTIONS.length-1)];
}

function generateAuthor()
{
  const genereatedAuthor =
  {
    avatar: generateAvatar(),
  };
  return genereatedAuthor;
}
function generateLocation()
{
  const generatedLocation =
  {
    lat: generateLat(),
    lng: generateLng(),
  };
  return generatedLocation;
}
function generateOffer()
{
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
}

function generateOfferSummary()
{
  const generatedOfferSummary = {
    location: generateLocation(),
    author: generateAuthor(),
    offer: generateOffer(),
  };
  generatedOfferSummary.offer.address = (`${generatedOfferSummary.location.lat  }, ${  generatedOfferSummary.location.lng}`);
  return generatedOfferSummary;
}

const offerSummary = Array.from({length: AMOUNT_OF_OFFERS}, generateOfferSummary);
export {offerSummary};
