(() => {
  const tabs = [...document.querySelectorAll("[data-panel]")];
  const panels = [...document.querySelectorAll(".content-panel")];
  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  const recipeCards = [...document.querySelectorAll(".recipe-card")];
  const filterStatus = document.getElementById("filterStatus");

  /* Recetas and Videos tabs */

  const activatePanel = (panelId) => {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.panel === panelId;

      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      const isActive = panel.id === panelId;

      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      activatePanel(tab.dataset.panel);
    });

    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;

      event.preventDefault();

      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (index + direction + tabs.length) % tabs.length;
      const nextTab = tabs[nextIndex];

      activatePanel(nextTab.dataset.panel);
      nextTab.focus();
    });
  });

  /* Recipe category filters */

  const applyFilter = (filter) => {
    let visibleCount = 0;

    recipeCards.forEach((card) => {
      const isVisible = filter === "all" || card.dataset.category === filter;

      card.hidden = !isVisible;

      if (isVisible) {
        visibleCount += 1;
      }
    });

    filterButtons.forEach((button) => {
      const isActive = button.dataset.filter === filter;

      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    if (filterStatus) {
      const label = visibleCount === 1 ? "receta" : "recetas";
      filterStatus.textContent = `${visibleCount} ${label}`;
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyFilter(button.dataset.filter);
    });
  });

  /* Initial page state */

  if (tabs.length && panels.length) {
    activatePanel("recipesPanel");
  }

  if (filterButtons.length && recipeCards.length) {
    applyFilter("all");
  }
})();
