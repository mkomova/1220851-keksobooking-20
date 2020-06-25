'use strict';
var RENT_QUANTITY = 8;

var MAX_PRICE_VALUE = 100000;

var RENT_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var RENT_CHECKINS_CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00'
];

var RENT_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var RENT_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var PIN_WIDTH = 50;

var PIN_HEIGHT = 70;

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getArrayRandomLength = function (array) {
  return array.slice(getRandomInt(0, array.length));
};


var generateRentAdverts = function (quantity) {

  var rentAdverts = [];

  for (var i = 0; i < quantity; i++) {
    var rentLocationX = getRandomInt(0, 1200);
    var rentLocationY = getRandomInt(130, 630);
    var rentRooms = getRandomInt(1, 100);

    rentAdverts[i] = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png',
      },
      offer: {
        title: 'Заголовок предложения ',
        address: rentLocationX + ', ' + rentLocationY,
        price: getRandomInt(0, MAX_PRICE_VALUE),
        type: getRandomArrayElement(RENT_TYPES),
        rooms: rentRooms,
        guests: rentRooms,
        checkin: getRandomArrayElement(RENT_CHECKINS_CHECKOUTS),
        checkout: getRandomArrayElement(RENT_CHECKINS_CHECKOUTS),
        features: getArrayRandomLength(RENT_FEATURES),
        description: 'Описание сдающегося объекта ',
        photos: getArrayRandomLength(RENT_PHOTOS),
      },
      location: {
        x: rentLocationX,
        y: rentLocationY,
      }
    };
  }
  return rentAdverts;
};

var rentAdverts = generateRentAdverts(RENT_QUANTITY);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPinsElement = document.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var generatePin = function (forRent) {
  var pin = pinTemplate.cloneNode(true);
  var imgElement = pin.querySelector('img');

  imgElement.setAttribute('src', forRent.author.avatar);
  imgElement.setAttribute('alt', forRent.offer.title);
  pin.style.left = forRent.location.x - PIN_WIDTH;
  pin.style.top = forRent.location.y - PIN_HEIGHT;

  return pin;
};

var fragment = document.createDocumentFragment();
for (var k = 0; k < rentAdverts.length; k++) {
  fragment.appendChild(generatePin(rentAdverts[k]));
}
mapPinsElement.appendChild(fragment);

