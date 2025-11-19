// Import CSS
import '../css/main.css';

// Show page once CSS is loaded
document.documentElement.classList.add('loaded');

// Add smooth page transitions
document.addEventListener('DOMContentLoaded', () => {
  // Fade in on page load
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.3s ease-in';
    document.body.style.opacity = '1';
  });

  // Intercept all navigation clicks for smooth transitions
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="/"]');

    // Only handle internal links, not external or hash links
    if (link && !link.href.includes('#') && !e.ctrlKey && !e.metaKey && !link.target) {
      const href = link.getAttribute('href');

      // Don't intercept if it's the current page
      if (href === window.location.pathname) {
        e.preventDefault();
        return;
      }

      // Fade out and navigate
      e.preventDefault();
      document.body.style.transition = 'opacity 0.15s ease-out';
      document.body.style.opacity = '0';

      setTimeout(() => {
        window.location.href = href;
      }, 150);
    }
  });
});

console.log('Quantam HTML Project initialized');
