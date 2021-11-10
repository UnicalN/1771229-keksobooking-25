const adForm=document.querySelector('.ad-form');
const adFormChildren = adForm.children;
const mapFilters = document.querySelector('.map__filters');
const mapFiltersChildren = mapFilters.children;
function disablePage()
{
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('ad-form--disabled');
  for (const child of adFormChildren)
  {
    child.setAttribute('disabled', true);
  }
  for (const child of mapFiltersChildren)
  {
    child.setAttribute('disabled', true);
  }
}

function enablePage()
{
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('ad-form--disabled');
  for (const child of adFormChildren)
  {
    child.removeAttribute('disabled');
  }
  for (const child of mapFiltersChildren)
  {
    child.removeAttribute('disabled');
  }
}

export {disablePage, enablePage};
