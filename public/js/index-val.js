window.onload = function () {
  const languageOptions = document.querySelectorAll('.language-option');
  const inputFields = document.querySelectorAll('input[data-ru][data-en][data-es]');

  function changeLanguage(lang) {
    inputFields.forEach((input) => {
      const translatedText = input.getAttribute(`data-${lang}`);
      input.placeholder = translatedText;
    });

    const textNodes = document.querySelectorAll('[data-ru][data-en][data-es]');
    textNodes.forEach((element) => {
      const translatedText = element.getAttribute(`data-${lang}`);
      element.textContent = translatedText;
    });
  }

  languageOptions.forEach((option) => {
    option.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedLanguage = e.target.getAttribute('data-lang');
      changeLanguage(selectedLanguage);

      languageOptions.forEach((o) => o.classList.remove('active'));
      e.target.classList.add('active');
    });
  });

  const introVideo = document.getElementById('intro-video');
  const content = document.querySelector('.content');

  introVideo.play();

  introVideo.addEventListener('ended', () => {
    introVideo.style.display = 'none';
    content.style.display = 'block';
  });

  introVideo.addEventListener('click', function () {
    introVideo.pause();
    introVideo.style.display = 'none';
  });

  // Установка языка по умолчанию.
  changeLanguage('ru');
};
  document.getElementById("confirm-button").addEventListener("click", function() {
    window.location.href = "http://127.0.0.1:5000/map";
  });

