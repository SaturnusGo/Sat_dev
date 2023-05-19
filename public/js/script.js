console.clear();

const loginBtn = document.querySelector('.login .form-title');
const signupBtn = document.querySelector('.signup .form-title');

const formContainer = document.querySelector('.form-structor');

loginBtn.addEventListener('click', (e) => {
  let parent = e.target.parentNode.parentNode;
  Array.from(e.target.parentNode.parentNode.classList).find((element) => {
    if (element !== "slide-up") {
      parent.classList.add('slide-up')
    } else {
      signupBtn.parentNode.classList.add('slide-up')
      parent.classList.remove('slide-up')
    }
  });
});

signupBtn.addEventListener('click', (e) => {
  let parent = e.target.parentNode;
  Array.from(e.target.parentNode.classList).find((element) => {
    if (element !== "slide-up") {
      parent.classList.add('slide-up')
    } else {
      loginBtn.parentNode.parentNode.classList.add('slide-up')
      parent.classList.remove('slide-up')
    }
  });
});

document.addEventListener('click', (e) => {
  if (!formContainer.contains(e.target)) {
    const loginSlideUp = loginBtn.parentNode.parentNode.classList.contains('slide-up');
    const signupSlideUp = signupBtn.parentNode.classList.contains('slide-up');

    if (!loginSlideUp) {
      loginBtn.parentNode.parentNode.classList.add('slide-up');
    }

    if (!signupSlideUp) {
      signupBtn.parentNode.classList.add('slide-up');
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const submitBtn = document.getElementById("submit-btn");
  const loginOptions = document.querySelectorAll(".input-checkbox");

  submitBtn.addEventListener("click", function () {
    let selectedOption;
    loginOptions.forEach(function (option, index) {
      if (option.checked) {
        selectedOption = index;
      }
    });

    if (selectedOption === 0) {
      // Редирект на страницу входа в аккаунт
      window.location.href = "/login";
    } else if (selectedOption === 1) {
      // Редирект на страницу входа по номеру телефона
      window.location.href = "#";
    } else {
      alert("Пожалуйста, выберите одну из опций");
    }
  });
});

function handleLabelClick(event) {
  event.preventDefault();
  const radioInput = event.target.previousElementSibling;
  radioInput.checked = !radioInput.checked;
}

var accessButton = document.getElementById('access-button');
var nextButton = document.getElementById('next-button');

accessButton.addEventListener('click', function () {
  accessButton.classList.add('outlined');
  nextButton.classList.add('blinking');
  // отображаем предупреждение или модальное окно здесь
  modal("Пожалуйста, нажмите 'Next' для продолжения");
  // вы можете заменить alert на открытие модального окна, если вам это нужно
});

nextButton.addEventListener('click', function () {
  // выполняем переход на другую страницу здесь
  window.location.href = "/register";
});

document.addEventListener('DOMContentLoaded', function () {
  const checkboxes = document.querySelectorAll('.input-checkbox');
  const submitButton = document.getElementById('submit-btn');

  // Функция для мигания кнопки submit
  function blinkSubmitButton() {
    submitButton.classList.add('blinking');
    setTimeout(function () {
      submitButton.classList.remove('blinking');
    }, 1000);
  }

  // Обработчик клика на чекбокс
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
      blinkSubmitButton();
    });
  });

  // Обработчик клика на кнопку submit
  submitButton.addEventListener('click', function () {
    blinkSubmitButton();
  });
});

function modal(message) {
  // Ваш код для отображения модального окна здесь
  // Например, можно использовать Bootstrap Modal или создать свое собственное модальное окно
}

