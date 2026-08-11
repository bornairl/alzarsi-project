document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const stories = document.querySelectorAll("[data-category]");
  const result = document.getElementById("eventsResult");
  const emptyMessage = document.getElementById("eventsEmpty");

  if (!filterButtons.length || !stories.length) return;

  function filterStories(category) {
    let visibleStories = 0;

    stories.forEach((story) => {
      const isVisible =
        category === "all" || story.dataset.category === category;

      story.hidden = !isVisible;

      if (isVisible) visibleStories += 1;
    });

    filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === category;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    if (result) {
      result.textContent = `${visibleStories} ${
        visibleStories === 1 ? "publicaciÃ³n" : "publicaciones"
      }`;
    }

    if (emptyMessage) {
      emptyMessage.hidden = visibleStories > 0;
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterStories(button.dataset.filter);
    });
  });

  filterStories("all");
});
