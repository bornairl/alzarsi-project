const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".main-menu");
const header = document.querySelector(".site-header");

menuButton.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  header.classList.toggle("stuck", window.scrollY > 80);
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

document.querySelectorAll(".category-tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".category-tab").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    document.querySelectorAll(".product-card").forEach((card) => {
      card.classList.toggle("hidden", filter !== "todos" && card.dataset.category !== filter);
    });
  });
});

document.getElementById("order-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Pedido web - ${data.get("nombre")}`);
  const body = encodeURIComponent(
    `Nombre: ${data.get("nombre")}\n` +
    `Correo: ${data.get("correo")}\n` +
    `Teléfono: ${data.get("telefono")}\n` +
    `Fecha: ${data.get("fecha")}\n` +
    `Tipo de cliente: ${data.get("tipo")}\n` +
    `Empresa/persona: ${data.get("empresa")}\n` +
    `Dirección de entrega: ${data.get("direccion")}\n` +
    `Producto: ${data.get("producto")}\n\n` +
    `Detalle del pedido:\n${data.get("detalle")}`
  );
  window.location.href = `mailto:gerentecomercial.lpz@alzarsiltda.com?subject=${subject}&body=${body}`;
});

document.getElementById("year").textContent = new Date().getFullYear();
