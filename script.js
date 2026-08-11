"use strict";

/* =========================================================
   SHARED ALZARSI FOOTER
   Used automatically by every <alzarsi-footer> element.
========================================================= */

const footerTemplate = `
  <footer class="alz-compact-footer" aria-label="Pie de página">
    <div class="alz-compact-footer__grid">
      <section class="alz-compact-footer__brand" aria-labelledby="footer-brand-title">
        <a class="alz-compact-footer__logo" href="index.html" aria-label="Ir al inicio de Alzarsi">
          <img src="assets/alzarsi-logo.png" alt="Alzarsi Ltda.">
        </a>
        <p class="alz-compact-footer__promise" id="footer-brand-title">
          <span>Importamos calidad.</span>
          <span>Distribuimos confianza.</span>
        </p>
        <a class="alz-compact-footer__cta" href="index.html#contacto">Contáctanos</a>
      </section>
      <nav class="alz-compact-footer__column" aria-label="Páginas">
        <h3>Páginas</h3>
        <a href="index.html">Inicio</a>
        <a href="quienes-somos.html">Quiénes somos</a>
        <a href="eventos.html">Novedades</a>
        <a href="recetas.html">Recetas</a>
        <a href="media.html">Multimedia</a>
      </nav>
      <nav class="alz-compact-footer__column" aria-label="Productos">
        <h3>Productos</h3>
        <a href="index.html#productos">La Paz</a>
        <a href="index.html#productos">Santa Cruz</a>
        <a href="index.html#marcas">Nuestras marcas</a>
        <a href="index.html#productos">Ver productos</a>
      </nav>
      <section class="alz-compact-footer__column alz-compact-footer__contact" aria-labelledby="footer-contact-title">
        <h3 id="footer-contact-title">Contáctanos</h3>
        <address>Av. Cristo Redentor, entre 6.º y 7.º anillo, calle B<br>Santa Cruz de la Sierra, Bolivia</address>
        <a href="tel:+59133494777">+591 3 349 4777</a>
        <a href="https://wa.me/59172177160" target="_blank" rel="noopener noreferrer">WhatsApp: +591 721 77160</a>
        <a href="mailto:comercial@alzarsiltda.com">comercial@alzarsiltda.com</a>
        <div class="alz-compact-footer__socials" aria-label="Redes sociales">
          <a href="https://www.instagram.com/alzarsi.ltda/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4.25"></circle><circle cx="17.4" cy="6.7" r="1"></circle></svg></a>
          <a href="https://www.facebook.com/AlzarsiLtda/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.4 8.1V6.5c0-.8.5-1 1-1H18V2.1l-3-.1c-3 0-4.6 1.8-4.6 4.3v1.8H8v3.8h2.4V22h4V11.9h3.1l.5-3.8h-3.6Z"></path></svg></a>
          <a href="https://www.linkedin.com/company/alzarsi-ltda/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 7.8A2.3 2.3 0 1 0 5.2 3a2.3 2.3 0 0 0 0 4.8ZM3.3 21h3.8V9.2H3.3V21Zm6.2 0h3.8v-6.6c0-1.7.3-3.3 2.4-3.3 2 0 2 1.9 2 3.4V21h3.8v-7.2c0-3.5-.8-6.2-4.9-6.2-2 0-3.3 1.1-3.8 2.1h-.1V8H9.1c.1 1.1.1 13 .1 13h.3Z"></path></svg></a>
        </div>
      </section>
    </div>
    <div class="alz-compact-footer__utility">
      <span>© <span data-current-year></span> Alzarsi Ltda.</span>
      <span>Diseñado por <strong>ninefive</strong></span>
    </div>
  </footer>`;

function initializeSharedFooter() {
  document.querySelectorAll("alzarsi-footer").forEach((footer) => {
    footer.outerHTML = footerTemplate;
  });
}

/* =========================================================
   ALZARSI LTDA. — MASTER WEBSITE SCRIPT
   Used by:
   - Homepage
   - Quiénes Somos
   - Recetas y Videos
   - Noticias y Eventos
   - Contact component
   - Future subsections

   Every feature checks whether its HTML exists before running.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initializeSharedFooter();
  initializeNavigation();
  initializeHeader();
  initializeHeroSlider();
  initializeHomepageInquiryForm();
  initializeContactComponent();
  initializeContentTabs();
  initializeRecipeFilters();
  initializeEventFilters();
  initializeGenericAccordions();
  initializeFooterYear();
});

/* =========================================================
   GLOBAL CONFIGURATION
========================================================= */

