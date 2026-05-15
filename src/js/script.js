var loginForm    = document.getElementById('loginForm');
var loginScreen  = document.getElementById('loginScreen');
var appScreen    = document.getElementById('appScreen');

loginForm.addEventListener('submit', function(event) {
  event.preventDefault();

  var emailInput    = document.getElementById('email');
  var passwordInput = document.getElementById('password');
  var emailError    = document.getElementById('emailError');
  var passwordError = document.getElementById('passwordError');

  var email    = emailInput.value.trim();
  var password = passwordInput.value;

  var valid = true;

  emailInput.classList.remove('error');
  passwordInput.classList.remove('error');
  emailError.textContent    = '';
  passwordError.textContent = '';

  if (!email) {
    emailError.textContent = 'E-mail obrigatório.';
    emailInput.classList.add('error');
    valid = false;
  } else if (!email.includes('@') || !email.includes('.')) {
    emailError.textContent = 'Digite um e-mail válido.';
    emailInput.classList.add('error');
    valid = false;
  }

  if (!password) {
    passwordError.textContent = 'Senha obrigatória.';
    passwordInput.classList.add('error');
    valid = false;
  } else if (password.length < 6) {
    passwordError.textContent = 'Mínimo de 6 caracteres.';
    passwordInput.classList.add('error');
    valid = false;
  }

  if (!valid) return;

  var btn      = loginForm.querySelector('.login-btn');
  var btnText  = btn.querySelector('.btn-text');
  var original = btnText.textContent;

  btn.disabled        = true;
  btnText.textContent = 'Entrando...';

  setTimeout(function() {
    loginScreen.style.display = 'none';
    appScreen.style.display   = 'block';
    btn.disabled        = false;
    btnText.textContent = original;
  }, 800);
});