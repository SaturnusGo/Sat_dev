document.querySelector('.back-link').addEventListener('click', function(event) {
  event.preventDefault(); // Отменяем стандартное поведение ссылки
  const url = '/'; // Адрес новой страницы
  window.location.href = url; // Перенаправляем на новую страницу
});


