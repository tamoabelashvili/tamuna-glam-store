// 🔁 Retrieve cart data from localStorage
const cartData = JSON.parse(localStorage.getItem("tamunaCart")) || [];

const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");

// 🧾 Render cart items
function renderCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cartData.forEach(item => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p><strong>${item.price}</strong></p>
      <p>Size: ${item.size || "M"}</p>
      <button onclick="removeItem('${item.name}')">Remove</button>
    `;
    cartItemsContainer.appendChild(div);

    total += parseFloat(item.price.replace("$", ""));
  });

  cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

// ❌ Remove product from cart
function removeItem(productName) {
  const updatedCart = cartData.filter(item => item.name !== productName);
  localStorage.setItem("tamunaCart", JSON.stringify(updatedCart));
  location.reload();
}

renderCart();
