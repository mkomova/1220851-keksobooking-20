'use strict';
var RENT_QUANTITY = 8;

var RENT_NUMBERS = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8'
];

var RENT_PRICES = [
  '0',
  '1000',
  '5000',
  '10000'
];

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

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var rentAdverts = [];

for (var i = 0; i < RENT_QUANTITY; i++) {
  var number = getRandomArrayElement(RENT_NUMBERS);
  var rentLocationX = getRandomInt(0, 1200);
  var rentLocationY = getRandomInt(130, 630);
  var rentRooms = getRandomInt(1, 100);

  var rentAdvert = {
    author: {
      avatar: 'img/avatars/user0' + number + '.png',
    },
    offer: {
      title: 'Заголовок предложения ',
      address: rentLocationX + ', ' + rentLocationY,
      price: getRandomArrayElement(RENT_PRICES),
      type: getRandomArrayElement(RENT_TYPES),
      rooms: rentRooms,
      guests: rentRooms,
      checkin: getRandomArrayElement(RENT_CHECKINS_CHECKOUTS),
      checkout: getRandomArrayElement(RENT_CHECKINS_CHECKOUTS),
      features: getRandomArrayElement(RENT_FEATURES),
      description: 'Описание сдающегося объекта ',
      photos: getRandomArrayElement(RENT_PHOTOS),
    },
    location: {
      x: rentLocationX + 'px',
      y: rentLocationY + 'px',
    }
  };

  rentAdverts.push(rentAdvert);
}
