"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const catalog = window.ALZARSI_CATALOG;
  const id = new URLSearchParams(location.search).get("id") || "lee-kum-kee";
  const brand = catalog?.brands.find((item) => item.id === id);
  if (!brand) {
    location.replace("productos.html");
    return;
  }

  const products = catalog.products.filter(
    (product) => product.brand === brand.id && product.active !== false,
  );
  const presentation = brand.presentation || {};
  const theme = brand.theme || {};
  const cityName = (city) => (city === "la-paz" ? "La Paz" : "Santa Cruz");
  const byId = (productId) =>
    products.find((product) => product.id === productId);
  const experience = document.querySelector("[data-brand-experience]");

  Object.entries({
    "--brand-bg": theme.background || "#f4f1e9",
    "--brand-surface": theme.surface || "#fbfaf6",
    "--brand-text": theme.text || "#30312e",
    "--brand-accent": theme.accent || "#c8a95a",
    "--brand-contrast": theme.contrast || "#242522",
    "--brand-on-contrast": theme.onContrast || "#f7f3e9",
  }).forEach(([property, value]) =>
    experience.style.setProperty(property, value),
  );
  experience.dataset.brand = brand.id;
  if (presentation.layout) experience.dataset.layout = presentation.layout;
  document.body.dataset.brand = brand.id;

  document.title = `${brand.name} | Alzarsi Ltda.`;
  const headline = document.querySelector("[data-brand-headline]");
  if (presentation.heroHeadlineLines?.length) {
    headline.replaceChildren(
      ...presentation.heroHeadlineLines.map((line) => {
        const span = document.createElement("span");
        span.textContent = line;
        return span;
      }),
    );
  } else {
    headline.textContent = presentation.heroHeadline || brand.name;
  }
  document.querySelector("[data-brand-intro]").textContent = brand.intro;
  document.querySelector("[data-brand-story]").textContent = brand.story;
  const setLines = (element, lines, fallback) => {
    if (lines?.length) {
      element.replaceChildren(
        ...lines.map((line) => {
          const span = document.createElement("span");
          span.textContent = line;
          return span;
        }),
      );
    } else {
      element.textContent = fallback;
    }
  };
  setLines(
    document.querySelector("[data-brand-statement]"),
    presentation.statementLines,
    presentation.statement || `Conoce ${brand.name}.`,
  );
  document.querySelector("[data-brand-availability]").textContent = brand.cities
    .length
    ? `Disponible en ${brand.cities.map(cityName).join(" y ")}`
    : "Disponibilidad a consulta";

  const logo = document.querySelector("[data-brand-logo]");
  if (brand.logo) {
    logo.src = presentation.heroLogo || brand.logo;
    logo.alt = brand.name;
  } else {
    logo.remove();
    document.querySelector("[data-brand-wordmark]").textContent = brand.name;
  }

  const heroStage = document.querySelector("[data-brand-hero-products]");
  if (presentation.heroBanner) {
    heroStage.classList.add("brand-hero__products--banner");
    const campaignCopy = presentation.heroCampaignTitle
      ? `<div class="brand-hero-campaign-copy"><h1>${presentation.heroCampaignTitle}</h1>${presentation.heroCampaignText ? `<p>${presentation.heroCampaignText}</p>` : ""}</div>`
      : "";
    const campaignWordmark = presentation.heroWordmark
      ? `<img class="brand-hero-campaign-wordmark" src="${presentation.heroWordmark}" alt="${brand.name}">`
      : "";
    const heroLogo = presentation.heroOverlayLogo && brand.logo
      ? `<div class="brand-hero-overlay-logo"><img src="${brand.logo}" alt="${brand.name}"></div>`
      : "";
    heroStage.innerHTML = `<img class="brand-hero-banner" src="${presentation.heroBanner}" alt="${presentation.heroBannerAlt || brand.name}">${heroLogo}${campaignWordmark}${campaignCopy}`;
  } else {
    const heroProducts = (presentation.heroProducts || [])
      .map(byId)
      .filter(Boolean);
    if (!heroProducts.length && brand.heroImage) {
      heroProducts.push({ name: brand.name, image: brand.heroImage });
    }
    heroStage.innerHTML = heroProducts
      .map(
        (product, index) =>
          `<img class="brand-hero-product brand-hero-product--${index + 1}" src="${product.image}" alt="${product.name}" ${index ? 'loading="lazy"' : ""}>`,
      )
      .join("");
  }

  const statementProducts = (presentation.statementProducts || [])
    .map(byId)
    .filter(Boolean);
  document.querySelector("[data-statement-products]").innerHTML =
    statementProducts
      .map((product) => `<img src="${product.image}" alt="" loading="lazy">`)
      .join("");
  const statementImage = document.querySelector("[data-brand-statement-image]");
  if (presentation.statementImage) {
    statementImage.src = presentation.statementImage;
    statementImage.alt = presentation.statementImageAlt || "";
  } else {
    statementImage.remove();
  }

  const featuredProducts = (presentation.featuredProducts || [])
    .map(byId)
    .filter(Boolean);
  if (featuredProducts.length) {
    document.querySelector("[data-featured-heading]").textContent =
      presentation.featuredHeading || "Descubre la selección";
  document.querySelector("[data-featured-products]").innerHTML =
      featuredProducts
        .map(
          (
            product,
            index,
          ) => `<article class="brand-featured-card brand-featured-card--${index + 1}">
          <div class="brand-featured-card__copy"><h3>${product.name}</h3><p>${product.featureText || product.description || brand.intro}</p></div>
          <div class="brand-featured-card__stage"><img src="${product.image}" alt="${product.name}" loading="lazy"></div>
        </article>`,
        )
        .join("");
    document.querySelector("[data-brand-featured-section]").hidden = false;
  }

  if (presentation.editorialImage) {
    const section = document.querySelector("[data-brand-editorial-section]");
    const image = section.querySelector("[data-brand-editorial-image]");
    image.src = presentation.editorialImage;
    image.alt = presentation.editorialImageAlt || "";
    setLines(
      section.querySelector("[data-brand-editorial-title]"),
      presentation.editorialTitleLines,
      presentation.editorialTitle || "",
    );
    section.querySelector("[data-brand-editorial-text]").textContent =
      presentation.editorialText || "";
    section.hidden = false;
  }

  document.querySelector("[data-catalog-heading]").textContent =
    presentation.catalogHeading || "Colección completa";
  const grid = document.querySelector("[data-brand-products]");
  if (!products.length) {
    grid.innerHTML = `<div class="brand-empty"><p>Catálogo en actualización</p><h2>Estamos preparando el portafolio detallado de ${brand.name}.</h2><a href="#contacto">Consultar disponibilidad →</a></div>`;
    return;
  }
  grid.innerHTML = products
    .map(
      (product) => `<article class="catalog-product">
        <a class="catalog-product__image" href="https://wa.me/59172177160?text=${encodeURIComponent(`Hola, quisiera consultar ${product.name} ${product.size || ""} de ${brand.name}.`)}" target="_blank" rel="noopener" aria-label="Consultar ${product.name}"><img src="${product.image}" alt="${product.name} ${product.size || ""}" loading="lazy"></a>
        <div class="catalog-product__copy"><h3>${product.name}</h3><div><span>${product.size || "Presentación por confirmar"}</span><a href="https://wa.me/59172177160?text=${encodeURIComponent(`Hola, quisiera consultar ${product.name} ${product.size || ""} de ${brand.name}.`)}" target="_blank" rel="noopener">Consultar →</a></div></div>
      </article>`,
    )
    .join("");
});
