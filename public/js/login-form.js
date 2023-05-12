document.addEventListener('DOMContentLoaded', function () {
  const forgotPasswordLink = document.querySelector('.forgot-password-link');
  const forgotPasswordModal = document.getElementById('forgot-password-modal');
  const closeModal = document.querySelector('.close');
  const backBtn = document.querySelector('.back-btn');
  const forgotPasswordForm = document.getElementById('forgot-password-form');

  // Open modal
  forgotPasswordLink.addEventListener('click', () => {
    forgotPasswordModal.style.display = 'block';
  });

    // Close modal
  closeModal.addEventListener('click', () => {
    forgotPasswordModal.style.display = 'none';
  });

  // Close modal on "Back" button click
  backBtn.addEventListener('click', () => {
    forgotPasswordModal.style.display = 'none';
  });

  // Close modal when clicking outside of the modal content
  window.addEventListener('click', (event) => {
    if (event.target === forgotPasswordModal) {
      forgotPasswordModal.style.display = 'none';
    }
  });

  // Handle form submission
  forgotPasswordForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const emailInput = document.getElementById('email');

    // Validate email input
    if (!emailInput.validity.valid) {
      emailInput.classList.add('input-error');
      return;
    }

    // Reset input error state
    emailInput.classList.remove('input-error');

    // TODO: Add logic for sending a password reset email using an email API (e.g., SendGrid or Mailgun)

    // Close the modal after successful submission
    forgotPasswordModal.style.display = 'none';
  });
});

document.querySelector('.forgot-password-link').addEventListener('click', function () {
  const modal = document.querySelector('.modal');
  modal.style.display = 'block';
  setTimeout(() => {
    modal.classList.add('fadeInDown');
  }, 50);
});

document.querySelector('.close').addEventListener('click', function () {
  const modal = document.querySelector('.modal');
  modal.addEventListener('animationend', () => {
    modal.style.display = 'none';
    modal.classList.remove('fadeInDown');
  }, { once: true });
  modal.classList.remove('fadeInDown');
});






