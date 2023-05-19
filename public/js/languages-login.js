document.addEventListener('DOMContentLoaded', function() {
  const languageSwitch = document.getElementById('language-switch-dropdown');
  const languageOptions = document.querySelectorAll('.language-option');
  const elementsWithData = document.querySelectorAll('[data-ru], [data-en], [data-es]');

  // Получаем сохраненный выбранный язык из локального хранилища
  const selectedLanguage = localStorage.getItem('selectedLanguage');

  // Устанавливаем активный класс для выбранного языка
  if (selectedLanguage) {
    const selectedLanguageOption = document.querySelector(`.language-option[data-lang="${selectedLanguage}"]`);
    selectedLanguageOption.classList.add('active');
  }

  // Функция для обновления текстовых элементов на странице с учетом выбранного языка
  function updateTexts(language) {
    elementsWithData.forEach(element => {
      if (element.dataset[language]) {
        element.textContent = element.dataset[language];
      }
    });
  }

  // Обновляем тексты при загрузке страницы
  if (selectedLanguage) {
    updateTexts(selectedLanguage);
  }

  languageSwitch.addEventListener('click', function() {
    const activeLanguage = document.querySelector('.language-option.active');
    const nextLanguageIndex = (Array.from(languageOptions).indexOf(activeLanguage) + 1) % languageOptions.length;
    const nextLanguage = languageOptions[nextLanguageIndex];

    activeLanguage.classList.remove('active');
    nextLanguage.classList.add('active');

    const lang = nextLanguage.dataset.lang;

    // Сохраняем выбранный язык в локальном хранилище
    localStorage.setItem('selectedLanguage', lang);

    // Обновляем тексты на странице с учетом выбранного языка
    updateTexts(lang);
  });
});
