function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

window.addEventListener("DOMContentLoaded", () => {
  fetch("data/products.json")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load products");
      return res.json();
    })
    .then((data) => {
      const containers = {
        Dresses: "dresses-container",
        Sweaters: "sweaters-container",
        "Tops & Shorts": "sets-container"
      };

      data.products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product";
        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p><strong>${product.price}</strong></p>
          <p>${product.description}</p>
          <p>Sizes: ${product.sizes.join(", ")}</p>
          <button>Add to Cart</button>
        `;
        const containerId = containers[product.category];
        const container = document.getElementById(containerId);
        if (container) container.appendChild(productCard);
      });
    })
    .catch((err) => {
      console.error("Error loading products:", err);
    });
});
