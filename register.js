document.getElementById("register-form").addEventListener("submit", e => {
  e.preventDefault();
  
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("tamunaUsers")) || [];

  const exists = users.some(u => u.email === email);
  if (exists) {
    alert("This email is already registered 😢");
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("tamunaUsers", JSON.stringify(users));
  alert("Registration successful 💖");

  window.location.href = "login.html"; // გადაგზავნა Login–ზე
});
