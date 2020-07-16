'use strict';

window.cards = (function () {

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

  var generateRentAdverts = function (quantity) {

    var rentAdverts = [];

    for (var i = 0; i < quantity; i++) {
      var rentLocationX = window.util.getRandomInt(0, 1200);
      var rentLocationY = window.util.getRandomInt(130, 630);
      var rentRooms = window.util.getRandomInt(1, 100);

      rentAdverts[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png',
        },
        offer: {
          title: 'Заголовок предложения ',
          address: rentLocationX + ', ' + rentLocationY,
          price: window.util.getRandomInt(0, MAX_PRICE_VALUE),
          type: window.util.getRandomArrayElement(RENT_TYPES),
          rooms: rentRooms,
          guests: rentRooms,
          checkin: window.util.getRandomArrayElement(RENT_CHECKINS_CHECKOUTS),
          checkout: window.util.getRandomArrayElement(RENT_CHECKINS_CHECKOUTS),
          features: window.util.getArrayRandomLength(RENT_FEATURES),
          description: 'Описание сдающегося объекта ',
          photos: window.util.getArrayRandomLength(RENT_PHOTOS),
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

  return {
    rentAdverts: rentAdverts
  };
})();
