function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

window.addEventListener("DOMContentLoaded", () => {
  fetch("products.json")
    .then((res) => res.json())
    .then((data) => {
      const categories = {
        Dresses: "dresses-container",
        Sweaters: "sweaters-container",
        "Tops & Shorts": "sets-container"
      };

      data.products.forEach((product) => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p><strong>${product.price}</strong></p>
          <p>${product.description}</p>
          <p>Sizes: ${product.sizes.join(", ")}</p>
        `;
        document.getElementById(categories[product.category]).appendChild(div);
      });
    })
    .catch((err) => console.error("პროდუქტები ვერ ჩაიტვირთა:", err));
});
