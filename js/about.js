 document.addEventListener("DOMContentLoaded", () => {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');

    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('nav-links--open');
            menuIcon.textContent = navLinks.classList.contains('nav-links--open') ? '✕' : '☰';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-links--open');
                menuIcon.textContent = '☰';
            });
        });

        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('nav-links--open') &&
                !navLinks.contains(e.target) &&
                !menuIcon.contains(e.target)) {
                navLinks.classList.remove('nav-links--open');
                menuIcon.textContent = '☰';
            }
        });
    }

    const headers = document.querySelectorAll('.accordion-header');

    headers.forEach(header => {
        header.addEventListener('click', () => {

            const item = header.parentElement;
            const content = item.querySelector('.accordion-content');

            const isOpen = content.style.display === 'block';

            document.querySelectorAll('.accordion-content').forEach(c => {
                c.style.display = 'none';
            });

            if (!isOpen) {
                content.style.display = 'block';
            }
        });
    });

    document.querySelectorAll('.accordion-content').forEach(c => {
        c.style.display = 'none';
    });

     const ctaBtn = document.querySelector('.about-cta .btn');

    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            window.location.href = 'contact.html';
        });
    }

    const currentPage = window.location.pathname.split('/').pop();
    const navLinksAll = document.querySelectorAll('.nav-links a');

    navLinksAll.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

});