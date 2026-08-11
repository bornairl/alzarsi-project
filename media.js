const initializeMediaArchive = () => {
  "use strict";

  const content = window.ALZARSI_MEDIA;
  const board = document.querySelector("[data-media-board]");
  if (!content || !board) return;

  const escapeHTML = (value = "") =>
    String(value).replace(
      /[&<>'"]/g,
      (character) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "'": "&#39;",
          '"': "&quot;",
        })[character],
    );

  const icons = {
    instagram:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg>',
    facebook:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.7 22v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5H17V4.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.5V14h2.8v8h3.4Z"/></svg>',
  };

  const renderGallery = (gallery, wide = false) => {
    const first = gallery.images[0];
    return `<article class="media-card${wide ? " media-card--wide" : ""}" data-gallery-id="${escapeHTML(gallery.id)}">
      <div class="media-card__visual">
        <button class="media-card__visual" type="button" data-open-gallery aria-label="Abrir ${escapeHTML(gallery.title)}">
          <img src="${escapeHTML(first.src)}" alt="${escapeHTML(first.alt)}" data-gallery-image>
          <span class="media-carousel__count" data-gallery-count>1 / ${gallery.images.length}</span>
        </button>
        <button class="media-carousel__arrow media-carousel__arrow--prev" type="button" data-gallery-prev aria-label="Fotografía anterior">←</button>
        <button class="media-carousel__arrow media-carousel__arrow--next" type="button" data-gallery-next aria-label="Fotografía siguiente">→</button>
      </div>
      <div class="media-card__caption"><span>${escapeHTML(gallery.eyebrow)}</span><h2>${escapeHTML(gallery.title)}</h2><p>${escapeHTML(gallery.summary)}</p></div>
    </article>`;
  };

  const renderVideo = (
    video,
    wide = false,
  ) => `<article class="media-card${wide ? " media-card--wide" : ""}">
    <a class="media-card__visual" href="https://www.youtube.com/watch?v=${escapeHTML(video.youtubeId)}" target="_blank" rel="noopener noreferrer" aria-label="Ver ${escapeHTML(video.title)} en YouTube">
      <img src="https://i.ytimg.com/vi/${escapeHTML(video.youtubeId)}/hqdefault.jpg" alt="Miniatura de ${escapeHTML(video.title)}" loading="lazy"><span class="media-play" aria-hidden="true"></span>
    </a>
    <div class="media-card__caption"><span>${escapeHTML(video.eyebrow)}</span><h3>${escapeHTML(video.title)}</h3></div>
  </article>`;

  const views = {
    home: () =>
      [
        renderGallery(content.galleries[0]),
        renderVideo(content.videos[0]),
        renderVideo(content.videos[1]),
        renderGallery(content.galleries[1]),
      ].join(""),
    photos: () =>
      content.galleries
        .map((gallery, index) => renderGallery(gallery, index === 0))
        .join(""),
    videos: () =>
      content.videos
        .map((video, index) => renderVideo(video, index === 0))
        .join(""),
  };

  document.querySelector("[data-media-title]").textContent =
    content.intro.title;
  document.querySelector("[data-media-description]").textContent =
    content.intro.description;
  document.querySelector("[data-media-social]").innerHTML = content.social
    .map(
      (item) =>
        `<a href="${escapeHTML(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHTML(item.label)}">${icons[item.platform] || escapeHTML(item.label)}</a>`,
    )
    .join("");

  const galleryState = new Map();
  const galleryById = (id) =>
    content.galleries.find((gallery) => gallery.id === id);

  const renderView = (name) => {
    board.innerHTML = (views[name] || views.home)();
    galleryState.clear();
    board
      .querySelectorAll("[data-gallery-id]")
      .forEach((card) => galleryState.set(card.dataset.galleryId, 0));
  };

  document.querySelectorAll("[data-tab]").forEach((button) =>
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-tab]").forEach((tab) => {
        const active = tab === button;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-pressed", String(active));
      });
      renderView(button.dataset.tab);
    }),
  );

  const updateCard = (card, direction) => {
    const gallery = galleryById(card.dataset.galleryId);
    if (!gallery) return;
    const next =
      (galleryState.get(gallery.id) + direction + gallery.images.length) %
      gallery.images.length;
    galleryState.set(gallery.id, next);
    const photo = gallery.images[next];
    const image = card.querySelector("[data-gallery-image]");
    image.src = photo.src;
    image.alt = photo.alt;
    card.querySelector("[data-gallery-count]").textContent =
      `${next + 1} / ${gallery.images.length}`;
  };

  const lightbox = document.querySelector("[data-lightbox]");
  let lightboxGallery = null;
  let lightboxIndex = 0;
  let returnFocus = null;
  const showLightboxImage = () => {
    const photo = lightboxGallery.images[lightboxIndex];
    const image = lightbox.querySelector("img");
    image.src = photo.src;
    image.alt = photo.alt;
    lightbox.querySelector("[data-lightbox-caption]").textContent =
      `${lightboxGallery.title} · ${lightboxIndex + 1} de ${lightboxGallery.images.length}`;
  };

  board.addEventListener("click", (event) => {
    const card = event.target.closest("[data-gallery-id]");
    if (!card) return;
    if (event.target.closest("[data-gallery-prev]")) updateCard(card, -1);
    if (event.target.closest("[data-gallery-next]")) updateCard(card, 1);
    if (event.target.closest("[data-open-gallery]")) {
      lightboxGallery = galleryById(card.dataset.galleryId);
      lightboxIndex = galleryState.get(lightboxGallery.id) || 0;
      returnFocus = event.target.closest("button");
      showLightboxImage();
      lightbox.showModal();
    }
  });

  const moveLightbox = (direction) => {
    if (!lightboxGallery) return;
    lightboxIndex =
      (lightboxIndex + direction + lightboxGallery.images.length) %
      lightboxGallery.images.length;
    showLightboxImage();
  };
  lightbox
    .querySelector("[data-lightbox-prev]")
    .addEventListener("click", () => moveLightbox(-1));
  lightbox
    .querySelector("[data-lightbox-next]")
    .addEventListener("click", () => moveLightbox(1));
  lightbox
    .querySelector("[data-lightbox-close]")
    .addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("close", () => {
    lightbox.querySelector("img").removeAttribute("src");
    returnFocus?.focus();
  });
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") moveLightbox(-1);
    if (event.key === "ArrowRight") moveLightbox(1);
  });

  renderView("home");
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeMediaArchive, {
    once: true,
  });
} else {
  initializeMediaArchive();
}
