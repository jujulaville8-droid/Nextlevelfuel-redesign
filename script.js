/* ============================================
   NEXT LEVEL FUELS — Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Loader ----
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 800);
    });

    // Fallback: hide loader after 3s regardless
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 3000);

    // ---- Navbar scroll effect ----
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }, { passive: true });

    // ---- Mobile nav toggle ----
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ---- Scroll animations ----
    const animateElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    animateElements.forEach(el => observer.observe(el));

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = nav.offsetHeight + 20;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---- Contact form handling ----
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const btn = this.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;

            // Show loading state
            btn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
                Sending...
            `;
            btn.disabled = true;

            // Simulate submission (replace with actual form handler)
            setTimeout(() => {
                btn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Inquiry Sent!
                `;
                btn.style.background = 'linear-gradient(135deg, #0d7377, #14919b)';
                btn.style.color = '#fff';

                // Reset form
                contactForm.reset();

                // Restore button
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.disabled = false;
                    btn.style.background = '';
                    btn.style.color = '';
                }, 3000);
            }, 1500);
        });
    }

    // ---- Parallax on hero image ----
    const heroBg = document.querySelector('.hero-bg-img');
    if (heroBg && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = `scale(${1.05 + scrolled * 0.0001}) translateY(${scrolled * 0.3}px)`;
            }
        }, { passive: true });
    }

    // ---- Add spin animation style ----
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        .spin {
            animation: spin 1s linear infinite;
        }
    `;
    document.head.appendChild(style);

});
