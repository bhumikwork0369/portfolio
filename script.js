/* ================================================
   BHUMIK THAKKAR — PORTFOLIO JAVASCRIPT
   Particles | Typed Text | Scroll Animations
   ================================================ */

// ---- Particle Canvas Background ----
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const PARTICLE_COUNT = 100;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.8 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.6 + 0.1;
    this.color = Math.random() > 0.5 ? '124,58,237' : '6,182,212';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }
}

function connectParticles() {
  const maxDist = 120;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        const alpha = (1 - dist / maxDist) * 0.15;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(124,58,237,${alpha})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }
}

let animFrameId;
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  animFrameId = requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();


// ---- Typing Effect ----
const typedEl = document.getElementById('typed-text');
const roles = [
  'Flutter Developer',
  'Mobile App Builder',
  'Dart Enthusiast',
  'Firebase Expert',
  'UI/UX Lover'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeTimeout;

function typeEffect() {
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 60 : 100;
  if (!isDeleting && charIndex === currentRole.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }

  typeTimeout = setTimeout(typeEffect, delay);
}

// Start after brief delay
setTimeout(typeEffect, 800);


// ---- Navigation Scroll Effect ----
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Navbar blur on scroll
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  // Active nav link
  updateActiveNav();
  // Scroll reveal
  revealOnScroll();
});

function updateActiveNav() {
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}


// ---- Scroll Reveal with Intersection Observer ----
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      // Stagger delay for sibling reveals
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      let delay = 0;
      siblings.forEach((sib, i) => {
        if (sib === entry.target) delay = i * 100;
      });
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

function revealOnScroll() {
  // Fallback for browsers without IntersectionObserver
}


// ---- Skill Bar Animations ----
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const width = fill.getAttribute('data-width');
      setTimeout(() => {
        fill.style.width = width + '%';
      }, 200);
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));


// ---- Mobile Menu Toggle ----
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinksMenu.classList.toggle('open');
});

// Close menu on link click (mobile)
navLinksMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinksMenu.classList.remove('open');
  });
});


// ---- Smooth Scroll for all anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 20;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


// ---- Contact Form Handler (EmailJS) ----
// ⚠️  SETUP REQUIRED — replace the 3 placeholder values below:
//   YOUR_PUBLIC_KEY   → EmailJS Dashboard → Account → Public Key
//   YOUR_SERVICE_ID   → EmailJS Dashboard → Email Services → Service ID
//   YOUR_TEMPLATE_ID  → EmailJS Dashboard → Email Templates → Template ID
const EMAILJS_PUBLIC_KEY  = 'A6Z5lbEol0eBzuLne';
const EMAILJS_SERVICE_ID  = 'service_aze0i5s';
const EMAILJS_TEMPLATE_ID = 'template_2gals3o';

// Initialise EmailJS with your public key
emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

const contactForm = document.getElementById('contact-form');
const submitBtn   = document.getElementById('submit-btn');
const btnText     = document.getElementById('btn-text');
const formSuccess = document.getElementById('form-success');
const formError   = document.getElementById('form-error');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim() || 'Portfolio Contact';
  const message = document.getElementById('message').value.trim();

  // Show loading state
  btnText.textContent = 'Sending... ⏳';
  submitBtn.disabled = true;
  formSuccess.style.display = 'none';
  formError.style.display   = 'none';

  // Template parameters — these map to {{variables}} in your EmailJS template
  const templateParams = {
    from_name:    name,
    from_email:   email,
    subject:      subject,
    message:      message,
    to_email:     'bhumikwork0@gmail.com',
    reply_to:     email,
  };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => {
      btnText.textContent    = 'Send Message 🚀';
      submitBtn.disabled     = false;
      formSuccess.style.display = 'block';
      contactForm.reset();
      setTimeout(() => { formSuccess.style.display = 'none'; }, 6000);
    })
    .catch((err) => {
      console.error('EmailJS Error:', err);
      btnText.textContent  = 'Send Message 🚀';
      submitBtn.disabled   = false;
      formError.style.display = 'block';
      setTimeout(() => { formError.style.display = 'none'; }, 6000);
    });
});


// ---- Mouse Parallax on Hero ----
const heroSection = document.getElementById('hero');
heroSection.addEventListener('mousemove', (e) => {
  const rect = heroSection.getBoundingClientRect();
  const cx = rect.width / 2;
  const cy = rect.height / 2;
  const dx = (e.clientX - rect.left - cx) / cx;
  const dy = (e.clientY - rect.top - cy) / cy;

  const badges = document.querySelectorAll('.tech-badge');
  badges.forEach((badge, i) => {
    const factor = (i + 1) * 5;
    badge.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
  });
});
heroSection.addEventListener('mouseleave', () => {
  document.querySelectorAll('.tech-badge').forEach(badge => {
    badge.style.transform = '';
  });
});


// ---- Project Card Tilt Effect ----
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (e.clientX - rect.left - cx) / cx;
    const dy = (e.clientY - rect.top - cy) / cy;
    card.style.transform = `translateY(-6px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all 0.3s cubic-bezier(0.4,0,0.2,1)';
  });
});


// ---- Counter Animation for Stats ----
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;
  const heroStats = document.querySelector('.hero-stats');
  if (!heroStats) return;
  const rect = heroStats.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    statsAnimated = true;
    statNumbers.forEach(el => {
      const target = parseInt(el.textContent);
      let count = 0;
      const step = target / 30;
      const timer = setInterval(() => {
        count += step;
        if (count >= target) { count = target; clearInterval(timer); }
        el.textContent = Math.round(count) + '+';
      }, 50);
    });
  }
}

window.addEventListener('scroll', animateStats);
// trigger once on load
setTimeout(animateStats, 500);


// ---- Performance: Pause particles when tab not visible ----
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    cancelAnimationFrame(animFrameId);
  } else {
    animateParticles();
  }
});


// ---- Init Reveal on page load ----
setTimeout(() => {
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add('visible');
    }
  });
}, 100);