const ALZARSI_CONFIG = {
  whatsappNumber: "59172177160",
  telephoneNumber: "+59133494777",
  commercialEmail: "comercial@alzarsiltda.com",
  mobileBreakpoint: 960,
  sliderInterval: 6500,
};

/* =========================================================
   HELPER FUNCTIONS
========================================================= */

function getElement(id) {
  return document.getElementById(id);
}

function getElements(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}

function isExpanded(element) {
  return element?.getAttribute("aria-expanded") === "true";
}

function setExpanded(element, expanded) {
  if (!element) {
    return;
  }

  element.setAttribute("aria-expanded", String(expanded));
}

function safelyFocus(element, options = {}) {
  if (!element || typeof element.focus !== "function") {
    return;
  }

  try {
    element.focus(options);
  } catch {
    element.focus();
  }
}

/* =========================================================
   DESKTOP AND MOBILE NAVIGATION
========================================================= */

function initializeNavigation() {
  const menuButton = getElement("menuButton");
  const mobileMenu = getElement("mobileMenu");

  const productMenuButton = getElement("productMenuButton");
  const productMegaMenu = getElement("productMegaMenu");

  const mobileProductButton = getElement("mobileProductButton");
  const mobileProductMenu = getElement("mobileProductMenu");

  const mobileBreakpoint = window.matchMedia(
    `(max-width: ${ALZARSI_CONFIG.mobileBreakpoint}px)`,
  );

  function setDesktopProductMenu(open) {
    if (!productMenuButton || !productMegaMenu) {
      return;
    }

    productMenuButton.classList.toggle("is-open", open);
    productMegaMenu.classList.toggle("is-open", open);

    productMenuButton.setAttribute("aria-expanded", String(open));
    productMegaMenu.setAttribute("aria-hidden", String(!open));
  }

  function setMobileProductMenu(open) {
    if (!mobileProductButton || !mobileProductMenu) {
      return;
    }

    mobileProductButton.classList.toggle("is-open", open);
    mobileProductMenu.classList.toggle("is-open", open);

    mobileProductButton.setAttribute("aria-expanded", String(open));
    mobileProductMenu.setAttribute("aria-hidden", String(!open));
  }

  function setMobileMenu(open) {
    if (!menuButton || !mobileMenu) {
      return;
    }

    menuButton.classList.toggle("is-open", open);
    mobileMenu.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);

    menuButton.setAttribute("aria-expanded", String(open));
    mobileMenu.setAttribute("aria-hidden", String(!open));

    menuButton.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");

    if (!open) {
      setMobileProductMenu(false);
    }
  }

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      setMobileMenu(!isExpanded(menuButton));
    });

    getElements("a", mobileMenu).forEach((link) => {
      link.addEventListener("click", () => {
        setMobileMenu(false);
      });
    });
  }

  if (mobileProductButton && mobileProductMenu) {
    mobileProductButton.addEventListener("click", (event) => {
      event.stopPropagation();
      setMobileProductMenu(!isExpanded(mobileProductButton));
    });
  }

  if (productMenuButton && productMegaMenu) {
    productMenuButton.addEventListener("click", (event) => {
      event.stopPropagation();
      setDesktopProductMenu(!isExpanded(productMenuButton));
    });

    productMegaMenu.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  }

  document.addEventListener("click", (event) => {
    if (
      productMenuButton &&
      productMegaMenu &&
      !productMenuButton.contains(event.target) &&
      !productMegaMenu.contains(event.target)
    ) {
      setDesktopProductMenu(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    if (productMenuButton && isExpanded(productMenuButton)) {
      setDesktopProductMenu(false);
      safelyFocus(productMenuButton);
    }

    if (mobileProductButton && isExpanded(mobileProductButton)) {
      setMobileProductMenu(false);
      safelyFocus(mobileProductButton);
    }

    if (menuButton && isExpanded(menuButton)) {
      setMobileMenu(false);
      safelyFocus(menuButton);
    }
  });

  function synchronizeNavigation(event) {
    if (event.matches) {
      setDesktopProductMenu(false);
    } else {
      setMobileMenu(false);
      setMobileProductMenu(false);
    }
  }

  if (typeof mobileBreakpoint.addEventListener === "function") {
    mobileBreakpoint.addEventListener("change", synchronizeNavigation);
  } else if (typeof mobileBreakpoint.addListener === "function") {
    mobileBreakpoint.addListener(synchronizeNavigation);
  }

  synchronizeNavigation(mobileBreakpoint);
}

/* =========================================================
   STICKY HEADER SCROLL STATE
========================================================= */

function initializeHeader() {
  const siteHeader = getElement("siteHeader");

  if (!siteHeader) {
    return;
  }

  let scrollFrame;

  function updateHeader() {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 18);
    scrollFrame = null;
  }

  function requestHeaderUpdate() {
    if (scrollFrame) {
      return;
    }

    scrollFrame = window.requestAnimationFrame(updateHeader);
  }

  window.addEventListener("scroll", requestHeaderUpdate, {
    passive: true,
  });

  updateHeader();
}

