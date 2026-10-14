const grid = document.querySelector("#product-grid");
const toast = document.querySelector(".toast");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
let products = [];

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[char]));

function render(items) {
  grid.innerHTML = items.map((product, index) => {
    const category = product.house === "Xerjoff" ? "nicho" :
      product.house === "Jean Paul Gaultier" ? "designer" : "arabes";
    return `<article class="product-card" data-category="${category}">
      <div class="product-art" role="img" aria-label="Presentación visual de ${escapeHtml(product.name)}">
        <span class="product-tag">${index === 0 ? "Selección especial" : "Descubrí su esencia"}</span>
        <div class="bottle"></div>
      </div>
      <div class="product-info">
        <p class="product-house">${escapeHtml(product.house)}</p>
        <h3>${escapeHtml(product.name)}</h3>
        <p class="product-family">${escapeHtml(product.family)}</p>
        <div class="product-bottom"><span class="product-price">Decants disponibles<strong>Precio a confirmar</strong></span>
          <button class="add-button" disabled title="El precio estará disponible próximamente">Próximamente</button>
        </div>
      </div>
    </article>`;
  }).join("");
}

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".filter.active")?.classList.remove("active");
    button.classList.add("active");
    const selected = button.dataset.filter;
    const filtered = selected === "todos" ? products : products.filter((product) =>
      selected === "arabes" ? product.house !== "Xerjoff" && product.house !== "Jean Paul Gaultier" :
      selected === "nicho" ? product.house === "Xerjoff" : product.house === "Jean Paul Gaultier");
    render(filtered);
  });
});

menuToggle.addEventListener("click", () => {
  const opened = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(opened));
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => nav.classList.remove("open")));

fetch("/api/products")
  .then((response) => response.ok ? response.json() : Promise.reject())
  .then((catalog) => { products = catalog; render(products); })
  .catch(() => {
    grid.innerHTML = '<p class="catalog-error">No se pudo cargar la colección. Actualizá la página para volver a intentar.</p>';
  });