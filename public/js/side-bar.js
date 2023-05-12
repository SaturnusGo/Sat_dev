document.addEventListener("DOMContentLoaded", function () {
  var sidebar = document.getElementById("sidebar");
  var sidebarToggle = document.getElementById("sidebar-toggle");

  sidebarToggle.addEventListener("click", function () {
    sidebar.classList.toggle("active");
    sidebarToggle.classList.toggle("active");
  });

  document.body.addEventListener("click", function (e) {
    if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
      sidebar.classList.remove("active");
      sidebarToggle.classList.remove("active");
    }
  });

  var languageSwitch = document.getElementById("language-switch");
  var languageOptions = document.getElementById("language-options");

  languageSwitch.addEventListener("click", function () {
    languageOptions.classList.toggle("active");
  });

  var languageOptionLinks = document.querySelectorAll(".language-option");

  languageOptionLinks.forEach(function (option) {
    option.addEventListener("click", function (e) {
      e.preventDefault();
      var lang = e.target.getAttribute("data-lang");
      switchLanguage(lang);
    });
  });

  function switchLanguage(lang) {
    var sidebarLinks = document.querySelectorAll(".sidebar-links a");

    sidebarLinks.forEach(function (link) {
      var text = link.getAttribute("data-" + lang);
      link.textContent = text;
    });
  }

  // Swipe functionality
  const closeSidebar = () => {
    sidebar.classList.remove("active");
    sidebarToggle.classList.remove("active");
  };

  const openSidebar = () => {
    sidebar.classList.add("active");
    sidebarToggle.classList.add("active");
  };

  const sidebarHammer = new Hammer(sidebar);
  sidebarHammer.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });

  sidebarHammer.on('panleft', (event) => {
    closeSidebar();
  });

  sidebarHammer.on('panright', (event) => {
    openSidebar();
  });

  // Prevent scrolling when the sidebar is being swiped
  sidebarHammer.on('panstart', () => {
    document.body.style.overflowY = 'hidden';
  });

  sidebarHammer.on('panend', () => {
    document.body.style.overflowY = 'auto';
  });
});
