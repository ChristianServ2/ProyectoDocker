const toggleBtn = document.getElementById('toggleBtn');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginMessage = document.getElementById('loginMessage');
const registerMessage = document.getElementById('registerMessage');

toggleBtn.addEventListener('click', () => {
  if (loginForm.style.display === 'none') {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    toggleBtn.textContent = '¿No tienes cuenta? Regístrate';
    clearMessages();
  } else {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    toggleBtn.textContent = '¿Ya tienes cuenta? Inicia sesión';
    clearMessages();
  }
});

function clearMessages() {
  loginMessage.textContent = '';
  registerMessage.textContent = '';
  loginMessage.className = 'message';
  registerMessage.className = 'message';
}

// Login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearMessages();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  if (!email || !password) {
    loginMessage.textContent = 'Por favor, completa todos los campos.';
    loginMessage.classList.add('error');
    return;
  }

  try {
    const API_URL = "http://localhost:5000/api/auth";

    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      loginMessage.textContent = '¡Login exitoso!';
      loginMessage.classList.add('success');
      console.log("Token recibido:", data.token);
    } else {
      loginMessage.textContent = data.error || 'Error en login';
      loginMessage.classList.add('error');
    }
  } catch (err) {
    loginMessage.textContent = 'Error de conexión con el servidor.';
    loginMessage.classList.add('error');
  }
});

// Registro
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearMessages();

  const nombre = document.getElementById('registerNombre').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value.trim();
  const passwordConfirm = document.getElementById('registerPasswordConfirm').value.trim();

  if (!nombre || !email || !password || !passwordConfirm) {
    registerMessage.textContent = 'Por favor, completa todos los campos.';
    registerMessage.classList.add('error');
    return;
  }

  if (password !== passwordConfirm) {
    registerMessage.textContent = 'Las contraseñas no coinciden.';
    registerMessage.classList.add('error');
    return;
  }

  try {
    const API_URL = "http://localhost:5000/api/auth";

    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      registerMessage.textContent = '¡Registro exitoso! Ahora puedes iniciar sesión.';
      registerMessage.classList.add('success');
      setTimeout(() => toggleBtn.click(), 2000);
    } else {
      registerMessage.textContent = data.error || 'Error en registro';
      registerMessage.classList.add('error');
    }
  } catch (err) {
    registerMessage.textContent = 'Error de conexión con el servidor.';
    registerMessage.classList.add('error');
  }
}); 