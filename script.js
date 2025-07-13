// ✨ Smooth scroll to section
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// 🌟 Filter by category
function filterCategory(category) {
  const sections = document.querySelectorAll(".product-section");

  sections.forEach(section => {
    if (category === "All" || section.id === getSectionId(category)) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });
}

// 🔍 Search functionality
function searchProducts() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const allProducts = document.querySelectorAll(".product");

  allProducts.forEach(product => {
    const title = product.querySelector("h3").textContent.toLowerCase();
    if (title.includes(input)) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

// 🔁 Helper to get section ID from category
function getSectionId(category) {
  const map = {
    "Dresses": "dresses-container",
    "Sweaters": "sweaters-container",
    "Tops & Shorts": "sets-container"
  };
  return map[category];
}

// 🚀 Load products when page loads
window.addEventListener("DOMContentLoaded", () => {
  fetch("data/products.json")
    .then(res => {
      if (!res.ok) throw new Error("Failed to load products");
      return res.json();
    })
    .then(data => {
      const containers = {
        Dresses: document.getElementById("dresses-container"),
        Sweaters: document.getElementById("sweaters-container"),
        "Tops & Shorts": document.getElementById("sets-container")
      };

      data.products.forEach(product => {
        const div = document.createElement("div");
        div.className = "product";
        div.style.animation = "fadeUp 0.8s ease";
        div.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p><strong>${product.price}</strong></p>
          <p>${product.description}</p>
          <p>Sizes: ${product.sizes.join(", ")}</p>
          <button>Add to Cart</button>
        `;
        containers[product.category]?.appendChild(div);
      });
    })
    .catch(err => console.error("Error loading products:", err));
});
