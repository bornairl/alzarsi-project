const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const siteHeader = document.getElementById("siteHeader");

const inquiryForm = document.getElementById("inquiryForm");
const formStatus = document.getElementById("formStatus");
const currentYear = document.getElementById("currentYear");

const productMenuButton = document.getElementById("productMenuButton");
const productMegaMenu = document.getElementById("productMegaMenu");

const mobileProductButton = document.getElementById("mobileProductButton");
const mobileProductMenu = document.getElementById("mobileProductMenu");

const slides = [...document.querySelectorAll("[data-slide]")];
const slideDots = [...document.querySelectorAll("[data-slide-to]")];

const mobileLinks = mobileMenu
  ? [...mobileMenu.querySelectorAll("a")]
  : [];

const mobileBreakpoint = window.matchMedia("(max-width: 960px)");

let activeSlide = 0;
let slideTimer;

/* Product mega menu */

const setProductMenuState = (isOpen) => {
  if (!productMegaMenu || !productMenuButton) {
    return;
  }

  productMegaMenu.classList.toggle("is-open", isOpen);
  productMenuButton.classList.toggle("is-open", isOpen);

  productMenuButton.setAttribute("aria-expanded", String(isOpen));
  productMegaMenu.setAttribute("aria-hidden", String(!isOpen));
};

/* Mobile product submenu */

const setMobileProductState = (isOpen) => {
  if (!mobileProductMenu || !mobileProductButton) {
    return;
  }

  mobileProductMenu.classList.toggle("is-open", isOpen);
  mobileProductButton.classList.toggle("is-open", isOpen);
  mobileProductButton.setAttribute("aria-expanded", String(isOpen));
};

/* Main mobile navigation */

const setMenuState = (isOpen) => {
  if (!mobileMenu || !menuButton) {
    return;
  }

  mobileMenu.classList.toggle("is-open", isOpen);
  menuButton.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);

  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Cerrar menú" : "Abrir menú"
  );

  if (!isOpen) {
    setMobileProductState(false);
  }
};

/* Homepage hero slider */

const displaySlide = (index) => {
  if (!slides.length) {
    return;
  }

  const nextSlide = (index + slides.length) % slides.length;
  const previousSlide = activeSlide;

  slides.forEach((slide) => {
    slide.classList.remove("is-leaving");
  });

  if (slides[previousSlide] && previousSlide !== nextSlide) {
    slides[previousSlide].classList.add("is-leaving");
  }

  activeSlide = nextSlide;

  slides.forEach((slide, slideIndex) => {
    const isCurrent = slideIndex === activeSlide;

    slide.classList.toggle("is-active", isCurrent);
    slide.setAttribute("aria-hidden", String(!isCurrent));
  });

  slideDots.forEach((dot, dotIndex) => {
    const isCurrent = dotIndex === activeSlide;

    dot.classList.toggle("is-active", isCurrent);
    dot.setAttribute(
      "aria-current",
      isCurrent ? "true" : "false"
    );
  });

  window.setTimeout(() => {
    slides.forEach((slide, slideIndex) => {
      if (slideIndex !== activeSlide) {
        slide.classList.remove("is-leaving");
      }
    });
  }, 950);
};

const startSlider = () => {
  window.clearInterval(slideTimer);

  if (!slides.length) {
    return;
  }

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (reducedMotion.matches) {
    return;
  }

  slideTimer = window.setInterval(() => {
    displaySlide(activeSlide + 1);
  }, 6500);
};

/* Mobile navigation events */

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    setMenuState(!isOpen);
  });
}

if (mobileProductButton && mobileProductMenu) {
  mobileProductButton.addEventListener("click", () => {
    const isOpen =
      mobileProductButton.getAttribute("aria-expanded") === "true";

    setMobileProductState(!isOpen);
  });
}

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setMenuState(false);
  });
});

/* Desktop product menu events */

if (productMenuButton && productMegaMenu) {
  productMenuButton.addEventListener("click", (event) => {
    event.stopPropagation();

    const isOpen =
      productMenuButton.getAttribute("aria-expanded") === "true";

    setProductMenuState(!isOpen);
  });

  productMegaMenu.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("click", () => {
    setProductMenuState(false);
  });
}

/* Escape-key navigation control */

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  if (
    productMegaMenu &&
    productMenuButton &&
    productMegaMenu.classList.contains("is-open")
  ) {
    setProductMenuState(false);
    productMenuButton.focus();
  }

  if (
    mobileMenu &&
    menuButton &&
    mobileMenu.classList.contains("is-open")
  ) {
    setMenuState(false);
    menuButton.focus();
  }
});

/* Responsive navigation synchronization */

const synchronizeNavigation = (event) => {
  if (event.matches) {
    setProductMenuState(false);
  } else {
    setMenuState(false);
  }
};

if (typeof mobileBreakpoint.addEventListener === "function") {
  mobileBreakpoint.addEventListener(
    "change",
    synchronizeNavigation
  );
} else {
  mobileBreakpoint.addListener(synchronizeNavigation);
}

synchronizeNavigation(mobileBreakpoint);

/* Scrolled header state */

if (siteHeader) {
  const updateHeaderState = () => {
    siteHeader.classList.toggle(
      "is-scrolled",
      window.scrollY > 18
    );
  };

  window.addEventListener("scroll", updateHeaderState, {
    passive: true
  });

  updateHeaderState();
}

/* Slider navigation dots */

slideDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const targetSlide = Number(dot.dataset.slideTo);

    if (Number.isNaN(targetSlide)) {
      return;
    }

    displaySlide(targetSlide);
    startSlider();
  });
});

/* Pause slider when the browser tab is hidden */

if (slides.length) {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      window.clearInterval(slideTimer);
    } else {
      startSlider();
    }
  });
}

/* Homepage contact form */

if (inquiryForm && formStatus) {
  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!inquiryForm.checkValidity()) {
      inquiryForm.reportValidity();
      return;
    }

    const formData = new FormData(inquiryForm);

    const name = String(formData.get("name") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const profile = String(formData.get("profile") || "").trim();
    const message = String(formData.get("message") || "").trim();

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

    const whatsappUrl =
      "https://wa.me/59172177160?text=" +
      encodeURIComponent(inquiryLines.join("\n"));

    formStatus.textContent =
      "Abriendo WhatsApp para enviar tu consulta…";

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
}

/* Automatic footer year */

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

/* Initialize homepage slider when present */

if (slides.length) {
  displaySlide(0);
  startSlider();
}