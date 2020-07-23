'use strict';

window.filter = (function () {

  var MAX_SIMILAR_PINS_COUNT = 5;
  var mapFilters = document.querySelector('.map__filters');
  var housingType = document.querySelector('#housing-type');
  var similarTypes = [];

  var render = function (data) {
    var fragmentPin = document.createDocumentFragment();
    var fragmentCard = document.createDocumentFragment();
    var map = document.querySelector('.map');
    var mapPins = document.querySelector('.map__pins');
    var mapFiltersContainer = document.querySelector('.map__filters-container');

    window.map.hidePins();

    var takeNumber = data.length > MAX_SIMILAR_PINS_COUNT ?
      MAX_SIMILAR_PINS_COUNT : data.length;
    for (var i = 0; i < takeNumber; i++) {
      fragmentPin.appendChild(window.pins.generatePin(data[i]));
      fragmentCard.appendChild(window.popup.generateCard(data[i]));
    }

    mapPins.appendChild(fragmentPin);
    map.insertBefore(fragmentCard, mapFiltersContainer);
  };

  var updateOffer = function (data) {
    var filtered = similarTypes.slice();

    if (data !== 'any') {
      filtered = similarTypes.filter(function (item) {
        return item.offer.type === housingType.value;
      });
    }
    render(filtered);
  };

  var matchingOffer = function (offers) {
    similarTypes = offers;
    updateOffer(offers);
    window.map.pressPins();
  };

  mapFilters.addEventListener('change', function () {
    updateOffer(housingType.value);
    window.load(matchingOffer, window.pins.errorHandler);
  });
})();
