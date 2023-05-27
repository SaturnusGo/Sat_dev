const accessToken = 'pk.eyJ1IjoibWVyY3VyeXl5eSIsImEiOiJjbGc4eTRvcmYwMW5yM2ZxaWcwYTdrb2U2In0.z4zVOEpjuwcpE8dIOllo0g';

mapboxgl.accessToken = accessToken;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    zoom: 12,
    center: [-57.5575, -37.9975]
});

const geocoder = new MapboxGeocoder({
    accessToken: accessToken,
    mapboxgl: mapboxgl
});

map.addControl(geocoder);

document.getElementById('order_taxi').addEventListener('click', function() {
    const address = document.getElementById('taxi').value;
    console.log('Заказать такси по адресу: ' + address);
});

const services = document.getElementById('services');
const hammer = new Hammer(services);

hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

hammer.on('swipeup', function() {
    const headerHeight = document.getElementById('header').offsetHeight;
    services.style.height = `calc(100% - ${headerHeight}px)`;
    services.classList.add('expanded');
});

hammer.on('swipedown', function() {
    services.style.height = '';
    services.classList.remove('expanded');
});

geocoder.on('result', function(ev) {
    map.flyTo({
        center: ev.result.geometry.coordinates
    });
});

const mapboxClient = mapboxSdk({ accessToken: accessToken });

document.getElementById('order_taxi').addEventListener('click', function() {
    const address = document.getElementById('taxi').value;
    mapboxClient.geocoding
        .forwardGeocode({
            query: address,
            autocomplete: false,
            limit: 1
        })
        .send()
        .then(function(response) {
            if (response && response.body && response.body.features && response.body.features.length) {
                const feature = response.body.features[0];
                const origin = [-57.5575, -37.9975];
                const destination = feature.geometry.coordinates;

                mapboxClient.directions
                    .getDirections({
                        profile: 'driving',
                        waypoints: [
                            {
                                coordinates: origin
                            },
                            {
                                coordinates: destination
                            }
                        ]
                    })
                    .send()
                    .then(function(directions) {
                        // Implement logic to display the route on the map.
                    });
            }
        });
});