/* =========================================================
   HOMEPAGE HERO SLIDER
========================================================= */

function initializeHeroSlider() {
  const slides = getElements("[data-slide]");
  const slideDots = getElements("[data-slide-to]");

  if (!slides.length) {
    return;
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let activeSlide = Math.max(
    0,
    slides.findIndex((slide) => slide.classList.contains("is-active")),
  );

  let slideTimer = null;
  let cleanupTimer = null;

  function displaySlide(index) {
    const nextSlide = (index + slides.length) % slides.length;
    const previousSlide = activeSlide;

    window.clearTimeout(cleanupTimer);

    slides.forEach((slide) => {
      slide.classList.remove("is-leaving");
    });

    if (slides[previousSlide] && previousSlide !== nextSlide) {
      slides[previousSlide].classList.add("is-leaving");
    }

    activeSlide = nextSlide;

    slides.forEach((slide, slideIndex) => {
      const current = slideIndex === activeSlide;

      slide.classList.toggle("is-active", current);
      slide.setAttribute("aria-hidden", String(!current));

      if (current) {
        slide.removeAttribute("inert");
      } else {
        slide.setAttribute("inert", "");
      }
    });

    slideDots.forEach((dot) => {
      const target = Number(dot.dataset.slideTo);
      const current = target === activeSlide;

      dot.classList.toggle("is-active", current);

      if (current) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });

    cleanupTimer = window.setTimeout(() => {
      slides.forEach((slide, slideIndex) => {
        if (slideIndex !== activeSlide) {
          slide.classList.remove("is-leaving");
        }
      });
    }, 950);
  }

  function stopSlider() {
    window.clearInterval(slideTimer);
    slideTimer = null;
  }

  function startSlider() {
    stopSlider();

    if (reducedMotion.matches || slides.length < 2 || document.hidden) {
      return;
    }

    slideTimer = window.setInterval(() => {
      displaySlide(activeSlide + 1);
    }, ALZARSI_CONFIG.sliderInterval);
  }

  slideDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const target = Number(dot.dataset.slideTo);

      if (Number.isNaN(target)) {
        return;
      }

      displaySlide(target);
      startSlider();
    });
  });

  const sliderContainer =
    slides[0].closest(".hero-slider") || slides[0].parentElement;

  if (sliderContainer) {
    sliderContainer.addEventListener("mouseenter", stopSlider);
    sliderContainer.addEventListener("mouseleave", startSlider);

    sliderContainer.addEventListener("focusin", stopSlider);
    sliderContainer.addEventListener("focusout", startSlider);
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopSlider();
    } else {
      startSlider();
    }
  });

  if (typeof reducedMotion.addEventListener === "function") {
    reducedMotion.addEventListener("change", startSlider);
  }

  displaySlide(activeSlide);
  startSlider();
}

/* =========================================================
   HOMEPAGE WHATSAPP INQUIRY FORM
========================================================= */

