console.clear();

const loginBtn = document.querySelector('.login .form-title');
const signupBtn = document.querySelector('.signup .form-title');

const formContainer = document.querySelector('.form-structor');

loginBtn.addEventListener('click', (e) => {
  let parent = e.target.parentNode.parentNode;
  Array.from(e.target.parentNode.parentNode.classList).find((element) => {
    if (element !== "slide-up") {
      parent.classList.add('slide-up')
    } else {
      signupBtn.parentNode.classList.add('slide-up')
      parent.classList.remove('slide-up')
    }
  });
});

signupBtn.addEventListener('click', (e) => {
  let parent = e.target.parentNode;
  Array.from(e.target.parentNode.classList).find((element) => {
    if (element !== "slide-up") {
      parent.classList.add('slide-up')
    } else {
      loginBtn.parentNode.parentNode.classList.add('slide-up')
      parent.classList.remove('slide-up')
    }
  });
});

document.addEventListener('click', (e) => {
  if (!formContainer.contains(e.target)) {
    const loginSlideUp = loginBtn.parentNode.parentNode.classList.contains('slide-up');
    const signupSlideUp = signupBtn.parentNode.classList.contains('slide-up');

    if (!loginSlideUp) {
      loginBtn.parentNode.parentNode.classList.add('slide-up');
    }

    if (!signupSlideUp) {
      signupBtn.parentNode.classList.add('slide-up');
    }
  }
});
