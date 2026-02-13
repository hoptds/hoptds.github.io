const offcanvas = document.getElementById("offcanvas");
const openMenu = document.getElementById("open-menu");
const closeMenu = document.getElementById("close-menu");
const backdrop = document.getElementById("offcanvas-backdrop");

function showMenu() {
  offcanvas.classList.remove("pointer-events-none", "opacity-0");
  offcanvas.setAttribute("aria-hidden", "false");
  document.body.classList.add("overflow-hidden");
}

function hideMenu() {
  offcanvas.classList.add("pointer-events-none", "opacity-0");
  offcanvas.setAttribute("aria-hidden", "true");
  document.body.classList.remove("overflow-hidden");
}

openMenu?.addEventListener("click", showMenu);
closeMenu?.addEventListener("click", hideMenu);
backdrop?.addEventListener("click", hideMenu);