function initializeHomepageInquiryForm() {
  const inquiryForm = getElement("inquiryForm");
  const formStatus = getElement("formStatus");

  if (!inquiryForm) {
    return;
  }

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

    const inquiryText = [
      "Hola, equipo comercial de Alzarsi.",
      "",
      "Quisiera realizar la siguiente consulta:",
      "",
      `Nombre: ${name}`,
      `Empresa: ${company || "No indicada"}`,
      `Teléfono: ${phone}`,
      `Correo electrónico: ${email}`,
      `Tipo de consulta: ${profile}`,
      "",
      "Mensaje:",
      message,
    ].join("\n");

    const whatsappURL =
      `https://wa.me/${ALZARSI_CONFIG.whatsappNumber}` +
      `?text=${encodeURIComponent(inquiryText)}`;

    if (formStatus) {
      formStatus.textContent = "Abriendo WhatsApp con tu consulta preparada…";
    }

    const whatsappWindow = window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer",
    );

    if (!whatsappWindow) {
      window.location.href = whatsappURL;
    }

    window.setTimeout(() => {
      if (formStatus) {
        formStatus.textContent =
          "Tu consulta está preparada. Revisa WhatsApp para enviarla.";
      }
    }, 700);
  });
}

/* =========================================================
   SHARED CONTACT BOX
========================================================= */

function initializeContactComponent() {
  const emailToggle = getElement("alz-email-toggle");
  const emailContent = getElement("alz-email-content");
  const contactForm = getElement("alz-contact-form");
  const contactStatus = getElement("alz-contact-status");

  if (emailToggle && emailContent) {
    function setContactPanel(open) {
      emailToggle.setAttribute("aria-expanded", String(open));
      emailContent.setAttribute("aria-hidden", String(!open));
      emailContent.classList.toggle("is-open", open);

      if (open) {
        window.setTimeout(() => {
          safelyFocus(getElement("alz-contact-name"), {
            preventScroll: true,
          });
        }, 300);
      }
    }

    emailToggle.addEventListener("click", () => {
      setContactPanel(!isExpanded(emailToggle));
    });
  }

  if (!contactForm) {
    return;
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const formData = new FormData(contactForm);

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const subject = String(formData.get("subject") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const emailSubject = `Consulta web: ${subject}`;

    const emailBody = [
      "Nueva consulta desde el sitio web de Alzarsi Ltda.",
      "",
      `Nombre: ${name}`,
      `Teléfono: ${phone}`,
      `Correo electrónico: ${email}`,
      `Motivo: ${subject}`,
      "",
      "Mensaje:",
      message,
    ].join("\n");

    const mailtoURL =
      `mailto:${ALZARSI_CONFIG.commercialEmail}` +
      `?subject=${encodeURIComponent(emailSubject)}` +
      `&body=${encodeURIComponent(emailBody)}`;

    if (contactStatus) {
      contactStatus.textContent =
        "Abriendo tu aplicación de correo con la consulta preparada…";
    }

    window.location.href = mailtoURL;
  });
}

/* =========================================================
   RECETAS / VIDEOS CONTENT TABS
========================================================= */

function initializeContentTabs() {
  const tabs = getElements('[role="tab"][data-panel]');
  const panels = getElements('[role="tabpanel"].content-panel');

  if (!tabs.length || !panels.length) {
    return;
  }

  function activatePanel(panelID, moveFocus = false) {
    const selectedTab = tabs.find((tab) => tab.dataset.panel === panelID);

    const selectedPanel = getElement(panelID);

    if (!selectedTab || !selectedPanel) {
      return;
    }

    tabs.forEach((tab) => {
      const active = tab === selectedTab;

      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    panels.forEach((panel) => {
      const active = panel === selectedPanel;

      panel.classList.toggle("is-active", active);
      panel.hidden = !active;

      if (active) {
        panel.removeAttribute("inert");
      } else {
        panel.setAttribute("inert", "");
      }
    });

    if (moveFocus) {
      safelyFocus(selectedTab);
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      activatePanel(tab.dataset.panel);
    });

    tab.addEventListener("keydown", (event) => {
      const validKeys = ["ArrowLeft", "ArrowRight", "Home", "End"];

      if (!validKeys.includes(event.key)) {
        return;
      }

      event.preventDefault();

      let nextIndex = index;

      if (event.key === "ArrowRight") {
        nextIndex = (index + 1) % tabs.length;
      }

      if (event.key === "ArrowLeft") {
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      }

      if (event.key === "Home") {
        nextIndex = 0;
      }

      if (event.key === "End") {
        nextIndex = tabs.length - 1;
      }

      const nextTab = tabs[nextIndex];

      activatePanel(nextTab.dataset.panel, true);
    });
  });

  const initiallySelected =
    tabs.find((tab) => tab.getAttribute("aria-selected") === "true") ||
    tabs.find((tab) => tab.classList.contains("is-active")) ||
    tabs[0];

  activatePanel(initiallySelected.dataset.panel);
}

