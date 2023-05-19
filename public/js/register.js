$(document).ready(function () {
  $(".password-toggle-btn").on("click", function () {
    var passwordInput = $("#password");
    var eyeIcon = $(this);

    if (passwordInput.attr("type") === "password") {
      passwordInput.attr("type", "text");
      eyeIcon.removeClass("fa-eye").addClass("fa-eye-slash");
    } else {
      passwordInput.attr("type", "password");
      eyeIcon.removeClass("fa-eye-slash").addClass("fa-eye");
    }
  });
});

document.getElementById("password-form").addEventListener("submit", function (event) {
  event.preventDefault();

  // Собираем данные из формы
  const formData = new FormData(event.target);

  // Отправляем данные на сервер с использованием AJAX
  fetch("/register/submit", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // Проверяем, успешна ли регистрация
      if (data.success) {
        // Обновляем страницу редактирования профиля с полученными данными
        window.location.href = "/profile.html?user_id=" + data.user_id;
      } else {
        // Обработка ошибок регистрации
        console.error("Ошибка регистрации");
      }
    })
    .catch((error) => {
      console.error("Ошибка:", error);
    });
});

// Добавляем функцию для получения данных пользователя
function getUserData(user_id) {
  fetch(`/api/get_user_data?user_id=${user_id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Ошибка при получении данных пользователя");
      }
      return response.json();
    })
    .then((data) => {
      // Отображаем данные пользователя на странице
      document.getElementById("name-block").innerText = `${data.first_name} ${data.last_name}`;
      document.getElementById("phone-block").innerText = data.phone;
      document.getElementById("email-block").innerText = data.email;
      // ... добавьте остальные поля для отображения данных пользователя
    })
    .catch((error) => {
      console.error("Ошибка при получении данных пользователя:", error);
    });
}

// Извлекаем параметры из URL
const urlParams = new URLSearchParams(window.location.search);

// Получаем user_id из URL
const user_id = urlParams.get("user_id");

// Получаем данные пользователя
if (user_id) {
  getUserData(user_id);
}

$("#register_form").on("submit", function(e) {
  e.preventDefault();

  var email = $("#email").val();

  $.ajax({
    url: '/register/email',
    type: 'POST',
    data: JSON.stringify({email: email}),
    contentType: 'application/json',
    success: function(response) {
      // переходите к следующему шагу регистрации
    },
    error: function(response) {
      console.error(response);  // выводим полный ответ сервера
    }
  });
});

$(document).ready(function() {
    $("#email").on("blur", function() {
        var email = $(this).val();
        $.ajax({
            url: '/check_email',
            method: 'POST',
            data: {email: email},
            success: function(data) {
                if (data['exists']) {
                    // Тут вы можете добавить вывод сообщения пользователю
                    // с предложением восстановить доступ
                    $(".error-msg").html("Пользователь с таким имейлом уже зарегистрирован. <a href='/recovery'>Восстановить доступ?</a>");
                }
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    });
});




