'use strict';

window.formPhoto = (function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserForm = document.querySelector('.ad-form__upload input[type=file]');
  var previewForm = document.querySelector('.ad-form__photo');

  fileChooserForm.addEventListener('change', function () {
    previewForm.innerHTML = '<img>';

    var imageElement = previewForm.querySelector('img');

    imageElement.alt = 'Фотография жилья';
    imageElement.width = '70';
    imageElement.height = '70';


    var fileForm = fileChooserForm.files[0];
    var fileNameForm = fileForm.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileNameForm.endsWith(it);
    });

    if (matches) {
      var readerForm = new FileReader();

      readerForm.addEventListener('load', function () {
        imageElement.src = readerForm.result;
      });

      readerForm.readAsDataURL(fileForm);
    }
  });

  var removePhoto = function () {
    var formPhoto = previewForm.querySelector('img');
    if (formPhoto) {
      formPhoto.remove();
    }
  };

  return {
    removePhoto: removePhoto,
  };
})();
