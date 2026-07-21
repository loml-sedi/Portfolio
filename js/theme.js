// theme.js — Heartstopper Vol. 4 inspired dark mode
// Include this on every page: <script src="js/theme.js" defer></script>

(function () {
    const root = document.documentElement;
    const STORAGE_KEY = 'theme';

    function applyTheme(theme) {
        if (theme === 'dark') {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.removeAttribute('data-theme');
        }
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
            toggle.setAttribute('aria-pressed', theme === 'dark');
        }
    }

    // Apply saved preference immediately (before DOMContentLoaded) to avoid a flash of the wrong theme
    const saved = localStorage.getItem(STORAGE_KEY);
    applyTheme(saved === 'dark' ? 'dark' : 'light');

    document.addEventListener('DOMContentLoaded', () => {
        const toggle = document.getElementById('theme-toggle');
        // re-apply so the icon reflects the saved state once the button exists in the DOM
        applyTheme(localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light');

        toggle?.addEventListener('click', () => {
            const isDark = root.getAttribute('data-theme') === 'dark';
            const next = isDark ? 'light' : 'dark';
            localStorage.setItem(STORAGE_KEY, next);
            applyTheme(next);
        });
    });
})();
