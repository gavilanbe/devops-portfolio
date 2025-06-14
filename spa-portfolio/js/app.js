function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
  const active = document.getElementById(id);
  if (active) {
    active.classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Setup navigation links
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-target');
      if (target) {
        showSection(target);
      }
    });
  });

  // Show home by default
  showSection('home');
});
