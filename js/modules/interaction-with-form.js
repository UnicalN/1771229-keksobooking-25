import {sendData} from './server-interfaces.js';
import { roundTheNumber } from './mathematical.js';
const ALERT_SHOW_TIME = 15;
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
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

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
      //вставка
      if ((option.value - possibleCapacity) === 0){
        option.removeAttribute('disabled');
      }
    }
  }
};


const setEqualTime = (userSetTime, syncronizedTime) => {
  for (const child of syncronizedTime.children)
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


const setUserFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => showAlert('Не удалось отправить форму. Попробуйте ещё раз'),
      new FormData(evt.target),
    );
  });
};

export {
  validateOffer,
  setUserFormSubmit,
  setAddressFromLatLng
};

