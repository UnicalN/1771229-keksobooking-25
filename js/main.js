AMOUNT_OF_OFFERS = 10;

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
  ]
}

function getRandomInteger(min, max)
{
  if (min>max)
  {
    const swap = min;
    min=max;
    max= swap;
  }
  const randomInteger = Math.round(Math.random() * (max - min)) + min;
  return randomInteger;
}

function getRandomFloat(min,max,digits)
{
  if (min>max)
  {
    const swap = min;
    min=max;
    max= swap;
  }
  let randomFloat = Math.random() * (max - min) + min;
  randomFloat = Math.round(randomFloat*Math.pow(10, digits))/Math.pow(10, digits);//Округление
  return randomFloat;
}

function generateLat()
{
  return getRandomFloat(35.65, 35.7, 5)
}

function generateLng()
{
  return getRandomFloat(139.7, 139.8, 5)
}

function generateAvatar()
{
  let random=getRandomInteger(1,10)
  if (random<10)
  {
    random=('0'+ random);
  }
  return('img/avatars/user'+ random +'.png')
}

function generateTitle()
{
  return SAMPLE.TITLES[getRandomInteger(0, SAMPLE.TITLES.length-1)]
}

function generateType()
{
  return SAMPLE.TYPES[getRandomInteger(0, SAMPLE.TYPES.length-1)]
}

function generateCheckin()
{
   return SAMPLE.CHECKINS[getRandomInteger(0, SAMPLE.CHECKINS.length-1)]
}

function generateFeatures()
{
  let featuresArray = [];
  for (i=0; i<SAMPLE.FEATURES.length; i++)
  {
    if (getRandomInteger(0,1))
    {
      featuresArray.push(SAMPLE.FEATURES[i]);
    }
  }
  return featuresArray
}

function generatePhotos()
{
  let photosArray = [];
  for (i=0; i<SAMPLE.PHOTOS.length; i++)
  {
    if (getRandomInteger(0,1))
    {
      photosArray.push(SAMPLE.PHOTOS[i]);
    }
  }
  return photosArray
}

function generateDescription()
{
    return SAMPLE.DESCRIPTIONS[getRandomInteger(0, SAMPLE.DESCRIPTIONS.length-1)]
}

function generateAuthor()
{
genereatedAuthor =
  {
    avatar: generateAvatar()
  }
return genereatedAuthor
}
function generateLocation()
{
  generatedLocation = 
  {
  lat: generateLat(),
  lng: generateLng()
  }
  return generatedLocation
}
function generateOffer()
{
  generatedOffer = //Не генерирует адрес
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
  photos: generatePhotos()
  }
  return generatedOffer
} 

function generateOfferSummary()
{
  let offerSummary = {
    location: generateLocation(),
    author: generateAuthor(),
    offer: generateOffer()
  }
  offerSummary.offer.address = (offerSummary.location.lat + ', ' + offerSummary.location.lng);
  return offerSummary
}

let allOffersData = Array.from({length: AMOUNT_OF_OFFERS}, generateOfferSummary);

console.log(allOffersData);