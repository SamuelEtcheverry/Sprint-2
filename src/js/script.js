var loginForm = document.getElementById('loginForm');
var loginScreen = document.getElementById('loginScreen');
var appScreen = document.getElementById('appScreen');

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    var emailError = document.getElementById('emailError');
    var passwordError = document.getElementById('passwordError');

    var email = emailInput.value.trim();
    var password = passwordInput.value;

    var valid = true;

    emailInput.classList.remove('error');
    passwordInput.classList.remove('error');
    emailError.textContent = '';
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

    var btn = loginForm.querySelector('.login-btn');
    var btnText = btn.querySelector('.btn-text');
    var original = btnText.textContent;

    btn.disabled = true;
    btnText.textContent = 'Entrando...';

    setTimeout(function () {
        var userName = prompt('Bem-vindo ao Prime Lens!\nComo podemos te chamar?') || 'Desenvolvedor';
        alert('Olá, ' + userName + '! Acesso liberado ao Prime Lens. 🚀');

        loginScreen.style.display = 'none';
        appScreen.style.display = 'block';

        setTimeout(checkReveal, 50);

        btn.disabled = false;
        btnText.textContent = original;
    }, 800);
});

var slides = document.querySelectorAll('.slide');
var dotsWrap = document.getElementById('slideDots');
var slideIndex = 0;

slides.forEach(function (_, i) {
    var dot = document.createElement('button');
    dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    dot.addEventListener('click', function () { goToSlide(i); });
    dotsWrap.appendChild(dot);
});

function goToSlide(index) {
    slides[slideIndex].classList.remove('active');
    document.querySelectorAll('.slide-dot')[slideIndex].classList.remove('active');
    slideIndex = (index + slides.length) % slides.length;
    slides[slideIndex].classList.add('active');
    document.querySelectorAll('.slide-dot')[slideIndex].classList.add('active');
}

document.getElementById('slidePrev').addEventListener('click', function () { goToSlide(slideIndex - 1); });
document.getElementById('slideNext').addEventListener('click', function () { goToSlide(slideIndex + 1); });

var autoSlide = setInterval(function () { goToSlide(slideIndex + 1); }, 4000);

document.querySelector('.slideshow-wrapper').addEventListener('mouseenter', function () { clearInterval(autoSlide); });
document.querySelector('.slideshow-wrapper').addEventListener('mouseleave', function () {
    autoSlide = setInterval(function () { goToSlide(slideIndex + 1); }, 4000);
});
var popup = document.getElementById('popup');
var image = document.getElementById('cameraImage');
var notification = document.getElementById('notification');
var resultPanel = document.getElementById('resultPanel');
var scanLine = document.getElementById('scanLine');
var captureBtn = document.getElementById('captureBtn');
var cancelBtn = document.getElementById('cancelBtn');
var confirmBtn = document.getElementById('confirmBtn');
var closeResultBtn = document.getElementById('closeResultBtn');
var resetBtn = document.getElementById('resetBtn');

var currentStep = 1;

function setHint(step) {
    currentStep = step;
    document.querySelectorAll('.hint').forEach(function (h) {
        h.classList.toggle('active', parseInt(h.dataset.step) === step);
    });
}

captureBtn.addEventListener('click', function () {
    popup.classList.add('active');
    setHint(2);
});

cancelBtn.addEventListener('click', function () {
    popup.classList.remove('active');
    setHint(1);
});

confirmBtn.addEventListener('click', function () {
    popup.classList.remove('active');
    setHint(3);

    scanLine.classList.add('active');
    setTimeout(function () { scanLine.classList.remove('active'); }, 1600);

    image.classList.add('enhanced');

    notification.classList.add('show');
    setTimeout(function () { notification.classList.remove('show'); }, 2400);

    setTimeout(function () {
        resultPanel.classList.add('active');
        setHint(4);
    }, 1000);
});

closeResultBtn.addEventListener('click', function () {
    resultPanel.classList.remove('active');
    image.classList.remove('enhanced');
    setHint(1);
});

resetBtn.addEventListener('click', function () {
    resultPanel.classList.remove('active');
    image.classList.remove('enhanced');
    popup.classList.remove('active');
    notification.classList.remove('show');
    scanLine.classList.remove('active');
    setHint(1);
});
var copyBtn = document.getElementById('copyBtn');

copyBtn.addEventListener('click', function () {
    var text = document.getElementById('codeContent').innerText;

    navigator.clipboard.writeText(text).then(function () {
        var label = copyBtn.querySelector('span:first-child');
        var original = label.textContent;
        label.textContent = 'Copiado! ✓';
        setTimeout(function () { label.textContent = original; }, 2000);
    });
});
var themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', function () {
    var isLight = document.body.classList.toggle('light-mode');
    document.querySelector('.toggle-icon').textContent = isLight ? '☀️' : '🌙';
});
function checkReveal() {
    document.querySelectorAll('.reveal-section').forEach(function (section) {
        var rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.88) {
            section.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkReveal);
document.addEventListener('DOMContentLoaded', checkReveal);