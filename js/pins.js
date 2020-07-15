'use strict';

window.pins = (function () {
  var PIN_WIDTH = 50;

  var PIN_HEIGHT = 70;

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
  for (var i = 0; i < window.cards.rentAdverts.length; i++) {
    fragment.appendChild(generatePin(window.cards.rentAdverts[i]));
  }
  mapPinsElement.appendChild(fragment);

  return {
    generatePin: generatePin,
  };
})();
