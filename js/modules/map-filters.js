import { getData } from './server-interfaces.js';

const filters = document.querySelector('.map__filters');
const typeFilter = filters.querySelector('#housing-type');
const priceFilter = filters.querySelector('#housing-price');
const roomsFilter =filters.querySelector('#housing-rooms');
const guestsFilter = filters.querySelector('#housing-guests');
const features = filters.querySelector('#housing-features');

const LOW_PRICE_FILTER = 10000;
const HIGH_PRICE_FILTER = 50000;

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
(isPriceSuitable(offerSummary)));

filters.addEventListener('input', () => getData());

export {
  isOfferSuitable
};
