'use strict';

window.form = (function () {
  // Установка адреса
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var address = document.querySelector('#address');
  var mapPinMain = document.querySelector('.map__pin--main');

  var getAddress = function () {
    var locationX = parseInt(mapPinMain.style.left, 10) + PIN_WIDTH / 2;
    var locationY = parseInt(mapPinMain.style.top, 10) + PIN_HEIGHT;
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
      timeOut.value = timeIn.value;
    }
  };

  var getTimeOut = function () {
    if (timeOut.value !== timeIn.value) {
      timeIn.value = timeOut.value;
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

  var map = document.querySelector('.map');
  var notice = document.querySelector('.notice');
  var adForm = notice.querySelector('.ad-form');

  var reset = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    adForm.reset();
    window.pins.startMainPinPosition();
    window.form.getAddress();
    window.filter.resetFilter();
    window.map.hidePins();
    window.avatar.removeAvatar();
    window.formPhoto.removePhoto();
  };

  adForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(adForm), function () {
      reset();
      window.messages.getSuccessMessage();
    });
    evt.preventDefault();
  });

  var resetButton = document.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', function () {
    reset();
  });

  return {
    getAddress: getAddress,
  };
})();
