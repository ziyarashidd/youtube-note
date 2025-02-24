<<<<<<< HEAD
  // Dark mode toggle functionality
  const darkModeToggle = document.getElementById('darkModeToggle');
  const darkModeIcon = document.getElementById('darkModeIcon');

  // Check for saved user preference
  if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeIcon.classList.remove('fa-moon');
    darkModeIcon.classList.add('fa-sun');
  }

  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Update icon and save preference
    if (document.body.classList.contains('dark-mode')) {
      darkModeIcon.classList.remove('fa-moon');
      darkModeIcon.classList.add('fa-sun');
      localStorage.setItem('dark-mode', 'enabled');
    } else {
      darkModeIcon.classList.remove('fa-sun');
      darkModeIcon.classList.add('fa-moon');
      localStorage.setItem('dark-mode', 'disabled');
    }
  });
=======
  // Dark mode toggle functionality
  const darkModeToggle = document.getElementById('darkModeToggle');
  const darkModeIcon = document.getElementById('darkModeIcon');

  // Check for saved user preference
  if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeIcon.classList.remove('fa-moon');
    darkModeIcon.classList.add('fa-sun');
  }

  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    // Update icon and save preference
    if (document.body.classList.contains('dark-mode')) {
      darkModeIcon.classList.remove('fa-moon');
      darkModeIcon.classList.add('fa-sun');
      localStorage.setItem('dark-mode', 'enabled');
    } else {
      darkModeIcon.classList.remove('fa-sun');
      darkModeIcon.classList.add('fa-moon');
      localStorage.setItem('dark-mode', 'disabled');
    }
  });
>>>>>>> aaaac12511175d1110ed7a5a80d57a1b84e22569
