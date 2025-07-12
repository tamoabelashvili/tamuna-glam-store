document.addEventListener('DOMContentLoaded', () => {
  fetch('data/products.json')
    .then(res => res.json())
    .then(products => {
      displayCategory(products, 'Dress', 'dresses-list');
      displayCategory(products, 'Sweater', 'sweaters-list');
      displayCategory(products, 'Set', 'sets-list');
    });

  updateCartCount();

  function displayCategory(products, keyword, containerId) {
    const container = document.getElementById(containerId);
    products.filter(p => p.category.includes(keyword)).forEach(product => {
      const div = document.createElement('div');
      div.className = 'product';
      div.innerHTML = `
        <img src="images/${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price} ₾</p>
        <label>Size:
          <select>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>
        </label>
        <button>Add to Cart</button>
      `;

      div.querySelector('button').addEventListener('click', () => {
        const size = div.querySelector('select').value;
        const item = {
          name: product.name,
          price: product.price,
          image: product.image,
          size: size
        };
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
      });

      container.appendChild(div);
    });
  }

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = cart.length;
  }
});
