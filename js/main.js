import {generateOfferSummary} from './modules/generate-offer-summary.js';
import {createOfferLayout} from './modules/generate-layout.js';
const AMOUNT_OF_OFFERS = 1;
const offers = Array.from({length: AMOUNT_OF_OFFERS}, generateOfferSummary);
const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(createOfferLayout(offers[0]));
