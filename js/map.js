'use strict';

window.map = (function () {
  var LEFT_MOUSE_BUTTON = 0;

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

  var removeCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  var hidePins = function () {
    var minorMapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < minorMapPins.length; i++) {
      minorMapPins[i].classList.add('hidden');
    }
    removeCard();
  };

  var activatePins = function () {
    var minorMapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < minorMapPins.length; i++) {
      minorMapPins[i].classList.remove('hidden');
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
    var map = document.querySelector('.map');
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    makeElementsActive(adFormFieldset);
    makeElementsActive(mapFiltersSelect);
    makeElementsActive(mapFeatures);

    mapPinMain.removeEventListener('keydown', keyDownHandler);
  };

  var clickPinButton = function (evtClickPin) {
    removeCard();

    var id = parseInt(evtClickPin.currentTarget.id, 10);
    window.popup.renderOfferCard(id);

    var popupCloseByKeydown = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
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

  var pressPins = function () {
    var mapPinButton = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPinButton.length; i++) {
      mapPinButton[i].id = i;
      mapPinButton[i].addEventListener('click', clickPinButton);
    }
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === LEFT_MOUSE_BUTTON) {
      activateMap();
      if (!window.filter.similarTypes.length) {
        window.load(window.pins.successHandler, window.pins.errorHandler);
      } else {
        activatePins();
      }
      window.form.getAddress();
    }
  });

  var keyDownHandler = function (evt) {
    if (evt.key === 'Enter') {
      activateMap();
      window.form.getAddress();
    }
  };

  mapPinMain.addEventListener('keydown', keyDownHandler);

  return {
    activateMap: activateMap,
    pressPins: pressPins,
    hidePins: hidePins,
    removeCard: removeCard,
    clickPinButton: clickPinButton
  };
})();
