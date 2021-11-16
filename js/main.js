//import {createOfferLayout} from './modules/generate-layout.js';
import {disablePage, validateOffer} from './modules/interaction-with-form.js';
import {getData} from './modules/server-interfaces.js';
import {createMarkers, createMainMarker} from './modules/map.js';
//disablePage();
validateOffer();
getData(createMarkers);
createMainMarker();
/*
Шаблон
fetch('link')
  .then(response=>response.json())
  .then(offers=>{
    renderPins(offers)
  })
  */
