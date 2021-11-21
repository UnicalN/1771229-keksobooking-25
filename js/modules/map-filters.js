import { getData } from './server-interfaces.js';

const LOW_PRICE_FILTER = 10000;
const HIGH_PRICE_FILTER = 50000;


const filters = document.querySelector('.map__filters');
const typeFilter = filters.querySelector('#housing-type');
const priceFilter = filters.querySelector('#housing-price');
const roomsFilter =filters.querySelector('#housing-rooms');
const guestsFilter = filters.querySelector('#housing-guests');
const features =
{
  wifi : (filters.querySelector('#filter-wifi')),
  dishwasher : (filters.querySelector('#filter-dishwasher')),
  parking : (filters.querySelector('#filter-parking')),
  washer : (filters.querySelector('#filter-washer')),
  elevator : (filters.querySelector('#filter-elevator')),
  conditioner : (filters.querySelector('#filter-conditioner')),
};

const isRoomsSuitable = (offerSummary) =>    (roomsFilter.value ==='any') ||(`${offerSummary.offer.rooms}`===roomsFilter.value);
const isTypeSuitable = (offerSummary) =>     (typeFilter.value ==='any')  ||(offerSummary.offer.type === typeFilter.value);
const isCapacitySuitable = (offerSummary) => (guestsFilter.value ==='any')||(`${offerSummary.offer.guests  }` === guestsFilter.value);
const isPriceSuitable = (offerSummary) =>
  (priceFilter.value  ==='any')||
(priceFilter.value === 'low' && offerSummary.offer.price <=LOW_PRICE_FILTER) ||
(priceFilter.value === 'high' && offerSummary.offer.price >=HIGH_PRICE_FILTER)||
(priceFilter.value === 'middle' && (offerSummary.offer.price >=LOW_PRICE_FILTER) && (offerSummary.offer.price <= HIGH_PRICE_FILTER));
//новая фильтрация, cFFL работает нормально
const createFilterFeaturesList = () =>
{
  const featuresList = [];
  for (const key in features) {
    if (features[key].checked === true){
      featuresList.push(key);
    }
  }
  return featuresList;
};

const areFeaturesSuitable = (offerFeatures) =>
{
  const filterFeatures = createFilterFeaturesList();
  //console.log(offerFeatures)
  if (filterFeatures===''){
    return true;
  }
  if (offerFeatures === undefined){
    return false;
  }
  for (const filterFeature of filterFeatures){
    if (offerFeatures.indexOf(filterFeature)===-1){
      return false;
    }
  }
  return true;
};


const isOfferSuitable = (offerSummary) =>(( isRoomsSuitable(offerSummary))&&
(isTypeSuitable(offerSummary))&&
(isCapacitySuitable(offerSummary))&&
(isPriceSuitable(offerSummary))
&&(areFeaturesSuitable(offerSummary.offer.features))
);
filters.addEventListener('input', () => getData());

export {
  isOfferSuitable
};
