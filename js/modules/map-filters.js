import { getData } from './server-interfaces.js';

const filters = document.querySelector('.map__filters');
const typeFilter = filters.querySelector('#housing-type');
const priceFilter = filters.querySelector('#housing-price');
const roomsFilter =filters.querySelector('#housing-rooms');
const guestsFilter = filters.querySelector('#housing-guests');


const filterDishwasher = (filters.querySelector('#filter-dishwasher').checked);
const filterParking = (filters.querySelector('#filter-parking').checked);
const filterWasher = (filters.querySelector('#filter-washer').checked);
const filterElevator = (filters.querySelector('#filter-elevator').checked);
const filterConditioner = (filters.querySelector('#filter-conditioner').checked);

const LOW_PRICE_FILTER = 10000;
const HIGH_PRICE_FILTER = 50000;

const areFeaturesSuitable = (offerSummary) => {
  const housingFeaturesElement = filters.querySelector('#housing-features');
  const inputElements = Array.from(housingFeaturesElement.querySelectorAll('input'));
  const suitableFeatures=[];
  inputElements.map(inputElement=>{
    if (inputElement.checked){
      //suitableFeatures.push(inputElement.name);
    }
  })
  if (!offerSummary.offer.features){
    offerSummary.offer.features=[];
  }
  if (suitableFeatures.length === 0){
    console.log({a: suitableFeatures, b: offerSummary.offer.features, c: true})
    return true;
  }
  suitableFeatures.map(suitableFeature=>{
    if(offerSummary.offer.features.indexOf(suitableFeature)===-1){
      console.log({a: suitableFeatures, b: offerSummary.offer.features, c: false})
      return false
    }
  })
  console.log({a: suitableFeatures, b: offerSummary.offer.features, c: true})
  return true;
}

const isRoomsSuitable = (offerSummary) =>    (roomsFilter.value ==='any') ||(`${offerSummary.offer.rooms}`===roomsFilter.value);
const isTypeSuitable = (offerSummary) =>     (typeFilter.value ==='any')  ||(offerSummary.offer.type === typeFilter.value);
const isCapacitySuitable = (offerSummary) => (guestsFilter.value ==='any')||(`${offerSummary.offer.guests  }` === guestsFilter.value);
const isPriceSuitable = (offerSummary) =>
  (priceFilter.value  ==='any')||
(priceFilter.value === 'low' && offerSummary.offer.price <=LOW_PRICE_FILTER) ||
(priceFilter.value === 'high' && offerSummary.offer.price >=HIGH_PRICE_FILTER)||
(priceFilter.value === 'middle' && (offerSummary.offer.price >=LOW_PRICE_FILTER) && (offerSummary.offer.price <= HIGH_PRICE_FILTER));

const isOfferSuitable = (offerSummary) =>(( isRoomsSuitable(offerSummary))&&
(isTypeSuitable(offerSummary))&&
(isCapacitySuitable(offerSummary))&&
(areFeaturesSuitable(offerSummary))&&
(isPriceSuitable(offerSummary)));

filters.addEventListener('input', () => getData());

export {
  isOfferSuitable
};
