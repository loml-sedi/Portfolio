document.addEventListener('DOMContentLoaded', () => {
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

    const viewWorkBtn = document.querySelector('.hero__buttons .primary');
    const playGameBtn = document.querySelector('.hero__buttons .secondary');

    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', () => {
            window.location.href = 'projects.html';
        });
    }

    if (playGameBtn) {
        playGameBtn.addEventListener('click', () => {
            window.location.href = 'play.html';
        });
    }   
});
