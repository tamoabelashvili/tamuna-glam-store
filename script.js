// 🌟 გადასვლა სექციაზე ღილაკით
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// 🔍 ცოცხალი ძიება
function searchProducts() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const allProducts = document.querySelectorAll(".product");

  allProducts.forEach(product => {
    const title = product.querySelector("h3").textContent.toLowerCase();
    product.style.display = title.includes(input) ? "block" : "none";
  });
}

// 📦 პროდუქციის ჩატვირთვა JSON–იდან
window.addEventListener("DOMContentLoaded", () => {
  fetch("data/products.json")
    .then(res => res.json())
    .then(data => {
      const containers = {
        Dresses: document.getElementById("dresses-container"),
        Sweaters: document.getElementById("sweaters-container"),
        "Tops & Shorts": document.getElementById("sets-container")
      };

      data.products.forEach(product => {
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
    })
    .catch(err => {
      console.error("პროდუქტების ჩატვირთვაში მოხდა შეცდომა:", err);
      document.body.innerHTML = "<p style='text-align:center; padding:20px;'>პროდუქტები ვერ ჩაიტვირთა 😢</p>";
    });
});

// 🛒 პროდუქტების დამატება კალათაში
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("tamunaCart")) || [];
  cart.push(product);
  localStorage.setItem("tamunaCart", JSON.stringify(cart));
  alert(`${product.name} დაემატა კალათაში 💖`);
}

// 🧁 კატეგორიის ფილტრი – აჩვენებს მხოლოდ არჩეულს
function getSectionId(category) {
  const map = {
    "Dresses": "dresses-container",
    "Sweaters": "sweaters-container",
    "Tops & Shorts": "sets-container"
  };
  return map[category];
}

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
