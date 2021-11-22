import {updatePins} from './map.js';
const GET_DATA_FROM='https://24.javascript.pages.academy/keksobooking/data';
const SEND_DATA_TO='https://24.javascript.pages.academy/keksobooking';
const GET_DATA_ERROR_TEXT = 'Упс! Что-то пошло не так при загрузке предложений!';
const createGetDataError = () => {
  const errorMessageElement = document.createElement('p');
  errorMessageElement.textContent = GET_DATA_ERROR_TEXT;
  errorMessageElement.style.zindex = 10;
  errorMessageElement.style.color = 'white';
  errorMessageElement.style.backgroundColor = 'red';
  errorMessageElement.style.textAlign = 'center';
  errorMessageElement.style.fontSize = '20px';
  errorMessageElement.style.padding = '30px';
  document.body.insertBefore(errorMessageElement, document.body.firstChild);
};

const getData = () => {
  fetch(GET_DATA_FROM)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(createGetDataError());
    })
    .then((response) => response.json())
    .then((offers) => {
      updatePins(offers);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(SEND_DATA_TO
    ,
    {
      method: 'POST',
      type: 'multipart/form-data',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {
  getData,
  sendData
};
