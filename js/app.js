
const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("search");
const cartToggle = document.getElementById("cart-toggle");
const cartSection = document.getElementById("cart");

function formatPrice(price) {
  return `₹${price.toLocaleString("en-IN")}`;
}

function renderProducts(searchTerm = "") {
  if (!productsContainer) return;

  const term = searchTerm.trim().toLowerCase();

  const filteredProducts = products.filter(product =>
    `${product.name} ${product.category} ${product.description}`
      .toLowerCase()
      .includes(term)
  );

  productsContainer.replaceChildren();

  if (filteredProducts.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No products found. Try another search.";
    productsContainer.appendChild(message);
    return;
  }

  filteredProducts.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";

    const name = document.createElement("h3");
    name.textContent = product.name;

    const description = document.createElement("p");
    description.textContent = product.description;

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = formatPrice(product.price);

    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.textContent = "Add to Cart";

    addButton.addEventListener("click", () => {
      addToCart(product.name);
      addButton.textContent = "Added!";
      setTimeout(() => {
        addButton.textContent = "Add to Cart";
      }, 700);
    });

    card.append(image, name, description, price, addButton);
    productsContainer.appendChild(card);
  });
}

if (searchInput) {
  searchInput.addEventListener("input", () => {
    renderProducts(searchInput.value);
  });
}

if (cartToggle && cartSection) {
  cartToggle.addEventListener("click", () => {
    cartSection.hidden = !cartSection.hidden;

    if (!cartSection.hidden) {
      cartSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
}

renderProducts();
renderCart();
