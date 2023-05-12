$(document).ready(function () {
  // Загрузка данных из local storage
  const firstName = localStorage.getItem('first_name');
  const lastName = localStorage.getItem('last_name');

  if (firstName) {
    $('#first-name').val(firstName);
  }
  if (lastName) {
    $('#last-name').val(lastName);
  }

  // Обработчик события для кнопки "Обновить" в модальном окне "Имя"
  $('.dialog-name .update-btn').on('click', function () {
    const updatedFirstName = $('#first-name').val();
    const updatedLastName = $('#last-name').val();

    // Сохранение данных в local storage
    localStorage.setItem('first_name', updatedFirstName);
    localStorage.setItem('last_name', updatedLastName);

    // Закрытие модального окна
    // Здесь нужно добавить код для закрытия модального окна
  });
});
