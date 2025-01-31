import {getData, sendData} from './server-interfaces.js';
import { roundTheNumber } from './mathematical.js';
import { createSuccessPopup,  createErrorPopup} from './submit-popups.js';
import { resetMap, updatePins} from './map.js';
const LOCATION_DIGITS_IN_ADDRESS = 5;
const adFormElement=document.querySelector('.ad-form');
const MinPriceForType = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const CapacityForRooms = {
  1: [1],
  2: [1,2],
  3: [1,2,3],
  100: [0],
};

const roomAmountElement = adFormElement.querySelector('#room_number');
const capacityElement   = adFormElement.querySelector('#capacity');
const typeElement       = adFormElement.querySelector('#type');
const priceElement      = adFormElement.querySelector('#price');
const checkinElement    = adFormElement.querySelector('#timein');
const checkoutElement   = adFormElement.querySelector('#timeout');
const addressElement    = adFormElement.querySelector('#address');
const adFormReset       = adFormElement.querySelector('.ad-form__reset');
const setAddress = (newAddress) => {
  addressElement.value = newAddress;
};

const setAddressFromLatLng = (lat, lng) => {
  setAddress(`${roundTheNumber(lat, LOCATION_DIGITS_IN_ADDRESS)  }, ${  roundTheNumber(lng, LOCATION_DIGITS_IN_ADDRESS)}`);
};

const setCapacityForRooms = (theRoomAmount, theCapacity)=>{
  if (theRoomAmount.value==='100'){
    theCapacity.value = '0';
  }
  else {
    theCapacity.value = '1';
  }
  for (const option of theCapacity.children){
    option.disabled = true;
    for (const possibleCapacity of CapacityForRooms[theRoomAmount.value]){
      if ((option.value - possibleCapacity) === 0){
        option.removeAttribute('disabled');
      }
    }
  }
};

const setEqualTime = (userSetTime, syncTime) => {
  for (const childElement of syncTime.children) {
    childElement.selected = false;
    if (childElement.value === userSetTime.value) {
      childElement.selected=true;
    }
  }
};

const setPriceForType = (theType, thePrice) => { // Заменяет placeholder цены
  thePrice.placeholder=MinPriceForType[theType.value];
  thePrice.min=MinPriceForType[theType.value];
};

const validateOffer = () => {
  checkinElement.addEventListener('input', () => {
    setEqualTime(checkinElement, checkoutElement);
  });
  checkoutElement.addEventListener('input', () => {
    setEqualTime(checkoutElement, checkinElement);
  });
  typeElement.addEventListener('input', ()=>{
    setPriceForType(typeElement, priceElement);
  });
  roomAmountElement.addEventListener('input', ()=>{
    setCapacityForRooms(roomAmountElement, capacityElement);
  });
};

const filtersElement = document.querySelector('.map__filters');
const clearFiltersAndForm = () => {
  filtersElement.reset();
  resetMap();
  priceElement.placeholder =  MinPriceForType.flat;
  getData(updatePins);
};

adFormReset.addEventListener('click', clearFiltersAndForm);

const setUserFormSubmit = () => {
  adFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => createSuccessPopup(),
      () => createErrorPopup(),
      new FormData(evt.target),
    );
  });
};

export {
  setAddressFromLatLng,
  validateOffer,
  setUserFormSubmit,
  clearFiltersAndForm
};

