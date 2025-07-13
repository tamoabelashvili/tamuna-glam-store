// იკითხე URL–დან id
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch("data/products.json")
  .then(res => res.json())
  .then(data => {
    const product = data.products.find(p => p.name === id);
    if (!product) {
      document.getElementById("product-details").innerHTML = "<p>Product not found 😢</p>";
      return;
    }

    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Description:</strong> ${product.description}</p>
      <p><strong>Sizes:</strong> ${product.sizes.join(", ")}</p>

      <form>
        <label>Choose size:</label>
        <select>
          ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join("")}
        </select>

        <label>Your email:</label>
        <input type="email" placeholder="you@example.com" required />

        <button type="submit">Order Now</button>
      </form>
    `;
    document.getElementById("product-details").appendChild(div);
  });
