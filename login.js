document.getElementById("login-form").addEventListener("submit", e => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("tamunaUsers")) || [];

  const found = users.find(u => u.email === email && u.password === password);

  if (!found) {
    alert("Incorrect email or password 😢");
    return;
  }

  // 🌟 შენახვა Logged-in-ის სტატუსისთვის
  localStorage.setItem("tamunaLoggedUser", JSON.stringify(found));
  alert(`Welcome back, ${found.name} 💖`);

  window.location.href = "index.html"; // ან "checkout.html", თუ ეგ გაქვს
});
