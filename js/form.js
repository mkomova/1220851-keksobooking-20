'use strict';

window.form = (function () {
  // Установка адреса
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var Y_MIN = 130;
  var Y_MAX = 630;
  var X_MIN = -30;
  var X_MAX = 1170;
  var address = document.querySelector('#address');

  var getAddress = function () {
    var locationX = Math.round(window.util.getRandomInt(X_MIN, X_MAX) - PIN_WIDTH / 2);
    var locationY = Math.round(window.util.getRandomInt(Y_MIN, Y_MAX) - PIN_HEIGHT);
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

  var notice = document.querySelector('.notice');
  var adForm = notice.querySelector('.ad-form');
  adForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(adForm), function (response) {
      notice.classList.add('ad-form--disabled');
      adForm.reset();
      window.util.getSuccessMessage();

    });
    evt.preventDefault();
  });

  return {
    getAddress: getAddress,
  };
})();
