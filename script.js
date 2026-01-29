const header = document.querySelector(".header");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");

const MOBILE_BREAKPOINT = 768;

/* HEADER SCROLL */
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);
});

/* TOGGLE MOBILE MENU */
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.textContent = isOpen ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", isOpen);
});

/* CLOSE MENU ON LINK CLICK (MOBILE ONLY) */
navAnchors.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      closeMobileMenu();
    }
  });
});

/* SMOOTH SCROLL */
navAnchors.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);
    if (!target) return;

    const offset = header.offsetHeight + 10;
    const top =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      offset;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  });
});

/* RESIZE FIX (MOBILE → DESKTOP) */
window.addEventListener("resize", () => {
  if (window.innerWidth > MOBILE_BREAKPOINT) {
    resetMenuDesktop();
  }
});

/* HELPERS */
function closeMobileMenu() {
  navLinks.classList.remove("open");
  menuToggle.textContent = "☰";
  menuToggle.setAttribute("aria-expanded", "false");
}

function resetMenuDesktop() {
  navLinks.classList.remove("open");
  menuToggle.textContent = "☰";
  menuToggle.setAttribute("aria-expanded", "false");
}
