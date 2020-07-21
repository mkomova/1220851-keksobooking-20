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

  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = document.querySelectorAll('.ad-form fieldset');
  var mapFiltersSelect = document.querySelectorAll('.map__filters select');
  var mapFeatures = document.querySelector('.map__features');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinButton = document.querySelectorAll('.map__pin:not(.map__pin--main)');

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
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
    var id = parseInt(evtClickPin.currentTarget.id, 10);
    window.popup.renderOfferCard(id);

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

  var pressPins = function () {
    for (var i = 0; i < mapPinButton.length; i++) {
      mapPinButton[i].id = i;
      mapPinButton[i].addEventListener('click', clickPinButton);
    }
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === LEFT_MOUSE_BUTTON) {
      activateMap();
      window.load(window.pins.successHandler, window.pins.errorHandler);
      window.form.getAddress();
      pressPins();
    }
  });

  var keyDownHandler = function (evt) {
    if (evt.key === 'Enter') {
      activateMap();
      window.form.getAddress();
      pressPins();
    }
  };

  mapPinMain.addEventListener('keydown', keyDownHandler);

  return {
    activateMap: activateMap,
    pressPins: pressPins
  };
})();
