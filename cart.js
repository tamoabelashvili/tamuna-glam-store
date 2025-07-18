const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");

let cart = JSON.parse(localStorage.getItem("tamunaCart")) || [];

function renderCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty 😢</p>";
    cartTotalElement.textContent = "$0";
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p><strong>${item.price}</strong></p>
      <p>Size: ${item.size || "M"}</p>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    cartItemsContainer.appendChild(div);
    total += parseFloat(item.price.replace("$", ""));
  });

  cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("tamunaCart", JSON.stringify(cart));
  renderCart();
}

document.getElementById("checkoutBtn").addEventListener("click", () => {
  alert("Checkout is coming soon 💖");
});

window.addEventListener("DOMContentLoaded", renderCart);
