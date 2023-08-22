/*
=======================
toggle menu buttons
=======================
*/

const menu = document.querySelector('[data-id = "menu"]');
const menuItems = document.querySelector('[data-id = "menu-items"]');
const resetBtn = document.querySelector('[data-id = "reset-btn"]');
const newRoundBtn = document.querySelector('[data-id = "new-round-btn"]');

menu.addEventListener("click", () => {
  menuItems.classList.toggle("hidden");
});
