/* =========================================================
   Smooth anchor scrolling
========================================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


/* =========================================================
   Scroll reveal (NO jump, NO snap)
========================================================= */
const revealElements = document.querySelectorAll('.reveal');

// Force hidden state BEFORE paint
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.9s ease';
});

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            requestAnimationFrame(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            });

            // Skill bar animation (once)
            if (entry.target.classList.contains('skill-item')) {
                const bar = entry.target.querySelector('.skill-progress');
                if (bar && !bar.dataset.animated) {
                    bar.dataset.animated = 'true';
                    bar.style.width = bar.dataset.width;
                }
            }

            revealObserver.unobserve(entry.target);
        });
    },
    {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    }
);

// Observe after DOM is ready
requestAnimationFrame(() => {
    revealElements.forEach((el, i) => {
        el.style.transitionDelay = `${i * 0.08}s`;
        revealObserver.observe(el);
    });
});


/* =========================================================
   Active nav link on scroll
========================================================= */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - section.offsetHeight / 3) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${current}`
        );
    });
});


/* =========================================================
   Hero parallax (NO refresh jump)
========================================================= */
const hero = document.querySelector('.hero');
let allowParallax = false;

// Enable parallax only AFTER first user scroll
window.addEventListener('scroll', () => {
    allowParallax = true;
}, { once: true });

window.addEventListener('scroll', () => {
    if (!hero || !allowParallax) return;

    const offset = window.scrollY * -0.25;
    hero.style.transform = `translate3d(0, ${offset}px, 0)`;
});


/* =========================================================
   Typing effect (delayed = no layout snap)
========================================================= 
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i++);
            setTimeout(type, speed);
        }
    }

    type();
}

window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.textContent;

    // Delay typing until reveal settles
    setTimeout(() => {
        typeWriter(heroTitle, text);
    }, 400);
});
*/

/* =========================================================
   Contact form (unchanged, safe)
========================================================= */
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();

        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;

        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        const btn = contactForm.querySelector('.btn');
        const originalText = btn.textContent;

        btn.textContent = 'Sending...';
        btn.style.opacity = '0.7';
        btn.style.pointerEvents = 'none';

        setTimeout(() => {
            alert('Message sent successfully!');
            contactForm.reset();
            btn.textContent = originalText;
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
        }, 1800);
    });
}
