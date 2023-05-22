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

function appendMessage(message, isOwnMessage) {
    var messages = document.getElementById('messages');
    var li = document.createElement('li');
    if(isOwnMessage) {
        li.classList.add("own-message");
    }
    li.appendChild(document.createTextNode(message));
    messages.appendChild(li);

    // Скролл вниз
    li.scrollIntoView();
}
