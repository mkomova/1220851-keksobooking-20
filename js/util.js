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

  return {
    getRandomInt: getRandomInt,
    getRandomArrayElement: getRandomArrayElement,
    getArrayRandomLength: getArrayRandomLength,
  };
})();
