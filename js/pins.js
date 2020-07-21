'use strict';

window.pins = (function () {
  var PIN_WIDTH = 50;

  var PIN_HEIGHT = 70;

  var MAX_RENT_ADVERTS = 8;

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

  var mapPinsElement = document.querySelector('.map__pins');

  var renderPins = function (adverts) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < MAX_RENT_ADVERTS; i++) {
      fragment.appendChild(generatePin(adverts[i]));
    }
    mapPinsElement.appendChild(fragment);
  };

  var successHandler = function (rentAdverts) {
    window.cardsMock.dataServer = rentAdverts;
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
    errorHandler: errorHandler
  };
})();
