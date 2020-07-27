'use strict';

window.filter = (function () {
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('input[name="features"]');
  var someFeatures = [];

  var filterTypes = function (item) {
    return item.offer.type === housingType.value || housingType.value === 'any';

  };

  var filterPrice = function (item) {
    if (housingPrice.value === 'low') {
      return item.offer.price < LOW_PRICE;
    } else if (housingPrice.value === 'middle') {
      return item.offer.price >= LOW_PRICE && item.offer.price <= HIGH_PRICE;
    } else if (housingPrice.value === 'high') {
      return item.offer.price > HIGH_PRICE;
    }
    return true;
  };

  var filterRooms = function (item) {
    return item.offer.rooms === parseInt(housingRooms.value, 10) || housingRooms.value === 'any';
  };

  var filterGuests = function (item) {
    return item.offer.guests === parseInt(housingGuests.value, 10) || housingGuests.value === 'any';
  };

  var getSomeFeatures = function (item) {
    var featureQuantity = 0;
    item.offer.features.filter(function (feature) {
      if (someFeatures.includes(feature)) {
        featureQuantity += 1;
      }
    });
    return someFeatures.length === featureQuantity;
  };

  var updateOffer = function (data) {
    if (data !== 'any') {
      window.filter.similarTypes = window.popup.dataServer.filter(function (item) {
        return filterTypes(item) && filterPrice(item) && filterRooms(item) && filterGuests(item) && getSomeFeatures(item);
      });

    }
    window.pins.renderPins(window.filter.similarTypes);
    window.map.removeCard();
    window.map.pressPins();
  };

  housingType.addEventListener('change', function () {
    window.debounce(updateOffer());
  });

  housingPrice.addEventListener('change', function () {
    window.debounce(updateOffer());
  });

  housingRooms.addEventListener('change', function () {
    window.debounce(updateOffer());
  });

  housingGuests.addEventListener('change', function () {
    window.debounce(updateOffer());
  });

  var getHousingFeatures = function (feature) {
    feature.addEventListener('change', function () {
      if (feature.classList.contains('checked')) {
        feature.classList.remove('checked');
        for (var i = 0; i < someFeatures.length; i++) {
          if (someFeatures[i] === feature.value) {
            someFeatures.splice(someFeatures[i], 1);
          }
        }
      } else {
        feature.classList.add('checked');
        someFeatures.push(feature.value);
      }
      window.debounce(updateOffer());
    });
  };

  for (var i = 0; i < housingFeatures.length; i++) {
    getHousingFeatures(housingFeatures[i]);
  }

  var resetFilterCards = function () {
    window.pins.renderPins(window.popup.dataServer);
    window.map.removeCard();
    window.map.pressPins();
  };

  var resetFilter = function () {
    housingType.value = 'any';
    housingPrice.value = 'any';
    housingRooms.value = 'any';
    housingGuests.value = 'any';

    for (var j = 0; j < housingFeatures.length; j++) {
      if (housingFeatures[j].classList.contains('checked')) {
        housingFeatures[j].classList.remove('checked');
        housingFeatures[j].checked = false;
      }
    }
    resetFilterCards();
  };

  return {
    similarTypes: [],
    resetFilter: resetFilter
  };
})();
