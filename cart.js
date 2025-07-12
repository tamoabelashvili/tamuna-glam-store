document.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItems = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="images/${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>Size: ${item.size}</p>
      <p>Price: ${item.price} ₾</p>
      <button onclick="removeItem(${index})">Remove</button>
    `;
    total += item.price;
    cartItems.appendChild(div);
  });

  totalEl.innerHTML = `<h3>Total: ${total} ₾</h3>`;
});

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
}
