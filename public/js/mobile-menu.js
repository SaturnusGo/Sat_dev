const counter = document.querySelector(".counter");
let count = 0;
setInterval(() => {
 if(count == 92) {
  clearInterval(count);
 }else {
  count+=1;
  counter.textContent = count + "%";
 }
}, 42);

// Обработчик для клика на левую панель
const leftPanelClickHandler = () => {
  console.log('Клик на левую панель');
};

// Обработчик для клика на ссылку в хедере
const headerLinkClickHandler = () => {
  console.log('Клик на ссылку в хедере');
};

// Обработчик для клика на кнопку пользователя
const userButtonClickHandler = () => {
  console.log('Клик на кнопку пользователя');
};

// Обработчик для клика на ссылку активности
const activityLinkClickHandler = () => {
  console.log('Клик на ссылку активности');
};

// Назначение обработчиков событий
const leftPanel = document.querySelector('.left-side');
leftPanel.addEventListener('click', leftPanelClickHandler);

const headerLinks = document.querySelectorAll('.header-link');
headerLinks.forEach((link) => {
  link.addEventListener('click', headerLinkClickHandler);
});

const userButton = document.querySelector('.user-info .button');
userButton.addEventListener('click', userButtonClickHandler);

const activityLinks = document.querySelectorAll('.activity-link');
activityLinks.forEach((link) => {
  link.addEventListener('click', activityLinkClickHandler);
});
