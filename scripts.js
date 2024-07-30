document.addEventListener('DOMContentLoaded', function() {
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const closeBtn = document.getElementById('closeBtn');

  sidebarToggle.addEventListener('click', function() {
      sidebar.classList.add('open');
      overlay.classList.add('open');
  });

  closeBtn.addEventListener('click', function() {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
  });

  overlay.addEventListener('click', function() {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
  });
});
