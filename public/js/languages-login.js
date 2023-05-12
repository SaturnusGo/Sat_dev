document.addEventListener('DOMContentLoaded', function() {
  const languageSwitch = document.getElementById('language-switch-dropdown');
  const languageOptions = document.querySelectorAll('.language-option');
  const elementsWithData = document.querySelectorAll('[data-ru], [data-en], [data-es]');

  languageSwitch.addEventListener('click', function() {
    const activeLanguage = document.querySelector('.language-option.active');
    const nextLanguageIndex = (Array.from(languageOptions).indexOf(activeLanguage) + 1) % languageOptions.length;
    const nextLanguage = languageOptions[nextLanguageIndex];

    activeLanguage.classList.remove('active');
    nextLanguage.classList.add('active');

    const lang = nextLanguage.dataset.lang;
    elementsWithData.forEach(element => {
      if (element.dataset[lang]) {
        element.textContent = element.dataset[lang];
      }
    });
  });
});
