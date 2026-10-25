
const checkoutSection = document.getElementById("checkout");
const checkoutStart = document.getElementById("checkout-start");
const checkoutBack = document.getElementById("checkout-back");
const checkoutForm = document.getElementById("checkout-form");
const checkoutSummary = document.getElementById("checkout-summary");
const checkoutMessage = document.getElementById("checkout-message");

function renderCheckoutSummary() {
  checkoutSummary.replaceChildren();

  if (!cart.length) {
    const empty = document.createElement("p");
    empty.textContent = "Your cart is empty.";
    checkoutSummary.appendChild(empty);
    return;
  }

  const list = document.createElement("ul");
  let subtotal = 0;

  cart.forEach(item => {
    const lineTotal = item.price * item.quantity;
    subtotal += lineTotal;

    const row = document.createElement("li");
    row.textContent =
      `${item.name} × ${item.quantity} — ₹${lineTotal.toLocaleString("en-IN")}`;

    list.appendChild(row);
  });

  const total = document.createElement("p");
  total.className = "checkout-total";
  total.textContent =
    `Subtotal: ₹${subtotal.toLocaleString("en-IN")}`;

  const shipping = document.createElement("p");
  shipping.textContent = "Shipping: calculated before real checkout.";

  checkoutSummary.append(list, total, shipping);
}

checkoutStart.addEventListener("click", () => {
  if (!cart.length) {
    alert("Your cart is empty. Add a product before checkout.");
    return;
  }

  renderCheckoutSummary();
  checkoutMessage.textContent = "";
  checkoutSection.hidden = false;
  checkoutSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

checkoutBack.addEventListener("click", () => {
  checkoutSection.hidden = true;
  document.getElementById("cart").hidden = false;
  document.getElementById("cart").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});

checkoutForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!cart.length) {
    checkoutMessage.textContent =
      "Your cart is empty. Return to the store and add a product.";
    return;
  }

  if (!checkoutForm.reportValidity()) return;

  checkoutMessage.textContent =
    "Demo only: your form was validated, but no order was sent or saved. " +
    "Do not enter real customer details. A secure backend is required before launch.";
});
