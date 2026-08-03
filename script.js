const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = [...mobileMenu.querySelectorAll("a")];
const siteHeader = document.getElementById("siteHeader");
const inquiryForm = document.getElementById("inquiryForm");
const formStatus = document.getElementById("formStatus");
const currentYear = document.getElementById("currentYear");
const slides = [...document.querySelectorAll("[data-slide]")];
const slideDots = [...document.querySelectorAll("[data-slide-to]")];

let activeSlide = 0;
let slideTimer;

const setMenuState = (isOpen) => {
  mobileMenu.classList.toggle("is-open", isOpen);
  menuButton.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);

  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Cerrar menú" : "Abrir menú"
  );
};

const displaySlide = (index) => {
  activeSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === activeSlide);
    slide.setAttribute(
      "aria-hidden",
      String(slideIndex !== activeSlide)
    );
  });

  slideDots.forEach((dot, dotIndex) => {
    const isCurrent = dotIndex === activeSlide;

    dot.classList.toggle("is-active", isCurrent);
    dot.setAttribute("aria-current", isCurrent ? "true" : "false");
  });
};

const startSlider = () => {
  window.clearInterval(slideTimer);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  slideTimer = window.setInterval(() => {
    displaySlide(activeSlide + 1);
  }, 6500);
};

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  setMenuState(!isOpen);
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mobileMenu.classList.contains("is-open")) {
    setMenuState(false);
    menuButton.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1180) {
    setMenuState(false);
  }
});

window.addEventListener(
  "scroll",
  () => {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 18);
  },
  { passive: true }
);

slideDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    displaySlide(Number(dot.dataset.slideTo));
    startSlider();
  });
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    window.clearInterval(slideTimer);
  } else {
    startSlider();
  }
});

inquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!inquiryForm.checkValidity()) {
    inquiryForm.reportValidity();
    return;
  }

  const formData = new FormData(inquiryForm);
  const name = formData.get("name").trim();
  const company = formData.get("company").trim();
  const phone = formData.get("phone").trim();
  const email = formData.get("email").trim();
  const profile = formData.get("profile").trim();
  const message = formData.get("message").trim();

  const inquiryLines = [
    "Hola, equipo comercial de Alzarsi.",
    "",
    "Quisiera realizar la siguiente consulta:",
    "",
    `Nombre: ${name}`,
    `Empresa: ${company || "No indicada"}`,
    `Teléfono: ${phone}`,
    `Correo: ${email}`,
    `Tipo de consulta: ${profile}`,
    "",
    `Mensaje: ${message}`
  ];

  const whatsappUrl = `https://wa.me/59172177160?text=${encodeURIComponent(
    inquiryLines.join("\n")
  )}`;

  formStatus.textContent = "Abriendo WhatsApp para enviar tu consulta…";

  const whatsappWindow = window.open(
    whatsappUrl,
    "_blank",
    "noopener,noreferrer"
  );

  if (!whatsappWindow) {
    window.location.href = whatsappUrl;
  }

  window.setTimeout(() => {
    formStatus.textContent =
      "Tu consulta está preparada. Revisa WhatsApp para enviarla.";
  }, 700);
});

currentYear.textContent = new Date().getFullYear();

displaySlide(0);
startSlider();