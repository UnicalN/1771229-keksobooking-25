import {sendData} from './server-interfaces.js';
import { roundTheNumber } from './mathematical.js';
const LOCATION_DIGITS_IN_ADDRESS = 5;
const adForm=document.querySelector('.ad-form');
const MIN_PRICE_FOR_TYPE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const CAPACITY_FOR_ROOMS = {
  1: [1],
  2: [1,2],
  3: [1,2,3],
  100: [0],
};

const body = document.querySelector('body');
//___________________________Валидация____________

const roomAmount = adForm.querySelector('#room_number'); //Эти объявления лучше оставить в функции или вынести?
const capacity   = adForm.querySelector('#capacity');
const type       = adForm.querySelector('#type');
const price      = adForm.querySelector('#price');
const checkin    = adForm.querySelector('#timein');
const checkout   = adForm.querySelector('#timeout');
const address    = adForm.querySelector('#address');

const setAddress = (newAddress) => {
  address.value = newAddress;
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
    for (const possibleCapacity of CAPACITY_FOR_ROOMS[theRoomAmount.value]){
      if ((option.value - possibleCapacity) === 0){
        option.removeAttribute('disabled');
      }
    }
  }
};


const setEqualTime = (userSetTime, syncTime) => {
  for (const child of syncTime.children)
  {
    child.selected = false;
    if (child.value === userSetTime.value)
    {
      child.selected=true;
    }
  }
};

const setPriceForType = (theType, thePrice) => { // Заменяет placeholder цены
  thePrice.placeholder=MIN_PRICE_FOR_TYPE[theType.value];
  thePrice.min=MIN_PRICE_FOR_TYPE[theType.value];
};


//EventListeners
const validateOffer = () => {
  checkin.addEventListener('input', () => {
    setEqualTime(checkin, checkout);
  });
  checkout.addEventListener('input', () => {
    setEqualTime(checkout, checkin);
  });
  type.addEventListener('input', ()=>{
    setPriceForType(type, price);
  });
  roomAmount.addEventListener('input', ()=>{
    setCapacityForRooms(roomAmount, capacity);
  });
};

adForm.addEventListener('submit', () => {
//
});

// Уведомления о (не)успешности отправки
const  createSuccessPopup = () =>{
  const successPopup = document.querySelector('#success').content.cloneNode(true);
  body.appendChild(successPopup);
  adForm.reset();
  document.querySelector('map__filters').reset();
  document.addEventListener('keydown', (evt) =>{
    if (evt.keyCode === 27) {
      successPopup.remove();
    }
  });
  document.addEventListener('click', () =>{
    successPopup.remove();
  });
};

const  createErrorPopup = () =>{
  const errorPopup = document.querySelector('#success').content.cloneNode(true);
  body.appendChild(errorPopup);
  document.addEventListener('keydown', (evt) =>{
    if (evt.keyCode === 27) {
      errorPopup.remove();
    }
  });
  document.addEventListener('click', () =>{
    errorPopup.remove();
  });
  const closeButton = errorPopup.querySelector('.error__button');
  closeButton.addEventListener('click', () => {
    errorPopup.remove();
  });
};

const setUserFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
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
  setUserFormSubmit
};

