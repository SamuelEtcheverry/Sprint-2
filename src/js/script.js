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
    var userName = prompt('Bem-vindo ao Prime Lens!\nComo podemos te chamar?') || 'Desenvolvedor';
    alert('Olá, ' + userName + '! Acesso liberado ao Prime Lens. 🚀');

    loginScreen.style.display = 'none';
    appScreen.style.display   = 'block';

    setTimeout(checkReveal, 50);

    btn.disabled        = false;
    btnText.textContent = original;
  }, 800);
});
function checkReveal() {
    var elements = document.querySelectorAll('.reveal-section');
    elements.forEach(function(el) {
      el.classList.add('visible');
    });
  }
  var slides     = document.querySelectorAll('.slide');
  var dotsWrap   = document.getElementById('slideDots');
  var slideIndex = 0;
  
  slides.forEach(function(_, i) {
    var dot = document.createElement('button');
    dot.className   = 'slide-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    dot.addEventListener('click', function() { goToSlide(i); });
    dotsWrap.appendChild(dot);
  });
  
  function goToSlide(index) {
    slides[slideIndex].classList.remove('active');
    document.querySelectorAll('.slide-dot')[slideIndex].classList.remove('active');
    slideIndex = (index + slides.length) % slides.length;
    slides[slideIndex].classList.add('active');
    document.querySelectorAll('.slide-dot')[slideIndex].classList.add('active');
  }
  
  document.getElementById('slidePrev').addEventListener('click', function() { goToSlide(slideIndex - 1); });
  document.getElementById('slideNext').addEventListener('click', function() { goToSlide(slideIndex + 1); });
  
  var autoSlide = setInterval(function() { goToSlide(slideIndex + 1); }, 4000);
  
  document.querySelector('.slideshow-wrapper').addEventListener('mouseenter', function() { clearInterval(autoSlide); });
  document.querySelector('.slideshow-wrapper').addEventListener('mouseleave', function() {
    autoSlide = setInterval(function() { goToSlide(slideIndex + 1); }, 4000);
  });