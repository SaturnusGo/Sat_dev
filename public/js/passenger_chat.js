let passengerWS = new WebSocket("ws://127.0.0.1:8000/passenger_ws");
let clientId;
let outgoingMessage = false;

passengerWS.onopen = function(event) {
    // Получить уникальный идентификатор клиента от сервера
    passengerWS.onmessage = function(event) {
        clientId = event.data;

        // Установить обработчик сообщений для обычных сообщений
        passengerWS.onmessage = function(event) {
            // Проверить, является ли сообщение собственным
            let isOwnMessage = event.data.startsWith(clientId);

            let message;
            // Удалить уникальный идентификатор и префикс из сообщения
            if (isOwnMessage) {
                message = event.data.slice(clientId.length + "Passenger message: ".length);
                if (outgoingMessage) {
                    outgoingMessage = false;
                    return; // пропускаем добавление исходящего сообщения, так как оно уже было добавлено ранее
                }
            } else {
                message = event.data; // Если сообщение не собственное, то не изменяем его
            }

            appendMessage(message, isOwnMessage);
        };
    };
};

function sendPassengerMessage(event) {
    event.preventDefault();
    var input = document.querySelector(".chat-bar__input");
    var message = input.value;

    if (!isDuplicate(message)) {
        passengerWS.send(message);
        // убираем следующую строку, чтобы избежать дублирования
        // appendMessage(message, true);
    }

    input.value = '';
}



function appendMessage(message, isOwnMessage) {
    var messages = document.getElementById('messages');
    var li = document.createElement('li');
    li.classList.add("message");
    if(isOwnMessage) {
        li.classList.add("message-sent");
    } else {
        li.classList.add("driver");
    }
    li.appendChild(document.createTextNode(message));
    messages.appendChild(li);

    // Позволяет прокрутить до последнего сообщения
    li.scrollIntoView();
}

passengerWS.onerror = function(event) {
    console.error("WebSocket error observed:", event);
};

function isDuplicate(message) {
    var messages = document.getElementById('messages').children;
    for (var i = 0; i < messages.length; i++) {
        if (messages[i].textContent === message) {
            return true;
        }
    }
    return false;
}
