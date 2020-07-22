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
    if (evt.target !== successMessage || evt.target !== errorMessage) {
      successElement.classList.add('hidden');
      document.removeEventListener('click', popupCloseByClick);
      document.removeEventListener('keydown', popupCloseByKeydown);
    }
  };

  // Сообщение об ошибке
  var main = document.querySelector('main');

  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var generateErrorPopup = function () {
    var errorPopup = errorTemplate.cloneNode(true);

    return main.appendChild(errorPopup);
  };
  generateErrorPopup();

  var errorElement = document.querySelector('.error');
  var errorMessage = document.querySelector('.error__message');
  var errorButton = document.querySelector('.error__button');

  errorElement.classList.add('hidden');

  var getErrorMessage = function () {
    errorElement.classList.remove('hidden');
    errorButton.addEventListener('click', popupCloseByClick);
    document.addEventListener('keydown', popupCloseByKeydown);
    document.addEventListener('click', popupCloseByClick);
  };

  return {
    getRandomInt: getRandomInt,
    getRandomArrayElement: getRandomArrayElement,
    getArrayRandomLength: getArrayRandomLength,
    getSuccessMessage: getSuccessMessage,
    getErrorMessage: getErrorMessage
  };
})();
