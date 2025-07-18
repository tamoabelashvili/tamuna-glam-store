// ✨ Smooth scroll
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// 🔍 Live search
function searchProducts() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const allProducts = document.querySelectorAll(".product");

  allProducts.forEach(product => {
    const title = product.querySelector("h3").textContent.toLowerCase();
    product.style.display = title.includes(input) ? "block" : "none";
  });
}

// 💖 Add to Cart
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("tamunaCart")) || [];
  cart.push(product);
  localStorage.setItem("tamunaCart", JSON.stringify(cart));
  alert(`${product.name} added to cart 💅`);
}

// 🚀 Load products
window.addEventListener("DOMContentLoaded", () => {
  const products = JSON.parse(localStorage.getItem("tamunaProducts")) || [];

  const containers = {
    Dresses: document.getElementById("dresses-container"),
    Sweaters: document.getElementById("sweaters-container"),
    "Tops & Shorts": document.getElementById("sets-container")
  };

  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3><a href="product.html?id=${encodeURIComponent(product.name)}">${product.name}</a></h3>
      <p><strong>${product.price}</strong></p>
      <p>${product.description}</p>
      <p>Sizes: ${product.sizes.join(", ")}</p>
      <button onclick='addToCart(${JSON.stringify(product)}); event.stopPropagation(); return false;'>Add to Cart</button>
    `;

    containers[product.category]?.appendChild(div);
  });
});
