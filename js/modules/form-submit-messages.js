const bodyElement = document.querySelector('body');
const adFormElement=document.querySelector('.ad-form');
const mapFiltersElement=document.querySelector('.map__filters');
let submitMessageElement;


const escOnSubmitMessageHandler = (evt) =>{
  if (evt.key === 27) {
    bodyElement.remove(submitMessageElement);
  }
};

const clickOnSubmitMessageHandler = () =>{
  bodyElement.remove(submitMessageElement);
};

const buttonOnSubmitMessageHandler = () =>{
  bodyElement.remove(submitMessageElement);
};

const removeHandlers = () =>{
  removeEventListener('click', buttonOnSubmitMessageHandler, false);
  removeEventListener('click', escOnSubmitMessageHandler, false);
};


//popupcreators
const  createSuccessPopup = () =>{
  submitMessageElement = document.querySelector('#success').content.cloneNode(true);
  bodyElement.appendChild(submitMessageElement);
  submitMessageElement.classList.add('submit-message');
  submitMessageElement = document.querySelector('.submit-message');
  adFormElement.reset();
  mapFiltersElement.reset();

  window.addEventListener('keydown', (evt) => escOnSubmitMessageHandler(evt));

  submitMessageElement.addEventListener('click', clickOnSubmitMessageHandler());
};

const  createErrorPopup = () =>{
  submitMessageElement = document.querySelector('#error').content.cloneNode(true);
  bodyElement.appendChild(submitMessageElement);
  submitMessageElement.classList.add('submit-message');
  submitMessageElement = document.querySelector('.submit-message');

  window.addEventListener('keydown', (evt) => escOnSubmitMessageHandler(evt));

  submitMessageElement.addEventListener('click', clickOnSubmitMessageHandler());

  const closeButton = submitMessageElement.querySelector('.error__button');
  closeButton.addEventListener('click', buttonOnSubmitMessageHandler());

};


export { createSuccessPopup,  createErrorPopup};
