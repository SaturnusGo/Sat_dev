document.getElementById('ride-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const rideType = document.getElementById('ride-type').value;
    const destination = document.getElementById('destination').value;

    // Здесь вы можете отправить запрос к вашему серверу с информацией о поездке
    // fetch('/api/rides', { method: 'POST', body: JSON.stringify({ rideType, destination }) })
    //     .then(response => response.json())
    //     .then(data => {
    //         // Обновите информацию о поездке на странице
    //     });
});


document.getElementById('ride-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const rideType = document.getElementById('ride-type').value;
    const destination = document.getElementById('destination').value;

    const response = await fetch('/rides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rideType, destination })
    });

    const newRide = await response.json();

    // Здесь вы можете обновить интерфейс пользователя с информацией о новой поездке
});
