'use strict';

window.util = (function () {
  var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomArrayElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getArrayRandomLength = function (array) {
    return array.slice(getRandomInt(0, array.length));
  };

  // Сообщение об успешной отправке формы
  var body = document.querySelector('body');
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var generateSuccessPopup = function () {
    var successPopup = successTemplate.cloneNode(true);

    return body.appendChild(successPopup);
  };
  generateSuccessPopup();

  var successElement = document.querySelector('.success');
  var successMessage = document.querySelector('.success__message');

  successElement.classList.add('hidden');

  var getSuccessMessage = function () {
    successElement.classList.remove('hidden');
    document.addEventListener('keydown', popupCloseByKeydown);
    document.addEventListener('click', popupCloseByClick);
  };

  var popupCloseByKeydown = function (evt) {
    evt.preventDefault();
    if (evt.key === 'Escape') {
      popupCloseByClick(evt);
    }
  };

  var popupCloseByClick = function (evt) {
    if (evt.target !== successMessage) {
      successElement.classList.add('hidden');
      document.removeEventListener('click', popupCloseByClick);
      document.removeEventListener('keydown', popupCloseByKeydown);
    }
  };


  return {
    getRandomInt: getRandomInt,
    getRandomArrayElement: getRandomArrayElement,
    getArrayRandomLength: getArrayRandomLength,
    getSuccessMessage: getSuccessMessage,
  };
})();
