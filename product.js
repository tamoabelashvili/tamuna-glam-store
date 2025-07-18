const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const container = document.getElementById("product-details");

const products = JSON.parse(localStorage.getItem("tamunaProducts")) || [];
const product = products.find(p => p.name === id);

if (!product) {
  container.innerHTML = "<p>Product not found 😢</p>";
} else {
  const div = document.createElement("div");
  div.className = "product";
  div.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h2>${product.name}</h2>
    <p><strong>Price:</strong> ${product.price}</p>
    <p><strong>Description:</strong> ${product.description}</p>
    <p><strong>Sizes:</strong> ${product.sizes.join(", ")}</p>

    <form id="order-form">
      <label>Select size:</label>
      <select required>
        ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join("")}
      </select>

      <label>Your email:</label>
      <input type="email" placeholder="you@example.com" required />

      <button type="submit">Order Now</button>
    </form>
  `;
  container.appendChild(div);

  document.getElementById("order-form").addEventListener("submit", e => {
    e.preventDefault();
    alert("Order received 💖 We'll contact you soon!");
  });
}
