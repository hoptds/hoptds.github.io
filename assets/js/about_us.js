const offcanvas = document.getElementById("offcanvas");
const openBtn = document.getElementById("open-menu");
const closeBtn = document.getElementById("close-menu");

function openOffcanvas() {
  offcanvas.classList.remove("pointer-events-none", "opacity-0");
  offcanvas.setAttribute("aria-hidden", "false");
  closeBtn.focus();
}

function closeOffcanvas() {
  // 1) restore focus BEFORE hiding from AT
  openBtn.focus();

  // 2) now hide
  offcanvas.classList.add("pointer-events-none", "opacity-0");
  offcanvas.setAttribute("aria-hidden", "true");
}

openBtn.addEventListener("click", openOffcanvas);
closeBtn.addEventListener("click", closeOffcanvas);