/* =========================================================
   RECIPE CATEGORY FILTERS
========================================================= */

function initializeRecipeFilters() {
  const recipesPanel = getElement("recipesPanel");
  const recipeGrid = getElement("recipeGrid");

  if (!recipesPanel || !recipeGrid) {
    return;
  }

  const filterButtons = getElements(
    ".recipe-filter [data-filter]",
    recipesPanel,
  );

  const recipeCards = getElements(".recipe-card[data-category]", recipeGrid);

  const filterStatus = getElement("filterStatus");

  if (!filterButtons.length || !recipeCards.length) {
    return;
  }

  function applyRecipeFilter(category) {
    let visibleCount = 0;

    recipeCards.forEach((card) => {
      const cardCategories = String(card.dataset.category || "")
        .split(/\s+/)
        .filter(Boolean);

      const visible = category === "all" || cardCategories.includes(category);

      card.hidden = !visible;
      card.classList.toggle("is-filtered-out", !visible);

      if (visible) {
        visibleCount += 1;
      }
    });

    filterButtons.forEach((button) => {
      const active = button.dataset.filter === category;

      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    if (filterStatus) {
      filterStatus.textContent = `${visibleCount} ${visibleCount === 1 ? "receta" : "recetas"}`;
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyRecipeFilter(button.dataset.filter || "all");
    });
  });

  const initialFilter =
    filterButtons.find(
      (button) => button.getAttribute("aria-pressed") === "true",
    )?.dataset.filter || "all";

  applyRecipeFilter(initialFilter);
}

/* =========================================================
   NOTICIAS Y EVENTOS FILTERS
========================================================= */

function initializeEventFilters() {
  const filterNavigation = getElement("publicaciones");

  if (!filterNavigation) {
    return;
  }

  const filterButtons = getElements(
    ".events-tab[data-filter]",
    filterNavigation,
  );

  const eventStories = getElements(
    [
      ".featured-story[data-category]",
      ".event-row[data-category]",
      ".news-card[data-category]",
      ".event-card[data-category]",
    ].join(","),
  );

  const result = getElement("eventsResult");
  const emptyMessage = getElement("eventsEmpty");

  if (!filterButtons.length || !eventStories.length) {
    return;
  }

  function applyEventFilter(category) {
    let visibleCount = 0;

    eventStories.forEach((story) => {
      const storyCategories = String(story.dataset.category || "")
        .split(/\s+/)
        .filter(Boolean);

      const visible = category === "all" || storyCategories.includes(category);

      story.hidden = !visible;
      story.classList.toggle("is-filtered-out", !visible);

      if (visible) {
        visibleCount += 1;
      }
    });

    filterButtons.forEach((button) => {
      const active = button.dataset.filter === category;

      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    if (result) {
      result.textContent = `${visibleCount} ${
        visibleCount === 1 ? "publicación" : "publicaciones"
      }`;
    }

    if (emptyMessage) {
      emptyMessage.hidden = visibleCount > 0;
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyEventFilter(button.dataset.filter || "all");
    });
  });

  const initialFilter =
    filterButtons.find(
      (button) => button.getAttribute("aria-pressed") === "true",
    )?.dataset.filter || "all";

  applyEventFilter(initialFilter);
}

/* =========================================================
   REUSABLE ACCORDIONS FOR FUTURE SUBSECTIONS

   Future HTML example:

   <button
     data-accordion-button
     aria-expanded="false"
     aria-controls="answer-one"
   >
     Question
   </button>

   <div id="answer-one" data-accordion-panel hidden>
     Answer
   </div>
========================================================= */

function initializeGenericAccordions() {
  const accordionButtons = getElements("[data-accordion-button]");

  accordionButtons.forEach((button) => {
    const panelID = button.getAttribute("aria-controls");
    const panel = panelID ? getElement(panelID) : null;

    if (!panel) {
      return;
    }

    function setAccordionState(open) {
      button.setAttribute("aria-expanded", String(open));
      button.classList.toggle("is-open", open);
      panel.classList.toggle("is-open", open);
      panel.hidden = !open;
    }

    setAccordionState(isExpanded(button));

    button.addEventListener("click", () => {
      setAccordionState(!isExpanded(button));
    });
  });
}

/* =========================================================
   AUTOMATIC FOOTER YEAR
========================================================= */

function initializeFooterYear() {
  getElements("#currentYear, [data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
}
