/*
=======================
toggle menu buttons
=======================
*/

const menu = document.querySelector('[data-id = "menu"]');
const menuItems = document.querySelector('[data-id = "menu-items"]');

menu.addEventListener("click", () => {
  menuItems.classList.toggle("hidden");
});
