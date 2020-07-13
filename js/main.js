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

var LEFT_MOUSE_BUTTON = 0;

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

// Отрисовка массива карточек
var generateRentAdverts = function (quantity) {

  var rentAdverts = [];

  for (var i = 0; i < quantity; i++) {
    var rentLocationX = getRandomInt(0, 1200);
    var rentLocationY = getRandomInt(130, 630);
    var rentRooms = getRandomInt(1, 100);

    rentAdverts[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png',
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

// Отрисовка меток
var map = document.querySelector('.map');

var mapPinsElement = document.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var generatePin = function (forRent) {
  var pin = pinTemplate.cloneNode(true);
  var imgElement = pin.querySelector('img');

  imgElement.setAttribute('src', forRent.author.avatar);
  imgElement.setAttribute('alt', forRent.offer.title);
  pin.style.left = forRent.location.x - PIN_WIDTH / 2 + 'px';
  pin.style.top = forRent.location.y - PIN_HEIGHT + 'px';

  return pin;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < rentAdverts.length; i++) {
  fragment.appendChild(generatePin(rentAdverts[i]));
}
mapPinsElement.appendChild(fragment);

// Попап карточки
var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

var generateCard = function (rentAd) {
  var offerCard = cardTemplate.cloneNode(true);

  var cardTitle = offerCard.querySelector('.popup__title');
  var cardAdress = offerCard.querySelector('.popup__text--address');
  var cardPrice = offerCard.querySelector('.popup__text--price');
  var cardType = offerCard.querySelector('.popup__type');
  var cardCapacity = offerCard.querySelector('.popup__text--capacity');
  var cardTime = offerCard.querySelector('.popup__text--time');
  var cardFeaturesContainer = offerCard.querySelector('.popup__features');
  var cardFeatures = cardFeaturesContainer.children;
  var cardDescription = offerCard.querySelector('.popup__description');
  var cardPhotos = offerCard.querySelector('.popup__photos');
  var cardAvatar = offerCard.querySelector('.popup__avatar');

  cardTitle.textContent = rentAd.offer.title;
  cardAdress.textContent = rentAd.offer.address;
  cardPrice.textContent = rentAd.offer.price + ' ₽/ночь';

  switch (rentAd.offer.type) {
    case ('flat'):
      cardType.textContent = 'квартира';
      break;
    case ('bungalo'):
      cardType.textContent = 'бунгало';
      break;
    case ('house'):
      cardType.textContent = 'дом';
      break;
    case ('palace'):
      cardType.textContent = 'дворец';
      break;
  }

  cardCapacity.textContent = rentAd.offer.rooms + ' комнаты для ' + rentAd.offer.guests + ' гостей';
  cardTime.textContent = 'Заезд после ' + rentAd.offer.checkin + ', выезд до ' + rentAd.offer.checkout;

  var generateFeatures = function (features) {
    var fragmentFeatures = document.createDocumentFragment();

    features.forEach(function (feature) {
      var featureElement = document.createElement('li');
      featureElement.className = 'popup__feature popup__feature--' + feature;
      fragmentFeatures.appendChild(featureElement);
    });
    return fragmentFeatures;
  };

  for (var j = cardFeatures.length; j--;) {
    cardFeaturesContainer.removeChild(cardFeatures[j]);
  }
  cardFeaturesContainer.appendChild(generateFeatures(rentAd.offer.features));

  cardDescription.textContent = rentAd.offer.description;

  var getPhotos = function (array, block) {
    var fragmentPhoto = document.createDocumentFragment();

    block.innerHTML = '';

    for (var i = 0; i < array.length; i++) {
      var photo = document.createElement('img');
      photo.src = array[i];
      photo.width = 45;
      photo.height = 40;
      photo.classList.add('popup__photo');

      fragmentPhoto.appendChild(photo);
    }

    return block.appendChild(fragmentPhoto);
  };
  getPhotos(rentAd.offer.photos, cardPhotos);

  cardAvatar.src = rentAd.author.avatar;

  return offerCard;
};

var mapFiltersContainer = document.querySelector('.map__filters-container');

var renderOfferCard = function () {
  var fragmentOffer = document.createDocumentFragment();
  fragmentOffer.appendChild(generateCard(getRandomArrayElement(rentAdverts)));
  map.insertBefore(fragmentOffer, mapFiltersContainer);
};

// Активация карты
var makeElementsDisabled = function (array) {
  for (var i = 0; i < array.length; i++) {
    array[i].setAttribute('disabled', 'true');
  }
};

var makeElementsActive = function (array) {
  for (var i = 0; i < array.length; i++) {
    array[i].removeAttribute('disabled');
  }
};

var adForm = document.querySelector('.ad-form');
var adFormFieldset = document.querySelectorAll('.ad-form fieldset');
var mapFiltersSelect = document.querySelectorAll('.map__filters select');
var mapFeatures = document.querySelector('.map__features');
var mapPinMain = document.querySelector('.map__pin--main');

makeElementsDisabled(adFormFieldset);
makeElementsDisabled(mapFiltersSelect);
makeElementsDisabled(mapFeatures);


var activateMap = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  makeElementsActive(adFormFieldset);
  makeElementsActive(mapFiltersSelect);
  makeElementsActive(mapFeatures);

  mapPinMain.removeEventListener('keydown', keyDownHandler);
};

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === LEFT_MOUSE_BUTTON) {
    activateMap();
    getAddress();
    pressPins();
  }
});

