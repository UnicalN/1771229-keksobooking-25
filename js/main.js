//import {createOfferLayout} from './modules/generate-layout.js';
import {validateOffer} from './modules/interaction-with-form.js';
import {getData} from './modules/server-interfaces.js';
import {createMarkers, createMainMarker} from './modules/map.js';
//import {enablePage, disablePage} from './modules/enable-disable-page'
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
