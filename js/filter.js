'use strict';

window.filter = (function () {
  var housingType = document.querySelector('#housing-type');

  var updateOffer = function (data) {
    if (data !== 'any') {
      window.filter.similarTypes = window.data.dataServer.filter(function (item) {
        return item.offer.type === housingType.value;
      });
    }
    window.pins.renderPins(window.filter.similarTypes);
    window.popup.renderOfferCard(window.filter.similarTypes);
    window.map.pressPins();
  };

  housingType.addEventListener('change', function () {
    window.debounce(updateOffer());
  });

  return {
    similarTypes: [],
  };
})();