var keyDownHandler = function (evt) {
  if (evt.key === 'Enter') {
    activateMap();
    getAddress();
    pressPins();
  }
};

mapPinMain.addEventListener('keydown', keyDownHandler);

// Установка адреса
var address = document.querySelector('#address');

var getAddress = function () {
  var locationX = Math.round(getRandomInt(0, 1200) - PIN_WIDTH / 2);
  var locationY = Math.round(getRandomInt(130, 630) - PIN_HEIGHT);
  address.value = locationX + ', ' + locationY;
};

// Соответствие количества гостей комнатам
var roomElements = document.querySelector('#room_number');
var capacityElements = document.querySelector('#capacity');
var adFormSubmit = document.querySelector('.ad-form__submit');

var getRoomsToGuests = function () {
  if (roomElements.value === '1' && capacityElements.value !== '1') {
    capacityElements.setCustomValidity('Только для 1 гостя');
  } else if (roomElements.value === '2' && (capacityElements.value > roomElements.value || capacityElements.value === '0')) {
    capacityElements.setCustomValidity('До 2 гостей');
  } else if (roomElements.value === '3' && capacityElements.value === '0') {
    capacityElements.setCustomValidity('До 3 гостей');
  } else if (roomElements.value === '100' && capacityElements.value !== '0') {
    capacityElements.setCustomValidity('Только не для гостей');
  } else {
    capacityElements.setCustomValidity('');
  }
};

adFormSubmit.addEventListener('click', function () {
  getRoomsToGuests();
});

// Связка меток с карточками
var mapPinButton = document.querySelectorAll('.map__pin:not(.map__pin--main)');

var pressPins = function () {
  for (var i = 0; i < mapPinButton.length; i++) {
    mapPinButton[i].addEventListener('click', function () {
      var currentCard = i;
      clickPinButton(currentCard);
    });
  }
};

var clickPinButton = function () {
  var mapCard = document.querySelector('.map__card');
  if (mapCard) {
    mapCard.remove();
  }
  renderOfferCard();

  var popupCloseByKeydown = function (evt) {
    evt.preventDefault();
    if (evt.key === 'Escape') {
      popupCloseByClick(evt);
    }
  };

  var popup = document.querySelector('.popup');
  var popupClose = popup.querySelector('.popup__close');

  var popupCloseByClick = function () {
    popup.remove();
    popupClose.removeEventListener('click', popupCloseByClick);
    document.removeEventListener('keydown', popupCloseByKeydown);
  };
  popupClose.addEventListener('click', popupCloseByClick);
  document.addEventListener('keydown', popupCloseByKeydown);
};

// Время заезда и выезда
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');

var getTimeIn = function () {
  if (timeIn.value !== timeOut.value) {
    timeIn.setCustomValidity('Время заезда и выезда должно совпадать');
  } else {
    timeIn.setCustomValidity('');
  }
};

var getTimeOut = function () {
  if (timeOut.value !== timeIn.value) {
    timeOut.setCustomValidity('Время заезда и выезда должно совпадать');
  } else {
    timeOut.setCustomValidity('');
  }
};
getTimeIn();
getTimeOut();

timeIn.addEventListener('change', getTimeIn);
timeOut.addEventListener('change', getTimeOut);

// Тип жилья и минимальная цена
var type = document.querySelector('#type');
var price = document.querySelector('#price');

var getPriceToType = function () {
  switch (type.value) {
    case ('bungalo'):
      price.setAttribute('min', 0);
      price.setAttribute('placeholder', 0);
      break;
    case ('flat'):
      price.setAttribute('min', 1000);
      price.setAttribute('placeholder', 1000);
      break;
    case ('house'):
      price.setAttribute('min', 5000);
      price.setAttribute('placeholder', 5000);
      break;
    case ('palace'):
      price.setAttribute('min', 10000);
      price.setAttribute('placeholder', 10000);
      break;
  }
};

type.addEventListener('change', function () {
  getPriceToType();
});
