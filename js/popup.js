'use strict';

window.popup = (function () {
  var map = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var generateCard = function (rentAd) {
    var offerCard = cardTemplate.cloneNode(true);

    var cardTitle = offerCard.querySelector('.popup__title');
    var cardAdress = offerCard.querySelector('.popup__text--address');
    var cardPrice = offerCard.querySelector('.popup__text--price');
    var cardType = offerCard.querySelector('.popup__type');
    var cardCapacity = offerCard.querySelector('.popup__text--capacity');
    var cardTime = offerCard.querySelector('.popup__text--time');
    var cardFeaturesContainer = offerCard.querySelector('.popup__features');
    var cardFeatures = cardFeaturesContainer.children;
    var cardDescription = offerCard.querySelector('.popup__description');
    var cardPhotos = offerCard.querySelector('.popup__photos');
    var cardAvatar = offerCard.querySelector('.popup__avatar');

    cardTitle.textContent = rentAd.offer.title;
    cardAdress.textContent = rentAd.offer.address;
    cardPrice.textContent = rentAd.offer.price + ' ₽/ночь';

    switch (rentAd.offer.type) {
      case ('flat'):
        cardType.textContent = 'квартира';
        break;
      case ('bungalo'):
        cardType.textContent = 'бунгало';
        break;
      case ('house'):
        cardType.textContent = 'дом';
        break;
      case ('palace'):
        cardType.textContent = 'дворец';
        break;
    }

    cardCapacity.textContent = rentAd.offer.rooms + ' комнаты для ' + rentAd.offer.guests + ' гостей';
    cardTime.textContent = 'Заезд после ' + rentAd.offer.checkin + ', выезд до ' + rentAd.offer.checkout;

    var generateFeatures = function (features) {
      var fragmentFeatures = document.createDocumentFragment();

      features.forEach(function (feature) {
        var featureElement = document.createElement('li');
        featureElement.className = 'popup__feature popup__feature--' + feature;
        fragmentFeatures.appendChild(featureElement);
      });
      return fragmentFeatures;
    };

    for (var j = cardFeatures.length; j--;) {
      cardFeaturesContainer.removeChild(cardFeatures[j]);
    }
    cardFeaturesContainer.appendChild(generateFeatures(rentAd.offer.features));

    cardDescription.textContent = rentAd.offer.description;

    var getPhotos = function (array, block) {
      var fragmentPhoto = document.createDocumentFragment();

      block.innerHTML = '';

      for (var i = 0; i < array.length; i++) {
        var photo = document.createElement('img');
        photo.src = array[i];
        photo.width = 45;
        photo.height = 40;
        photo.classList.add('popup__photo');

        fragmentPhoto.appendChild(photo);
      }

      return block.appendChild(fragmentPhoto);
    };
    getPhotos(rentAd.offer.photos, cardPhotos);

    cardAvatar.src = rentAd.author.avatar;

    return offerCard;
  };

  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var renderOfferCard = function (id) {
    var card = generateCard(window.cardsMock.dataServer[id]);
    map.insertBefore(card, mapFiltersContainer);
  };

  return {
    renderOfferCard: renderOfferCard,
    generateCard: generateCard,
  };
})();
