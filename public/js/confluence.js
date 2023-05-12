document.querySelector('.burger').addEventListener('click', () => {
   document.querySelector('.nav-links').classList.toggle('active');
   document.querySelector('.burger').classList.toggle('toggle');
 });

 document.addEventListener('DOMContentLoaded', function () {
   const burger = document.querySelector('.burger');
   const navLinks = document.querySelector('.nav-links');
   const menuWindow = document.querySelector('.menu-window');

   burger.addEventListener('click', function () {
     navLinks.classList.toggle('active');
   });

  let startX;
  let endX;

  function closeMenuOnSwipe() {
    if (startX > endX && startX - endX > 50) {
      menuWindow.classList.remove('open');
      setTimeout(() => menuWindow.style.display = 'none', 500);
    }
  }

  menuWindow.addEventListener('touchstart', (e) => {
    startX = e.changedTouches[0].clientX;
  });

  menuWindow.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    closeMenuOnSwipe();
  });

  burger.addEventListener('click', () => {
    menuWindow.classList.toggle('open');
    if (menuWindow.style.display === 'none') {
      menuWindow.style.display = 'block';
      setTimeout(() => menuWindow.classList.add('open'), 10);
    } else {
      menuWindow.classList.remove('open');
      setTimeout(() => menuWindow.style.display = 'none', 500);
    }
  });

  const introVideo = document.getElementById('intro-video');
  introVideo.style.display = 'block';
  introVideo.play();

  // Сохраните информацию о том, что видео было показано
  localStorage.setItem('introVideoShown', 'true');

  // Скрытие видео при клике
  introVideo.addEventListener('click', function () {
    introVideo.pause();
    introVideo.style.display = 'none';
  });
});

window.addEventListener('load', function () {
  const introVideo = document.getElementById('intro-video');
  const content = document.querySelector('.content');

  introVideo.play();

  introVideo.addEventListener('ended', () => {
    introVideo.style.display = 'none';
    content.style.display = 'block';
  });
});

 document.addEventListener('DOMContentLoaded', function () {
   const burger = document.querySelector('.burger');
   const navLinks = document.querySelector('.nav-links');

   burger.addEventListener('click', function () {
     navLinks.classList.toggle('active');
   });
 });

 document.addEventListener('DOMContentLoaded', function () {

     var introVideo = document.getElementById('intro-video');
     introVideo.style.display = 'block';
     introVideo.play();

    // Сохраните информацию о том, что видео было показано
     localStorage.setItem('introVideoShown', 'true');

    // Скрытие видео при клике
     introVideo.addEventListener('click', function () {
       introVideo.pause();
       introVideo.style.display = 'none';
     });
 });

const introVideo = document.getElementById('intro-video');
const content = document.querySelector('.content');

introVideo.play();

introVideo.addEventListener('ended', () => {
    introVideo.style.display = 'none';
    content.style.display = 'block';
});


const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");

function saveAddresses() {
  localStorage.setItem("from", fromInput.value);
  localStorage.setItem("to", toInput.value);
}

function redirectToMap() {
  saveAddresses();
  window.location.href = "map";
}

function showAddressSuggestions() {
  // Здесь нужно реализовать логику отображения выпадающего списка с предложенными адресами/городами/странами
  // и перенаправление на карту при выборе одного из них
}

const confirmButton = document.getElementById("confirm-button");
confirmButton.addEventListener("click", redirectToMap);

const geocoder = L.mapbox.geocoder('mapbox.places', {
  autocomplete: true,
  proximity: [0, 0]
});

function showAddressSuggestions(e) {
  const input = e.target;
  if (!input.value) {
    return;
  }
  geocoder.query(input.value, function (err, data) {
    if (err || !data || !data.results) {
      return;
    }
    const results = data.results;
    const suggestions = results.map(result => {
      const placeName = result.place_name;
      return `<li class="suggestion" data-value="${placeName}">${placeName}</li>`;
    }).join('');
    const suggestionsContainer = document.createElement('ul');
    suggestionsContainer.innerHTML = suggestions;
    suggestionsContainer.classList.add('suggestions-container');
    suggestionsContainer.style.top = `${input.offsetTop + input.offsetHeight}px`;
    suggestionsContainer.style.left = `${input.offsetLeft}px`;
    input.parentNode.appendChild(suggestionsContainer);
    suggestionsContainer.addEventListener('click', (e) => {
      const suggestion = e.target;
      const value = suggestion.getAttribute('data-value');
      input.value = value;
      suggestionsContainer.parentNode.removeChild(suggestionsContainer);
    });
  });
}

fromInput.addEventListener("input", showAddressSuggestions);
toInput.addEventListener("input", showAddressSuggestions);

