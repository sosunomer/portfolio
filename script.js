// Mobil menü işlemleri
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Sayfa içi geçişlerde smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
        // Mobil menüyü kapat
        navLinks.classList.remove('active');
    });
});

// EmailJS başlatma
(function() {
    emailjs.init({
        publicKey: "YKnOTVd_vU4y-JLPK",
    });
})();

// Form gönderimi
const contactForm = document.getElementById('contact-form');
const formGroups = document.querySelectorAll('.form-group');

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    formGroup.classList.add('error');
    errorMessage.textContent = message;
}

function showSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm() {
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    if (name.value.trim() === '') {
        showError(name, 'İsim alanı boş bırakılamaz');
        isValid = false;
    } else {
        showSuccess(name);
    }

    if (email.value.trim() === '') {
        showError(email, 'Email alanı boş bırakılamaz');
        isValid = false;
    } else if (!validateEmail(email.value)) {
        showError(email, 'Geçerli bir email adresi giriniz');
        isValid = false;
    } else {
        showSuccess(email);
    }

    if (message.value.trim() === '') {
        showError(message, 'Mesaj alanı boş bırakılamaz');
        isValid = false;
    } else {
        showSuccess(message);
    }

    return isValid;
}

// Form animasyonları
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
        input.parentElement.style.transition = 'all 0.3s ease';
    });

    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
    });
});

// Başarı mesajı animasyonu
function showSuccessMessage() {
    const successMessage = document.querySelector('.success-message');
    successMessage.style.display = 'block';
    successMessage.style.opacity = '0';
    
    setTimeout(() => {
        successMessage.style.opacity = '1';
    }, 100);

    setTimeout(() => {
        successMessage.style.opacity = '0';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 300);
    }, 3000);
}

// Form gönderimi güncelleme
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    if (!validateForm()) return;

    try {
        contactForm.classList.add('loading');
        
        const response = await emailjs.sendForm('service_xqwq2jd', 'template_v16n8o5', this);
        console.log('SUCCESS!', response.status, response.text);
        contactForm.classList.remove('loading');
        
        showSuccessMessage();
        
        // Form resetleme animasyonu
        formGroups.forEach(group => {
            group.style.transform = 'scale(0.98)';
            setTimeout(() => {
                group.style.transform = 'scale(1)';
                group.classList.remove('success');
            }, 300);
        });

        contactForm.reset();
    } catch (error) {
        console.error('FAILED...', error);
        contactForm.classList.remove('loading');
        alert('Mesaj gönderilirken bir hata oluştu: ' + error.text);
    }
});

// Sayfa geçiş animasyonları
const sections = document.querySelectorAll('section');

const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-fade-in', 'visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.classList.add('section-fade-in');
    observer.observe(section);
});

// Yazı animasyonu
const text = "Veri Bilimi & Yapay Zeka Tutkunu";
const typingText = document.querySelector('.typing-text');
let i = 0;

function typeWriter() {
    if (i < text.length) {
        typingText.textContent = text.substring(0, i + 1);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Loading ekranı
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const progressBar = document.querySelector('.progress-bar');
    
    // Progress bar animasyonu
    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                // Yazı animasyonunu başlat
                typeWriter();
            }, 2000);
        }
    }, 20);
});

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;
const moonIcon = '<i class="fas fa-moon"></i>';
const sunIcon = '<i class="fas fa-sun"></i>';

// Kayıtlı temayı kontrol et
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);
themeToggle.innerHTML = savedTheme === 'dark' ? moonIcon : sunIcon;

// Tema değişimi animasyonu
function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Geçiş animasyonu ekle
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    document.body.style.opacity = '0.5';
    
    setTimeout(() => {
        htmlElement.setAttribute('data-theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? moonIcon : sunIcon;
        localStorage.setItem('theme', newTheme);
        
        // Animasyonu tamamla
        document.body.style.opacity = '1';
    }, 150);
}

themeToggle.addEventListener('click', toggleTheme); 