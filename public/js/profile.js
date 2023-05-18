document.addEventListener('DOMContentLoaded', function () {
  const nameBtn = document.querySelector('.name-block');
  const dialogName = document.querySelector('.dialog-name');
  nameBtn.addEventListener('click', () => {
    dialogName.classList.add('dialog--open');
  });

  const phoneBtn = document.querySelector('.phone-block');
  const dialogPhone = document.querySelector('.dialog-phone');
  phoneBtn.addEventListener('click', () => {
    dialogPhone.classList.add('dialog--open');
  });

  const emailBtn = document.querySelector('.email-block');
  const dialogEmail = document.querySelector('.dialog-email');
  emailBtn.addEventListener('click', () => {
    dialogEmail.classList.add('dialog--open');
  });

  // Обработчик для закрытия модальных окон
  document.querySelectorAll('.header-close-btn, .cancel-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dialog').forEach((dialog) => {
        dialog.classList.remove('dialog--open');
      });
    });
  });

  document.querySelectorAll('.update-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      // Здесь должен быть код для обновления данных профиля
      document.querySelectorAll('.dialog').forEach((dialog) => {
        dialog.classList.remove('dialog--open');
      });
    });
  });

  const photoPlaceholder = document.querySelector('#user-photo');

  photoPlaceholder.addEventListener('click', () => {
    const dialogPhoto = document.querySelector('.dialog-photo');
    dialogPhoto.classList.add('dialog--open');
  });

  const photoUpdateBtn = document.querySelector('#photo-update-btn');
  const profilePhotoInput = document.querySelector('#profile-photo');

  photoUpdateBtn.addEventListener('click', () => {
    profilePhotoInput.click();
  });
});

const profilePhotoInput = document.querySelector('#profile-photo');
const photoPlaceholder = document.querySelector('#user-photo');
const svgElement = document.querySelector('#user-photo .material-icons-outlined');

// Обработчик изменения файла
profilePhotoInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      // Загрузка изображения
      photoPlaceholder.style.backgroundImage = `url(${event.target.result})`;
      svgElement.style.display = 'none'; // Скрыть SVG элемент

      // Сохранение изображения в LocalStorage
      localStorage.setItem('profilePhoto', event.target.result);
    }
    reader.readAsDataURL(file);
  }
});

// Загрузка сохраненного изображения из LocalStorage при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  //...
  const savedPhoto = localStorage.getItem('profilePhoto');
  if (savedPhoto) {
    photoPlaceholder.style.backgroundImage = `url(${savedPhoto})`;
    svgElement.style.display = 'none'; // Скрыть SVG элемент
  }
});


document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 10,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
});

var canvas    = document.getElementById('canvas'),
    ctx       = canvas.getContext('2d'),
	  perlin    = new ClassicalNoise(),
    variation = .0025,
    amp       = 300,
    variators = [],
    max_lines = (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) ? 25 : 40,
    canvasWidth,
    canvasHeight,
    start_y;

for (var i = 0, u = 0; i < max_lines; i++, u+=.02) {
  variators[i] = u;
}

function draw(){
  ctx.shadowColor = "rgba(43, 205, 255, 1)";
  ctx.shadowBlur = 0;

  for (var i = 0; i <= max_lines; i++){
    ctx.beginPath();
    ctx.moveTo(0, start_y);
    for (var x = 0; x <= canvasWidth; x++) {
      var y = perlin.noise(x*variation+variators[i], x*variation, 0);
      ctx.lineTo(x, start_y + amp*y);
    }
    var color = Math.floor(150*Math.abs(y));
    var alpha = Math.min(Math.abs(y)+0.05, .05);
    ctx.strokeStyle = "rgba(255,255,255,"+alpha*2+")";
    ctx.stroke();
    ctx.closePath();

    variators[i] += .005;
  }
}

(function init() {
	resizeCanvas();
	animate();
	window.addEventListener('resize', resizeCanvas);
})();

function animate() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  draw();
  requestAnimationFrame(animate);
}

function resizeCanvas(){
	canvasWidth = document.documentElement.clientWidth,
	canvasHeight = document.documentElement.clientHeight;

	canvas.setAttribute("width", canvasWidth);
	canvas.setAttribute("height", canvasHeight);

	start_y = canvasHeight/2;
}

$(document).ready(function() {
  $('.name-block, .phone-block, .email-block').on('click', function() {
    const fancybox = $(`<div class="fancybox-container">${$(this).html()}</div>`);

    $('body').append(fancybox);
    $('.container, .fields-container').addClass('blur');
    fancybox.fadeIn(200);
  });

  $('body').on('click', '.fancybox-container', function(e) {
    if (e.target === e.currentTarget) {
      $(this).fadeOut(200, function() {
        $(this).remove();
        $('.container, .fields-container').removeClass('blur');
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const savedName = localStorage.getItem('profileName');
  const savedPhone = localStorage.getItem('profilePhone');
  const savedEmail = localStorage.getItem('profileEmail');
  const savedPhoto = localStorage.getItem('profilePhoto');

  if (savedName) {
    document.querySelector('.name-block').textContent = savedName;
  }
  if (savedPhone) {
    document.querySelector('.phone-block').textContent = savedPhone;
  }
  if (savedEmail) {
    document.querySelector('.email-block').textContent = savedEmail;
  }
  if (savedPhoto) {
    photoPlaceholder.style.backgroundImage = `url(${savedPhoto})`;
    svgElement.style.display = 'none'; // Скрыть SVG элемент
  }
});


function updateProfileData(data) {
  $.ajax({
    url: '/register/submit', // Замените этот URL на адрес вашего сервера, который будет обрабатывать обновление данных профиля
    method: 'POST',
    data: data,
    success: function(response) {
      console.log('Профиль успешно обновлен:', response);
    },
    error: function(error) {
      console.error('Ошибка обновления профиля:', error);
    }
  });
}

const nameInput = document.getElementById('nameInput');
const phoneInput = document.getElementById('phoneInput');
const emailInput = document.getElementById('emailInput');

nameInput.addEventListener('change', () => {
  localStorage.setItem('profileName', nameInput.value);
  updateProfileData({ name: nameInput.value });
  document.querySelector('.name-block').textContent = nameInput.value;
});

phoneInput.addEventListener('change', () => {
  localStorage.setItem('profilePhone', phoneInput.value);
  updateProfileData({ phone: phoneInput.value });
  document.querySelector('.phone-block').textContent = phoneInput.value;
});

emailInput.addEventListener('change', () => {
  localStorage.setItem('profileEmail', emailInput.value);
  updateProfileData({ email: emailInput.value });
  document.querySelector('.email-block').textContent = emailInput.value;
});

// Дополнительный код, если требуется обновить поля профиля на сервере
function updateProfileFields(profileData) {
  // Обновление полей профиля на основе полученных данных
  // Ваш код для обновления полей профиля
  document.querySelector('.name-block').textContent = profileData.name;
  document.querySelector('.phone-block').textContent = profileData.phone;
  document.querySelector('.email-block').textContent = profileData.email;
}

