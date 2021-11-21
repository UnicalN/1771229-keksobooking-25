import {setAddressFromLatLng} from './interaction-with-form.js';
import { createOfferLayout } from './generate-layout.js';
import { isOfferSuitable } from './map-filters.js';
import {enablePage} from './enable-disable-page.js';

const DEFAULT_LAT = 35.68;
const DEFAULT_LNG = 139.77;
const DEFAULT_SCALE = 13;
const MARKERS_AMOUNT = 10;
const SELECTOR_SIZE = 52;
const ICON_SIZE = 40;
const MAIN_PIN_ICON_URL = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';
const PIN_ICON_URL = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_LAYER_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>';

const map = L.map('map')
  .on('load', () => {
    enablePage();
  })
  .setView({
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
  }, DEFAULT_SCALE);

// графика карты
L.tileLayer(
  TILE_LAYER,
  {
    attribution: TILE_LAYER_ATTR,
  },
).addTo(map);

// создание слоя
const markerGroup = L.layerGroup().addTo(map);
const selectLayer = L.layerGroup().addTo(map);


//добавление главного пина
const createMainMarker = () => {
  const lat =  DEFAULT_LAT;
  const lng =  DEFAULT_LNG;
  setAddressFromLatLng(DEFAULT_LAT, DEFAULT_LNG);
  const icon = L.icon({
    iconUrl: MAIN_PIN_ICON_URL,
    iconSize: [SELECTOR_SIZE, SELECTOR_SIZE],
    iconAnchor: [(SELECTOR_SIZE/2), SELECTOR_SIZE],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      draggable: true,
      icon,
    },
  );

  marker
    .addTo(selectLayer);

  // Отслеживание главного пина
  marker.addEventListener('moveend', (evt) =>
  {
    setAddressFromLatLng(evt.target._latlng.lat, evt.target._latlng.lng);
  },
  );

};

// функция отрисовки значков+попапов на слое карты
const createMarker = (offerSummary) => {
  const lat = offerSummary.location.lat;
  const lng = offerSummary.location.lng;

  const icon = L.icon({
    iconUrl: PIN_ICON_URL,
    iconSize: [ICON_SIZE, ICON_SIZE],
    iconAnchor: [(ICON_SIZE/2), ICON_SIZE],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(createOfferLayout(offerSummary));
};

//цикл отрисовки подходящих значков
const updatePins = (data) =>{
  markerGroup.clearLayers();
  let i=0;
  for (const offer of data) {
    if(isOfferSuitable(offer)){
      createMarker(offer);
      i++;
    }
    if (i>=MARKERS_AMOUNT){
      break;
    }
  }
};

export {
  updatePins,
  createMainMarker
};

