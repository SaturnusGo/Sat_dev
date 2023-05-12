const sidebarToggle = document.getElementById("sidebar-toggle"); - удалить
const sidebar = document.getElementById("sidebar");

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("sidebar-hidden");
});
