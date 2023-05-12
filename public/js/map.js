const secretToken = 'sk.eyJ1IjoibWVyY3VyeXl5eSIsImEiOiJjbGc4eTg0azAwMXBzM3JxaXB6YTcwdzgxIn0.YwFKhbLFwBpe0dnAn_VI8A';
        const publicKey = 'pk.eyJ1IjoibWVyY3VyeXl5eSIsImEiOiJjbGc4eTRvcmYwMW5yM2ZxaWcwYTdrb2U2In0.z4zVOEpjuwcpE8dIOllo0g';
        mapboxgl.accessToken = publicKey;

        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [30.265, 59.945],
            zoom: 10
        });

        map.on('load', () => {
            map.addLayer({
                'id': 'road',
                'type': 'line',
                'source': {
                    'type': 'vector',
                    'url': 'mapbox://mapbox.mapbox-streets-v8'
                },
                'source-layer': 'road',
                'paint': {
                    'line-color': '#222',
                    'line-width': 1
                }
            });

             const burger = document.querySelector('.burger');
             const menuWindow = document.querySelector('.menu-window');

             burger.addEventListener('click', () => {
               menuWindow.classList.toggle('open');
               if (menuWindow.style.display === 'none') {
                 menuWindow.style.display = 'block';
                 setTimeout(() => menuWindow.classList.add('open'), 10);
               } else {
                 menuWindow.classList.remove('open');
                 setTimeout(() => menuWindow.style.display = 'none', 500);

                 let startX;
                 let endX;

// Функция для закрытия меню свайпом
function closeMenuOnSwipe() {
  if (startX > endX && startX - endX > 50) {
    menuWindow.classList.remove('open');
    setTimeout(() => menuWindow.style.display = 'none', 500);
  }
}

// Обработчик события начала движения мыши
menuWindow.addEventListener('mousedown', (e) => {
  startX = e.clientX;
});

// Обработчик события окончания движения мыши
menuWindow.addEventListener('mouseup', (e) => {
  endX = e.clientX;
  closeMenuOnSwipe();
});

// Обработчик события начала движения мыши на сенсорных устройствах
menuWindow.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

// Обработчик события окончания движения мыши на сенсорных устройствах
menuWindow.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  closeMenuOnSwipe();
});

               }
            });

            const geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl,
                marker: true,
                placeholder: 'Введите адрес'
            });

            document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

            const directions = new MapboxDirections({
                accessToken: mapboxgl.accessToken
            });

            const routeForm = document.getElementById('route-form');

            routeForm.addEventListener('submit', (e) => {
                e.preventDefault();

                geocoder.on('result', (result) => {
                                      const destination = result.result.geometry.coordinates;

                    directions.setOrigin(map.getCenter());
                    directions.setDestination(destination);
                    if (!map.hasControl(directions)) {
                        map.addControl(directions, 'top-left');
                    }

                });
            });
        });