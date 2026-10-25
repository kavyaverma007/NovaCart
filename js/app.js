
const productContainer = document.getElementById("products");
const searchInput = document.getElementById("search");

function displayProducts(items) {
  if (items.length === 0) {
    productContainer.innerHTML = "<p>No products found.</p>";
    return;
  }

  productContainer.innerHTML = items.map(product => `
    <article class="product-card">
      <img
        src="${product.image}"
        alt="${product.name}"
        class="product-image"
      >
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p class="price">
        ₹${product.price.toLocaleString("en-IN")}
      </p>
      <button type="button">Add to Cart</button>
    </article>
  `).join("");
}

displayProducts(products);

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query)
  );

  displayProducts(filteredProducts);
});
