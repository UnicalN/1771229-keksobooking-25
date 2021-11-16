import { createOfferLayout } from './generate-layout.js';
import {enablePage} from './interaction-with-form.js';
const DEFAULT_LAT = 35.68;
const DEFAULT_LNG = 139.77;
const DEFAULT_SCALE = 13;
const MARKERS_AMOUNT = 10;
const SELECTOR_SIZE = 52;
const ICON_SIZE = 40;
//местоположение по умолчанию
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
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

// создание слоя
const markerGroup = L.layerGroup().addTo(map);
const selectLayer = L.layerGroup().addTo(map);

// функция отрисовки значков+попапов на слое карты
const createMarker = (offerSummary) => {
  const lat = offerSummary.location.lat;
  const lng = offerSummary.location.lng;

  const icon = L.icon({
    iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
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
//--------------------------------------------------

// markerGroup.clearLayers(); //очистка слоя
const filters = document.querySelector('.map__filters');
const filter= {
  type: filters.querySelector('#housing-type'),
  price: filters.querySelector('#housing-price'),
  rooms: filters.querySelector('#housing-rooms'),
  guests: filters.querySelector('#housing-guests'),
};

//const isOfferSuitable = ()

const createMarkers = (data) =>{
  let i=0;
  for (const offer of data) {
    //if()
    //{
    createMarker(offer);
    i++;
    if (i>=MARKERS_AMOUNT){
      break;
      // }
    }
  }
};


const createMainMarker = () => {
  const lat =  DEFAULT_LAT;
  const lng =  DEFAULT_LNG;

  const icon = L.icon({
    iconUrl: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
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
};

//доделать const createMarkersPlusEvtListener = (data)

export {createMarkers, createMainMarker};
