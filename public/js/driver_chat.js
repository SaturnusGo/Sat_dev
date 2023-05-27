let driverWS = new WebSocket("ws://127.0.0.1:8000/driver_ws");

driverWS.onmessage = function(event) {
    var messages = document.getElementById('messages');
    var message = document.createElement('li');
    var content = document.createTextNode(event.data);
    message.appendChild(content);
    message.classList.add("message"); // изменение класса на "message"
    messages.appendChild(message);
};

function sendDriverMessage(event) {
    event.preventDefault();
    var input = document.getElementById("js-chatbar").querySelector(".chat-bar__input");
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
    let chatbar = document.getElementById("js-chatbar");
    let toggleBtn = document.getElementById("js-toggle");
    if(chatbar.classList.contains("--is-active")){
        chatbar.classList.remove("--is-active");
        toggleBtn.querySelector("i").innerText = "add";
    }else{
        chatbar.classList.add("--is-active");
        toggleBtn.querySelector("i").innerText = "close";
    }
}
