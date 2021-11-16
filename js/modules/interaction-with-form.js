import {sendData} from './server-interfaces.js';
const ALERT_SHOW_TIME = 15;

// Блокировка/Разблокировка формы
const adForm=document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
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
const disablePage = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('ad-form--disabled');

  for (const child of adForm.children){
    child.setAttribute('disabled', true);
  }

  for (const child of mapFilters.children){
    child.setAttribute('disabled', true);
  }
};

const enablePage = () => {
  console.log('page enable attempt');
  adForm.classList.remove('ad-form--disabled');
  console.log(adForm.classList);
  mapFilters.classList.remove('ad-form--disabled');
  for (const child of adForm.children){
    //child.removeAttribute('disabled');
    child.removeAttribute('disabled');
    console.log(child);
  }

  for (const child of mapFilters.children){
    child.removeAttribute('disabled');
  }
};


//___________________________Валидация____________

const roomAmount =adForm.querySelector('#room_number'); //Эти объявления лучше оставить в функции или вынести?
const capacity   = adForm.querySelector('#capacity');
const type       = adForm.querySelector('#type');
const price      = adForm.querySelector('#price');
const checkin    = adForm.querySelector('#timein');
const checkout   = adForm.querySelector('#timeout');

const isCapacityCorrect = (theRoomAmount, theCapacity) => {
  let capacityIsCorrect = false;
  for (const possibleCapacity of CAPACITY_FOR_ROOMS[theRoomAmount.value]){
    if (theCapacity === possibleCapacity){
      capacityIsCorrect = true;
      break;
    }
  }
  if (!capacityIsCorrect){
    theCapacity.classList.add('ad-form__element--invalid');
  }
  return capacityIsCorrect;
};

const isPriceCorrect = (theType, thePrice) => {
  if (MIN_PRICE_FOR_TYPE[theType.value]>thePrice.value){
    thePrice.classList.add('ad-form__element--invalid');
  }
  return (MIN_PRICE_FOR_TYPE[theType.value]<=thePrice.value);
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
  isCapacityCorrect(theRoomAmount, theCapacity);
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
  isPriceCorrect(theType, thePrice);
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
  price.addEventListener('input', () => {
    isPriceCorrect(type, price);
  });
  capacity.addEventListener('input', () =>{
    isCapacityCorrect(roomAmount, capacity);
  });
};

adForm.addEventListener('submit', () => {
  //evt.preventDefault;
  if (isCapacityCorrect(roomAmount, capacity) && isPriceCorrect(type, price)) {
    // отправка формы
    console.log('ФОРМА ОТПРАВЛЕНА');
  }
  else {
    // ошибка отправки формы
    console.log('ФОРМА  НЕ ОТПРАВЛЕНА :(');
  }
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

export {validateOffer};
export {setUserFormSubmit};
export {disablePage, enablePage};
