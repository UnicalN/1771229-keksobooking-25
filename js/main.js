//import {createOfferLayout} from './modules/generate-layout.js';
import {validateOffer, setUserFormSubmit} from './modules/interaction-with-form.js';
import {getData} from './modules/server-interfaces.js';
import {createMainMarker} from './modules/map.js';
import {enablePage, disablePage} from './modules/enable-disable-page.js';
//disablePage();
validateOffer();
getData();
createMainMarker();
setUserFormSubmit();

