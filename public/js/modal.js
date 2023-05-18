
  document.addEventListener('DOMContentLoaded', function () {
    const googleButton = document.getElementById('password-button');
    const modal = document.getElementById('google-modal');
    const closeButton = document.querySelector('.close-btn');

    googleButton.addEventListener('click', function (e) {
      e.preventDefault();
      modal.style.display = 'block';
    });

    closeButton.addEventListener('click', function () {
      modal.style.display = 'none';
    });

    window.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });

