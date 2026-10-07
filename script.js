document.addEventListener('DOMContentLoaded', () => {
    // 1. Reading Progress Bar & Back to Top Circle
    const scrollProgress = document.getElementById('scrollProgress');
    const backToTopBtn = document.getElementById('backToTop');
    const progressCircle = document.querySelector('.progress-ring-circle');
    
    let circleLength = 0;
    if (progressCircle) {
        const radius = progressCircle.r.baseVal.value;
        circleLength = 2 * Math.PI * radius;
        progressCircle.style.strokeDasharray = `${circleLength} ${circleLength}`;
        progressCircle.style.strokeDashoffset = circleLength;
    }

    const updateScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) : 0;
        
        if (scrollProgress) {
            scrollProgress.style.width = `${scrollPercent * 100}%`;
        }

        if (backToTopBtn) {
            if (scrollTop > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        if (progressCircle) {
            const offset = circleLength - (scrollPercent * circleLength);
            progressCircle.style.strokeDashoffset = offset;
        }
    };

    window.addEventListener('scroll', updateScroll);
    updateScroll();

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 2. Mobile Menu Toggle Drawer
    const menuToggle = document.getElementById('menuToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    const openDrawer = () => {
        if (mobileDrawer && drawerOverlay) {
            mobileDrawer.classList.add('open');
            drawerOverlay.classList.add('open');
            menuToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeDrawer = () => {
        if (mobileDrawer && drawerOverlay) {
            mobileDrawer.classList.remove('open');
            drawerOverlay.classList.remove('open');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (mobileDrawer.classList.contains('open')) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });
    }

    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', closeDrawer);
    }

    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    // 3. ScrollSpy Navigation Highlighting
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link, .drawer-link');

    const spyScroll = () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', spyScroll);
    spyScroll();

    // 4. Skills Interactive Filtering
    const skillFilters = document.querySelectorAll('.skill-filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    skillFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            skillFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px) scale(0.96)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // 5. Projects Interactive Filtering
    const projectFilters = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    projectFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            projectFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px) scale(0.96)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // 6. Toast Notification System
    const toast = document.getElementById('toast');
    const showToast = (message, title = 'Notification', isSuccess = true) => {
        if (!toast) return;
        
        const toastTitle = toast.querySelector('.toast-title');
        const toastDesc = toast.querySelector('.toast-message');
        const toastIcon = toast.querySelector('.toast-icon');

        if (toastTitle) toastTitle.textContent = title;
        if (toastDesc) toastDesc.textContent = message;

        if (isSuccess) {
            toast.classList.remove('error');
            toast.classList.add('success');
            if (toastIcon) toastIcon.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>`;
        } else {
            toast.classList.remove('success');
            toast.classList.add('error');
            if (toastIcon) toastIcon.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>`;
        }

        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    };

    // 7. Copy Email Button
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const emailText = copyEmailBtn.getAttribute('data-email') || 'mostafa.hosny@example.com';
            navigator.clipboard.writeText(emailText).then(() => {
                showToast('Email address copied to clipboard!', 'Success! 📋');
            }).catch(() => {
                showToast('Could not copy email address.', 'Copy Failed', false);
            });
        });
    }

    // 8. Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span> <div class="spinner"></div>`;

            setTimeout(() => {
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                showToast('Thank you! Your message has been sent successfully. Mostafa will reply soon.', 'Message Sent! 🚀');
            }, 1200);
        });
    }

    // 9. Intersection Observer for Smooth Scroll Reveal Animations
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});
