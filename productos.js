"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const catalog = window.ALZARSI_CATALOG;
  if (!catalog) return;

  const state = { city: "all", category: "all", brand: "all", query: "" };
  const productGrid = document.querySelector("[data-product-grid]");
  const brandGrid = document.querySelector("[data-brand-grid]");
  const resultCount = document.querySelector("[data-result-count]");
  const emptyState = document.querySelector("[data-empty-state]");
  const modal = document.querySelector("[data-product-modal]");

  const cityLabel = (city) =>
    city === "la-paz"
      ? "La Paz"
      : city === "santa-cruz"
        ? "Santa Cruz"
        : "Bolivia";
  const brandById = (id) => catalog.brands.find((brand) => brand.id === id);
  const normalize = (value) =>
    String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  function brandCard(brand) {
    const count = catalog.products.filter(
      (product) => product.brand === brand.id,
    ).length;
    const availability = brand.cities.length
      ? brand.cities.map(cityLabel).join(" · ")
      : "Catálogo en actualización";
    const logo = brand.logo
      ? `<img src="${brand.logo}" alt="${brand.name}" loading="lazy">`
      : `<strong>${brand.name}</strong>`;
    return `<a class="catalog-brand catalog-brand--${brand.id}" href="marca.html?id=${brand.id}">
      <span class="catalog-brand__logo">${logo}</span>
      <span class="catalog-brand__meta"><span>${availability}</span><em>${count ? `${count} productos` : "Consultar disponibilidad"}</em></span>
    </a>`;
  }

  function productCard(product) {
    const brand = brandById(product.brand);
    return `<article class="catalog-product">
      <button class="catalog-product__image" type="button" data-product-id="${product.id}" aria-label="Ver ${product.name}">
        <img src="${product.image}" alt="${product.name} ${product.size || ""}" loading="lazy">
      </button>
      <div class="catalog-product__copy">
        <p>${brand.name}</p>
        <h3>${product.name}</h3>
        <div><span>${product.size || "Presentación por confirmar"}</span><button type="button" data-product-id="${product.id}">Ver ficha →</button></div>
      </div>
    </article>`;
  }

  function filteredProducts() {
    return catalog.products.filter((product) => {
      const brand = brandById(product.brand);
      const haystack = normalize(
        `${product.name} ${product.category} ${brand.name} ${product.size}`,
      );
      return (
        (state.city === "all" || product.cities.includes(state.city)) &&
        (state.category === "all" || product.category === state.category) &&
        (state.brand === "all" || product.brand === state.brand) &&
        (!state.query || haystack.includes(normalize(state.query)))
      );
    });
  }

  function renderProducts() {
    const products = filteredProducts();
    productGrid.innerHTML = products.map(productCard).join("");
    resultCount.textContent = `${products.length} ${products.length === 1 ? "producto" : "productos"}`;
    emptyState.hidden = products.length > 0;
  }

  function renderBrands() {
    const brands =
      state.city === "all"
        ? catalog.brands
        : catalog.brands.filter(
            (brand) =>
              brand.cities.includes(state.city) || !brand.cities.length,
          );
    brandGrid.innerHTML = brands.map(brandCard).join("");
  }

  function renderFeaturedBrand() {
    const feature = catalog.featuredBrand;
    const section = document.querySelector("[data-featured-brand]");
    if (!feature || !section) return;
    const brand = brandById(feature.brandId);
    if (!brand) return;
    const logo = section.querySelector("[data-featured-logo]");
    logo.src = brand.logo || "";
    logo.alt = brand.name;
    section.querySelector("[data-featured-title]").textContent =
      feature.title || brand.name;
    section.querySelector("[data-featured-text]").textContent =
      feature.text || brand.intro;
    const image = section.querySelector("[data-featured-image]");
    image.src = feature.image;
    image.alt = feature.imageAlt || brand.name;
    section.querySelector("[data-featured-link]").href =
      `marca.html?id=${brand.id}`;
    section.style.setProperty("--feature-color", feature.color || "#eee49a");
    section.hidden = false;
  }

  function setPressed(group, value) {
    document
      .querySelectorAll(`[data-${group}]`)
      .forEach((button) =>
        button.setAttribute(
          "aria-pressed",
          String(button.dataset[group] === value),
        ),
      );
  }

  document.querySelectorAll("[data-city]").forEach((button) =>
    button.addEventListener("click", () => {
      state.city = button.dataset.city;
      setPressed("city", state.city);
      renderBrands();
      renderProducts();
    }),
  );

  document.querySelectorAll("[data-brand]").forEach((button) =>
    button.addEventListener("click", () => {
      state.brand = button.dataset.brand;
      setPressed("brand", state.brand);
      renderProducts();
    }),
  );

  const search = document.querySelector("[data-product-search]");
  search?.addEventListener("input", () => {
    state.query = search.value.trim();
    renderProducts();
  });

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-product-id]");
    if (trigger) openModal(trigger.dataset.productId);
    if (event.target.closest("[data-modal-close]") || event.target === modal)
      closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  function openModal(id) {
    const product = catalog.products.find((item) => item.id === id);
    if (!product) return;
    const brand = brandById(product.brand);
    modal.querySelector("[data-modal-image]").src = product.image;
    modal.querySelector("[data-modal-image]").alt =
      `${product.name} ${product.size || ""}`;
    modal.querySelector("[data-modal-brand]").textContent = brand.name;
    modal.querySelector("[data-modal-name]").textContent = product.name;
    modal.querySelector("[data-modal-size]").textContent =
      product.size || "Por confirmar";
    modal.querySelector("[data-modal-category]").textContent = product.category;
    modal.querySelector("[data-modal-city]").textContent = product.cities.length
      ? product.cities.map(cityLabel).join(" y ")
      : "Por confirmar";
    modal.querySelector("[data-modal-barcode]").textContent =
      product.barcode || "No disponible";
    modal.querySelector("[data-modal-case]").textContent =
      product.caseQuantity || "Consultar";
    modal.querySelector("[data-modal-contact]").href =
      `https://wa.me/59172177160?text=${encodeURIComponent(`Hola, quisiera consultar disponibilidad de ${product.name} ${product.size || ""} (${brand.name}).`)}`;
    modal.hidden = false;
    document.body.classList.add("modal-open");
    modal.querySelector("[data-modal-close]").focus();
  }

  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  const requestedCity = new URLSearchParams(location.search).get("city");
  if (["la-paz", "santa-cruz"].includes(requestedCity)) {
    state.city = requestedCity;
    setPressed("city", requestedCity);
    renderBrands();
  } else {
    brandGrid.innerHTML = catalog.brands.map(brandCard).join("");
  }
  renderProducts();
  renderFeaturedBrand();
});
