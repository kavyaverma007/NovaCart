
const CART_STORAGE_KEY = "novacart-cart";

function loadCart() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(CART_STORAGE_KEY) || "[]"
    );

    if (!Array.isArray(saved)) return [];

    return saved.filter(
      item =>
        item &&
        typeof item.name === "string" &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
    );
  } catch {
    return [];
  }
}

let cart = loadCart();

function saveCart() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function addToCart(productName) {
  const product = products.find(p => p.name === productName);

  if (!product) return;

  const existingItem = cart.find(
    item => item.name === productName
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }

  saveCart();
  renderCart();
}

function changeQuantity(productName, amount) {
  const item = cart.find(
    item => item.name === productName
  );

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(
      item => item.name !== productName
    );
  }

  saveCart();
  renderCart();
}

function removeFromCart(productName) {
  cart = cart.filter(
    item => item.name !== productName
  );

  saveCart();
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartSummary = document.getElementById("cart-summary");
  const cartToggle = document.getElementById("cart-toggle");

  if (!cartItems || !cartSummary || !cartToggle) return;

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  cartToggle.textContent = `Cart (${cartCount})`;

  if (cart.length === 0) {
    cartItems.textContent = "Your cart is empty.";
    cartSummary.replaceChildren();
    return;
  }

  cartItems.replaceChildren();

  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "cart-item";

    const details = document.createElement("p");
    details.textContent =
      `${item.name} — ₹${item.price.toLocaleString("en-IN")} × ${item.quantity}`;

    const decrease = document.createElement("button");
    decrease.textContent = "−";
    decrease.type = "button";
    decrease.setAttribute("aria-label", `Decrease ${item.name} quantity`);
    decrease.addEventListener("click", () => {
      changeQuantity(item.name, -1);
    });

    const increase = document.createElement("button");
    increase.textContent = "+";
    increase.type = "button";
    increase.setAttribute("aria-label", `Increase ${item.name} quantity`);
    increase.addEventListener("click", () => {
      changeQuantity(item.name, 1);
    });

    const remove = document.createElement("button");
    remove.textContent = "Remove";
    remove.type = "button";
    remove.addEventListener("click", () => {
      removeFromCart(item.name);
    });

    row.append(details, decrease, increase, remove);
    cartItems.appendChild(row);
  });

  cartSummary.textContent =
    `Subtotal: ₹${subtotal.toLocaleString("en-IN")}`;
}

renderCart();
