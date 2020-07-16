'use strict';

window.move = (function () {
  var Y_MIN = 130;
  var Y_MAX = 630;
  var X_MIN = -30;
  var X_MAX = 1170;

  var mapPinMain = document.querySelector('.map__pin--main');

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (((mapPinMain.offsetTop - shift.y) <= Y_MIN) || ((mapPinMain.offsetTop - shift.y) >= Y_MAX)) {
        mapPinMain.style.top = mapPinMain.offsetTop + 'px';
      } else {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      }

      if (((mapPinMain.offsetLeft - shift.x) <= X_MIN) || ((mapPinMain.offsetLeft - shift.x) >= X_MAX)) {
        mapPinMain.style.left = mapPinMain.offsetLeft + 'px';
      } else {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }

      window.form.getAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
