document.addEventListener('DOMContentLoaded', function() {
  const menuButton = document.getElementById('menu-button');
  const sidebar = document.getElementById('sidebar');
  const content = document.getElementById('content');

  menuButton.addEventListener('click', function() {
      sidebar.classList.toggle('open');
  });

  // Close sidebar when clicking outside of it on mobile
  document.addEventListener('click', function(event) {
      if (!sidebar.contains(event.target) && event.target !== menuButton) {
          sidebar.classList.remove('open');
      }
  });
});
