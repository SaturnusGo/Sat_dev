const loginInput = document.querySelector('input[type="text"]');
const passwordInput = document.querySelector('input[type="password"]');

// Эмуляция ошибки ввода для проверки (удалить после реализации обработки ошибок на сервере)
const loginError = true;
const passwordError = false;

if (loginError) {
    loginInput.classList.add('error');
}

if (passwordError) {
    passwordInput.classList.add('error');
}
