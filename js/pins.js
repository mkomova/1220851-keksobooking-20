'use strict';

window.pins = (function () {
  var PIN_WIDTH = 50;

  var PIN_HEIGHT = 70;

  var MAIN_PIN_ADDRESS_TOP = '375px';

  var MAIN_PIN_ADDRESS_LEFT = '570px';

  var MAX_SIMILAR_PINS_COUNT = 5;

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

  var mapPinMain = document.querySelector('.map__pin--main');

  var startMainPinPosition = function () {
    mapPinMain.style.top = MAIN_PIN_ADDRESS_TOP;
    mapPinMain.style.left = MAIN_PIN_ADDRESS_LEFT;
  };

  var mapPinsElement = document.querySelector('.map__pins');

  var renderPins = function (adverts) {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var fragment = document.createDocumentFragment();
    var quantityPins = adverts.length > MAX_SIMILAR_PINS_COUNT ? MAX_SIMILAR_PINS_COUNT : adverts.length;

    for (i = 0; i < mapPins.length; i++) {
      mapPins[i].remove();
    }
    for (var i = 0; i < quantityPins; i++) {
      fragment.appendChild(generatePin(adverts[i]));
    }
    mapPinsElement.appendChild(fragment);
  };

  var successHandler = function (rentAdverts) {
    window.popup.dataServer = rentAdverts;
    window.filter.similarTypes = rentAdverts.slice();
    renderPins(rentAdverts);
    window.map.pressPins();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  return {
    generatePin: generatePin,
    successHandler: successHandler,
    errorHandler: errorHandler,
    renderPins: renderPins,
    startMainPinPosition: startMainPinPosition
  };
})();
