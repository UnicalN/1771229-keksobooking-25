// Блокировка/Разблокировка формы
const adForm=document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
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
    child.removeAttribute('disabled');
    console.log(child);
  }

  for (const child of mapFilters.children){
    child.removeAttribute('disabled');
  }
};

export {
  disablePage,
  enablePage
};
