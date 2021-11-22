const adFormElement=document.querySelector('.ad-form');
const mapFiltersElement = document.querySelector('.map__filters');

const disablePage = () => {
  adFormElement.classList.add('ad-form--disabled');
  mapFiltersElement.classList.add('map__filters--disabled');

  for (const childElement of adFormElement.children){
    childElement.setAttribute('disabled', true);
  }

  for (const childElement of mapFiltersElement.children){
    childElement.setAttribute('disabled', true);
  }
};


const enablePage = () => {
  adFormElement.classList.remove('ad-form--disabled');
  mapFiltersElement.classList.remove('map__filters--disabled');
  for (const childElement of adFormElement.children){
    childElement.removeAttribute('disabled');
  }

  for (const childElement of mapFiltersElement.children){
    childElement.removeAttribute('disabled');
  }
};
export {
  disablePage,
  enablePage
};
