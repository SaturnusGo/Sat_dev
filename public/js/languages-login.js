// Функции для работы с cookies
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

document.addEventListener('DOMContentLoaded', function() {
  const languageSwitch = document.getElementById('language-switch-dropdown');
  const languageOptions = document.querySelectorAll('.language-option');
  const elementsWithData = document.querySelectorAll('[data-ru], [data-en], [data-es]');

  // Получаем сохраненный выбранный язык из локального хранилища или из cookies
  const selectedLanguage = localStorage.getItem('selectedLanguage') || getCookie('selectedLanguage');

  if (selectedLanguage) {
    const selectedLanguageOption = document.querySelector(`.language-option[data-lang="${selectedLanguage}"]`);
    selectedLanguageOption.classList.add('active');
  }

  function updateTexts(language) {
    elementsWithData.forEach(element => {
      if (element.dataset[language]) {
        element.textContent = element.dataset[language];
      }
    });
  }

  function getUserRegionAndCountry(callback) {
    fetch('http://api.ipapi.com/check?access_key=8cc3838e458e4fc6df665d9ac6496e2d')
      .then(response => response.json())
      .then(data => {
        const region = data.region_code.toLowerCase();
        const country = data.country_code.toLowerCase();
        callback(region, country);
      })
      .catch(error => {
        console.error('Error:', error);
        callback(null, null);
      });
  }

  function setDefaultLanguageBasedOnRegionAndCountry(region, country) {
    let defaultLanguage = 'ru';
    if (region === 'en') {
      defaultLanguage = 'en';
    }
    const defaultLanguageOption = document.querySelector(`.language-option[data-lang="${defaultLanguage}"]`);
    defaultLanguageOption.classList.add('active');
    // Сохраняем выбранный язык в локальном хранилище и в cookies
    localStorage.setItem('selectedLanguage', defaultLanguage);
    setCookie('selectedLanguage', defaultLanguage, 365);  // Сохраняем на год
    updateTexts(defaultLanguage);
  }

  getUserRegionAndCountry(function(region, country) {
    setDefaultLanguageBasedOnRegionAndCountry(region, country);
  });

  languageSwitch.addEventListener('click', function() {
    const activeLanguage = document.querySelector('.language-option.active');
    const nextLanguageIndex = (Array.from(languageOptions).indexOf(activeLanguage) + 1) % languageOptions.length;
    const nextLanguage = languageOptions[nextLanguageIndex];

    activeLanguage.classList.remove('active');
    nextLanguage.classList.add('active');

    const lang = nextLanguage.dataset.lang;

    // Сохраняем выбранный язык в локальном хранилище и в cookies
    localStorage.setItem('selectedLanguage', lang);
    setCookie('selectedLanguage', lang, 365);  // Сохраняем на год

    updateTexts(lang);
  });
});
