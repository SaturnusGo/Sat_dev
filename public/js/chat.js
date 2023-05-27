function sendPassengerMessage(event) {
  event.preventDefault();
  var messageInput = document.querySelector(".chat-bar__input");
  var message = messageInput.value.trim();

  if (message !== "") {
    sendMessage(message);
    messageInput.value = "";
    clearMessages(); // Очистка списка сообщений
  }
}

function sendMessage(message) {
  var messageList = document.getElementById("messages");
  var li = document.createElement("li");

  // Добавляем классы 'message' и 'message-sent' для стилизации
  li.classList.add("message", "message-sent");

  li.textContent = message;
  li.addEventListener("click", function() {
    insertMessage(message);
    messageList.removeChild(li); // Удаление выбранного сообщения
  });
  messageList.appendChild(li);
}

function clearMessages() {
  var messageList = document.getElementById("messages");
  while (messageList.firstChild) {
    messageList.removeChild(messageList.firstChild);
  }
}

function insertMessage(message) {
  var messageInput = document.querySelector(".chat-bar__input");
  messageInput.value = message;
  messageInput.focus();
}

window.addEventListener("DOMContentLoaded", function() {
  var messages = document.querySelectorAll(".message");
  messages.forEach(function(message) {
    message.addEventListener("click", function() {
      var text = this.textContent;
      insertMessage(text);
      this.parentNode.removeChild(this); // Удаление выбранного сообщения
    });
  });
});

var swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

document.querySelector('.button.b-2').addEventListener('click', uploadPhoto);

function appendMessage(message, isOwnMessage) {
    var messages = document.getElementById('messages');
    var li = document.createElement('li');
    if(isOwnMessage) {
        li.classList.add("own-message");
    }
    li.appendChild(document.createTextNode(message));

    // Добавление сообщения в начало списка
    messages.prepend(li);

    // Скролл вверх
    messages.scrollTop = 0;
}
// PHOTO
function uploadFile() {
    document.getElementById('file-input').click();
}


document.getElementById('file-input').addEventListener('change', function() {
    var file = this.files[0];
    var formData = new FormData();
    formData.append('file', file);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'upload.php'); // Замените 'upload.php' на URL вашего серверного скрипта, который будет обрабатывать загрузку файла
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log('Файл успешно загружен в чат');
            // Дополнительный код для обработки успешной загрузки файла в чат
        }
    };
    xhr.send(formData);
});




