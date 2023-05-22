let driverWS = new WebSocket("ws://127.0.0.1:8000/driver_ws");

driverWS.onmessage = function(event) {
    var messages = document.getElementById('messages');
    var message = document.createElement('li');
    var content = document.createTextNode(event.data);
    message.appendChild(content);
    message.classList.add("driver"); // добавление класса для сообщений от водителя
    messages.appendChild(message);
};

function sendDriverMessage(event) {
    event.preventDefault();
    var input = document.querySelector(".chat-bar__input");
    driverWS.send(input.value);
    input.value = '';
}

driverWS.onclose = function(event) {
    console.log('WebSocket connection closed', event.code);
};

driverWS.onerror = function(event) {
    console.error("WebSocket error observed:", event);
};

function toggle() {
    // функция для обработки нажатия на кнопку chat-bar__toggle
    // вам нужно реализовать эту функцию в соответствии с вашими требованиями
}
