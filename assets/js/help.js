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

if (openBtn && closeBtn && offcanvas) {
  openBtn.addEventListener("click", openOffcanvas);
  closeBtn.addEventListener("click", closeOffcanvas);
}

const accordionItems = Array.from(document.querySelectorAll("[data-accordion-item]"));

function openPanel(panel) {
  // start from 0 -> measure -> animate to px -> then "auto"
  panel.classList.remove("opacity-0");
  panel.style.height = "0px";

  // force reflow so the browser picks up height=0 before changing it
  panel.getBoundingClientRect();

  const target = panel.scrollHeight;
  panel.style.height = target + "px";

  const onEnd = (e) => {
    if (e.propertyName !== "height") return;
    panel.style.height = "auto";
    panel.removeEventListener("transitionend", onEnd);
  };
  panel.addEventListener("transitionend", onEnd);
}

function closePanel(panel) {
  // from auto -> px -> 0
  panel.style.height = panel.scrollHeight + "px";
  panel.getBoundingClientRect(); // reflow

  panel.style.height = "0px";
  panel.classList.add("opacity-0");
}

function setAccordionState(item, isOpen) {
  const trigger = item.querySelector("[data-accordion-trigger]");
  const panel = item.querySelector("[data-accordion-panel]");
  const icon = item.querySelector("[data-accordion-icon]");
  const chevron = item.querySelector("[data-accordion-chevron]");

  if (!trigger || !panel || !icon || !chevron) return;

  trigger.setAttribute("aria-expanded", String(isOpen));

  if (isOpen) {
    openPanel(panel);

    icon.classList.remove("bg-[#d5efee]", "text-[#008a8a]");
    icon.classList.add("bg-gradient-to-r", "from-[#00b4a4]", "to-[#076b6b]", "text-white");
    chevron.classList.add("rotate-90");
    item.classList.add("shadow-[0_1px_4px_0_rgba(25,33,61,0.34)]");
  } else {
    closePanel(panel);

    icon.classList.remove("bg-gradient-to-r", "from-[#00b4a4]", "to-[#076b6b]", "text-white");
    icon.classList.add("bg-[#d5efee]", "text-[#008a8a]");
    chevron.classList.remove("rotate-90");
    item.classList.remove("shadow-[0_1px_4px_0_rgba(25,33,61,0.34)]");
  }
}

// init state (set height correctly)
accordionItems.forEach((item) => {
  const trigger = item.querySelector("[data-accordion-trigger]");
  const panel = item.querySelector("[data-accordion-panel]");
  if (!trigger || !panel) return;

  const isOpen = trigger.getAttribute("aria-expanded") === "true";
  if (isOpen) {
    panel.classList.remove("opacity-0");
    panel.style.height = "auto";
  } else {
    panel.classList.add("opacity-0");
    panel.style.height = "0px";
  }

  setAccordionState(item, isOpen);
});

accordionItems.forEach((item) => {
  const trigger = item.querySelector("[data-accordion-trigger]");
  if (!trigger) return;

  trigger.addEventListener("click", () => {
    const isOpen = trigger.getAttribute("aria-expanded") === "true";

    accordionItems.forEach((otherItem) => {
      if (otherItem !== item) setAccordionState(otherItem, false);
    });

    setAccordionState(item, !isOpen);
  });
});